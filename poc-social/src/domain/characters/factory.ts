import type { Character } from "./types";
import { moods } from "@data";
import { now } from "@lib/time";

export function newPair(aId: string, bId: string) {
  return { aId, bId, relationshipScore: 0, lastTriggeredAtByTemplateId: {}, sharedMemories: [] };
}

export function setMood(c: Character, mood?: keyof typeof moods) {
  if (!mood) { c.currentMood = undefined; c.moodExpiresAt = undefined; return; }
  c.currentMood = mood;
  c.moodExpiresAt = now() + moods[mood].durationHours * 3600_000;
}
