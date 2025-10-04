// src/character_creator/validators.ts
import {
  ACTIVITIES,
  GIFTS,
  HOBBIES,
  PERSONALITY_TYPES,
  STAT_KEYS,
  STAT_POINT_BUDGET,
} from "./constants";
import type { CharacterDraft, Personality, PronounSet, Stats } from "./types";
import { ValidationError } from "./errors";

const asSet = (arr: string[]) => new Set(arr);

export function validateName(name: string) {
  if (!name || typeof name !== "string") {
    throw new ValidationError("Name is required.");
  }
  if (name.length > 60) {
    throw new ValidationError("Name must be 60 characters or fewer.");
  }
}

export function validatePronouns(p: PronounSet) {
  const fields = ["label", "subject", "object", "possessive", "reflexive"] as const;
  for (const f of fields) {
    const v = p[f];
    if (!v || typeof v !== "string") throw new ValidationError(`Pronouns.${f} is required.`);
  }
}

export function validatePersonalityPair(primary: Personality, secondary: Personality) {
  if (!PERSONALITY_TYPES.includes(primary)) {
    throw new ValidationError(`Primary personality must be one of: ${PERSONALITY_TYPES.join(", ")}`);
  }
  if (!PERSONALITY_TYPES.includes(secondary)) {
    throw new ValidationError(`Secondary personality must be one of: ${PERSONALITY_TYPES.join(", ")}`);
  }
  if (primary === secondary) {
    throw new ValidationError("Primary and secondary personality must be different.");
  }
}

export function validateChoiceCounts<T extends string>(
  likes: T[],
  dislikes: T[],
  requiredLike: number,
  requiredDislike: number,
  allowed: readonly T[],
  label: string
) {
  const issues: string[] = [];

  // allowed domain
  const badLikes = likes.filter(x => !allowed.includes(x));
  const badDislikes = dislikes.filter(x => !allowed.includes(x));
  if (badLikes.length) issues.push(`${label}: invalid likes ${badLikes.join(", ")}`);
  if (badDislikes.length) issues.push(`${label}: invalid dislikes ${badDislikes.join(", ")}`);

  // counts
  if (likes.length !== requiredLike) issues.push(`${label}: must have exactly ${requiredLike} like(s).`);
  if (dislikes.length !== requiredDislike) issues.push(`${label}: must have exactly ${requiredDislike} dislike(s).`);

  // uniqueness within each set
  if (asSet(likes).size !== likes.length) issues.push(`${label}: duplicate entries in likes.`);
  if (asSet(dislikes).size !== dislikes.length) issues.push(`${label}: duplicate entries in dislikes.`);

  // cannot both like and dislike the same item
  const overlaps = likes.filter(x => dislikes.includes(x));
  if (overlaps.length) issues.push(`${label}: cannot like and dislike the same item (${overlaps.join(", ")}).`);

  if (issues.length) throw new ValidationError(`${label} validation failed.`, issues);
}

export function validateStats(stats: Stats) {
  // keys
  const keys = Object.keys(stats);
  for (const k of STAT_KEYS) {
    if (!keys.includes(k)) throw new ValidationError(`Stat "${k}" is required.`);
    const v = stats[k];
    if (!Number.isInteger(v) || v < 0) throw new ValidationError(`Stat "${k}" must be a non-negative integer.`);
  }
  // sum
  const sum = STAT_KEYS.reduce((acc, k) => acc + stats[k], 0);
  if (sum !== STAT_POINT_BUDGET) {
    throw new ValidationError(`Stats must sum to ${STAT_POINT_BUDGET}. Currently: ${sum}.`);
  }
}

export function validateDraft(draft: CharacterDraft) {
  validateName(draft.name);
  validatePronouns(draft.pronouns);
  validatePersonalityPair(draft.personalityPrimary, draft.personalitySecondary);

  validateChoiceCounts(
    draft.likes.activities,
    draft.dislikes.activities,
    1, 1,
    ACTIVITIES,
    "Activities"
  );

  validateChoiceCounts(
    draft.likes.gifts,
    draft.dislikes.gifts,
    2, 2,
    GIFTS,
    "Gifts"
  );

  validateChoiceCounts(
    draft.likes.hobbies,
    draft.dislikes.hobbies,
    2, 2,
    HOBBIES,
    "Hobbies"
  );

  validateStats(draft.stats);
}
