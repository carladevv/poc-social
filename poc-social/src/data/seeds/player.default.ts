import type { Character } from "@domain/characters/types";

export const defaultPlayerSeed: Character = {
    id: "pc_1",
    name: "Player",
    primaryPersonality: "peppy",
    stats: { strength: 5, charisma: 7 },

    // Activity-based prefs (unchanged mechanics)
    likes: ["recognition"],
    dislikes: ["bad_food"],

    favoriteGifts: ["polished_stone"],

    // NEW: defaults (UI will override these with your picks)
    flavorLikes: ["reading old scrolls"],
    flavorDislikes: [],

    currentMood: undefined,
    moodExpiresAt: undefined,
    memories: [],
};
