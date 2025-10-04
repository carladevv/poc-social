import type { SocialActionKey, ActionOutcome } from "./types";
import type { Character, PairState } from "@domain/characters/types";
import { successChance } from "./success";
import { adjustRelationship } from "@domain/relationships/scoring";
import { addPairMemory } from "@domain/memories/create";

export function performAction(
  key: SocialActionKey,
  actor: Character,
  target: Character,
  pair: PairState,
  now: number,
  payload?: any
): ActionOutcome {
  const chance = successChance(key, actor, target, pair, payload);
  const roll = Math.random();
  const success = roll < chance;

  let relDelta = 0;
  const outcome: ActionOutcome = { success, chance, roll, relDelta };

  switch (key) {
    case "give_gift": {
      const gift = payload?.gift as string | undefined;
      if (success) {
        relDelta = gift && target.favoriteGifts.includes(gift) ? 8 : 3;
        outcome.memory = { text: `${actor.name} gave ${gift ?? "a gift"} to ${target.name}`, weight: gift && target.favoriteGifts.includes(gift) ? "medium":"low", meta: { gift, success } };
      } else {
        relDelta = -1;
        outcome.memory = { text: `${actor.name} tried to give ${target.name} ${gift ?? "a gift"} (awkward)`, weight: "low", meta: { gift, success } };
      }
      break;
    }
    case "offer_comfort": {
      if (success) {
        relDelta = 6;
        outcome.memory = { text: `${actor.name} comforted ${target.name}`, weight: "medium", meta: { mood: target.currentMood } };
      } else {
        relDelta = 0;
      }
      break;
    }
    case "boast": {
      relDelta = success ? -2 : -4;
      outcome.memory = { text: `${actor.name} boasted to ${target.name}`, weight: "low", meta: { success } };
      break;
    }
    case "challenge_to_spar": {
      // PoC: treat success as accepted
      relDelta = success ? +1 : -1;
      outcome.memory = { text: `${actor.name} challenged ${target.name} to spar`, weight: "low", meta: { success } };
      break;
    }
    case "share_rations": {
      relDelta = success ? +2 : 0;
      outcome.memory = { text: `${actor.name} shared rations with ${target.name}`, weight: "low", meta: { success } };
      break;
    }
  }

  outcome.relDelta = relDelta;
  adjustRelationship(pair, relDelta);
  if (outcome.memory) addPairMemory(pair, outcome.memory.text, outcome.memory.weight, outcome.memory.meta);
  return outcome;
}
