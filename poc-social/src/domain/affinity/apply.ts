import type { Character, PairState } from "@domain/characters/types";
import { adjustRelationship } from "@domain/relationships/scoring";
import { addPairMemory } from "@domain/memories/create";

export function applyFlavorAffinity(
  actor: Character,
  target: Character,
  pair: PairState,
  hobby: string
) {
  let delta = 0;
  if (target.flavorLikes?.includes(hobby)) delta += 2;
  if (target.flavorDislikes?.includes(hobby)) delta -= 2;
  if (delta !== 0) {
    adjustRelationship(pair, delta);
    addPairMemory(pair, `${actor.name} mentioned ${hobby}`, "low", { hobby, affinityDelta: delta });
  }
  return delta;
}
