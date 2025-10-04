// src/character_creator/types.ts
import {
  PERSONALITY_TYPES,
  STAT_KEYS,
} from "./constants";

export type Personality = typeof PERSONALITY_TYPES[number];

export type StatKey = typeof STAT_KEYS[number];

export type Stats = Record<StatKey, number>;

export type PronounSet = {
  label: string;      // e.g. "she/her" | custom label
  subject: string;    // she | he | they | custom
  object: string;     // her | him | them | custom
  possessive: string; // her | his | their | custom
  reflexive: string;  // herself | himself | themself | custom
};

export type AppearanceRef = {
  // opaque handle to your future appearance system
  kind: "appearance_ref";
  id: string;        // e.g. UUID or key your future system understands
};

export type LikeDislikeConfig = {
  // exactly counts you want to enforce
  activities: { like: 1; dislike: 1 };
  gifts: { like: 2; dislike: 2 };
  hobbies: { like: 2; dislike: 2 };
};

export type Character = {
  id: string;
  name: string;
  pronouns: PronounSet;          // default or custom
  personalityPrimary: Personality;
  personalitySecondary: Personality;
  appearance: AppearanceRef;
  likes: {
    activities: string[];
    gifts: string[];
    hobbies: string[];
  };
  dislikes: {
    activities: string[];
    gifts: string[];
    hobbies: string[];
  };
  stats: Stats;                  // must sum to 10
  createdAt: number;
  updatedAt: number;
};

export type CharacterDraft = Omit<Character, "id" | "createdAt" | "updatedAt">;

// Replace your DeepPartial with this:
export type DeepPartial<T> =
  T extends Array<infer U>     // keep arrays as arrays of U (not U|undefined)
    ? U[]
    : T extends object
      ? { [K in keyof T]?: DeepPartial<T[K]> } // properties optional, values recursively partial
      : T;

