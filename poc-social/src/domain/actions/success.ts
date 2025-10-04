import type { SocialActionKey } from "./types";
import type { Character, PairState } from "@domain/characters/types";
import { socialActions } from "@data";

export function successChance(
  actionKey: SocialActionKey,
  actor: Character,
  target: Character,
  pair: PairState,
  ctx?: { gift?: string }
) {
  const a = socialActions[actionKey];
  let p = a.baseSuccessChance;

  const statName = a.statInfluence as keyof Character["stats"];
  const statVal = actor.stats[statName] ?? 5;
  p += (statVal - 5) * 0.05;

  p += pair.relationshipScore * 0.002;

  if (target.currentMood === "stressed" && actionKey === "offer_comfort") p += 0.15;
  if (target.currentMood === "grieving" && actionKey === "boast") p -= 0.25;

  if (actionKey === "give_gift" && ctx?.gift && target.favoriteGifts.includes(ctx.gift)) p += 0.2;
  if (actionKey === "boast" && target.dislikes.includes("bragging")) p -= 0.2;

  return Math.max(0.05, Math.min(0.95, p));
}
