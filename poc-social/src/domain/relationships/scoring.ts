import { relationshipLevels } from "@data";
import type { PairState } from "@domain/characters/types";
import { clamp } from "@lib/rng";

const ORDER = ["enemy","rival","neutral","buddy","companion"] as const;
export type RelLevel = typeof ORDER[number];

export function levelFromScore(score: number): RelLevel {
  const L = relationshipLevels;
  if (score >= L.companion.minScore) return "companion";
  if (score >= L.buddy.minScore) return "buddy";
  if (score >= L.neutral.minScore) return "neutral";
  if (score >= L.rival.minScore) return "rival";
  return "enemy";
}

export function adjustRelationship(pair: PairState, delta: number) {
  pair.relationshipScore = clamp(Math.round(pair.relationshipScore + delta), -100, 100);
}
