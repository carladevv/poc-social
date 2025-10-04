import type { PersonalityKey, MoodKey } from "@data";
import type { MemoryWeightKey } from "@data";

export type Stats = { strength: number; charisma: number };

export type Memory = {
  id: string;
  text: string;
  weight: MemoryWeightKey;
  createdAt: number;
  meta?: Record<string, any>;
};

export type Character = {
  id: string;
  name: string;
  primaryPersonality: PersonalityKey;
  secondaryPersonality?: PersonalityKey;
  stats: Stats;
  likes: string[];
  dislikes: string[];
  favoriteGifts: string[];
  currentMood?: MoodKey;
  moodExpiresAt?: number;
  memories: Memory[];
};

export type PairState = {
  aId: string;
  bId: string;
  relationshipScore: number;
  lastTriggeredAtByTemplateId: Record<string, number | undefined>;
  sharedMemories: Memory[];
};
