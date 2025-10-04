import type { Character } from "@domain/characters/types";

export const npcRook: Character = {
    id: "npc_rook",
    name: "Rook",
    primaryPersonality: "cranky",
    secondaryPersonality: "stoic",
    stats: { strength: 6, charisma: 4 },

    // Activity-based prefs (existing system)
    likes: ["recognition", "clean_gear"],
    dislikes: ["bragging", "messy_camp"],

    favoriteGifts: ["sharp_knife", "quality_oil"],

    // NEW: flavor (hobby) prefs used by hobby templates + affinity
    flavorLikes: ["stargazing", "sharpening swords"],
    flavorDislikes: ["playing the lute"],

    currentMood: undefined,
    moodExpiresAt: undefined,
    memories: [],
};
