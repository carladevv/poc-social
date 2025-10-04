import type { Character, CharacterDraft, DeepPartial, PronounSet, AppearanceRef } from "./types";
import { validateDraft } from "./validators";

// add near the top
function nextAfter(prev: number): number {
  const t = Date.now();
  return t <= prev ? prev + 1 : t; // guarantees strictly increasing
}


function mergeLikes(
  orig: { activities: string[]; gifts: string[]; hobbies: string[] },
  part?: DeepPartial<typeof orig>
) {
  return {
    activities: part?.activities ?? orig.activities,
    gifts:      part?.gifts      ?? orig.gifts,
    hobbies:    part?.hobbies    ?? orig.hobbies,
  };
}

function mergeStats(
  orig: { str: number; dex: number; wis: number; cha: number },
  part?: DeepPartial<typeof orig>
) {
  return {
    str: part?.str ?? orig.str,
    dex: part?.dex ?? orig.dex,
    wis: part?.wis ?? orig.wis,
    cha: part?.cha ?? orig.cha,
  };
}

// NEW: merge pronouns field-by-field -> always PronounSet
function mergePronouns(orig: PronounSet, part?: DeepPartial<PronounSet>): PronounSet {
  return {
    label:     part?.label     ?? orig.label,
    subject:   part?.subject   ?? orig.subject,
    object:    part?.object    ?? orig.object,
    possessive:part?.possessive?? orig.possessive,
    reflexive: part?.reflexive ?? orig.reflexive,
  };
}

// NEW: merge appearance field-by-field -> always AppearanceRef
function mergeAppearance(orig: AppearanceRef, part?: DeepPartial<AppearanceRef>): AppearanceRef {
  return {
    kind: "appearance_ref", // fixed discriminator
    id: part?.id ?? orig.id,
  };
}

export function createCharacter(draft: CharacterDraft): Character {
  validateDraft(draft);

  const now = Date.now();

  return {
    id: Math.random().toString(36).slice(2) + Date.now().toString(36),
    name: draft.name,
    pronouns: { ...draft.pronouns },
    personalityPrimary: draft.personalityPrimary,
    personalitySecondary: draft.personalitySecondary,
    appearance: { ...draft.appearance },
    likes: {
      activities: [...draft.likes.activities],
      gifts:      [...draft.likes.gifts],
      hobbies:    [...draft.likes.hobbies],
    },
    dislikes: {
      activities: [...draft.dislikes.activities],
      gifts:      [...draft.dislikes.gifts],
      hobbies:    [...draft.dislikes.hobbies],
    },
    stats: { ...draft.stats },
    createdAt: now,
    updatedAt: now,
  };
}

export function updateCharacter(original: Character, partial: DeepPartial<CharacterDraft>): Character {
  const merged: Character = {
    ...original,
    name: partial.name ?? original.name,
    pronouns: mergePronouns(original.pronouns, partial.pronouns),
    personalityPrimary: partial.personalityPrimary ?? original.personalityPrimary,
    personalitySecondary: partial.personalitySecondary ?? original.personalitySecondary,
    appearance: mergeAppearance(original.appearance, partial.appearance),
    likes: mergeLikes(original.likes, partial.likes),
    dislikes: mergeLikes(original.dislikes, partial.dislikes),
    stats: mergeStats(original.stats, partial.stats),
    updatedAt: nextAfter(original.updatedAt),
  };

  const asDraft: CharacterDraft = {
    name: merged.name,
    pronouns: merged.pronouns,
    personalityPrimary: merged.personalityPrimary,
    personalitySecondary: merged.personalitySecondary,
    appearance: merged.appearance,
    likes: merged.likes,
    dislikes: merged.dislikes,
    stats: merged.stats,
  };

  validateDraft(asDraft);
  return merged;
}
