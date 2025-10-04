import type { PronounSet } from "./types";

export const PERSONALITY_TYPES = ["gentle", "stoic", "cranky", "fun"] as const;

export const DEFAULT_PRONOUN_SETS: Readonly<PronounSet[]> = [
  { label: "she/her",  subject: "she",  object: "her",  possessive: "her",  reflexive: "herself" },
  { label: "he/him",   subject: "he",   object: "him",  possessive: "his",  reflexive: "himself" },
  { label: "they/them",subject: "they", object: "them", possessive: "their",reflexive: "themself" },
];

export const ACTIVITIES = [
  "archery",
  "sparring",
  "horse_care",
  "cooking",
  "guard_duty",
] as const;

export const GIFTS = [
  "ancient_tome",
  "sharp_knife",
  "smooth_rock",
  "fine_perfume",
  "warm_socks",
  "blue_rose",
  "common_daisy",
] as const;

export const HOBBIES = [
  "stargazing",
  "playing_lute",
  "reading_old_books",
  "picking_flowers",
  "writing_poetry",
  "strength_training",
] as const;

// Stats
export const STAT_KEYS = ["str", "dex", "wis", "cha"] as const;
export const STAT_POINT_BUDGET = 10;
