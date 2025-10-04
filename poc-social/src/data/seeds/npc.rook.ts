import type { Character } from "@domain/characters/types";

export const npcRook: Character = {
  id: "npc_rook",
  name: "Rook",
  primaryPersonality: "jock",
  secondaryPersonality: "stoic",
  stats: { strength: 7, charisma: 4 },
  likes: ["winning_sparring", "clean_gear", "horseback_riding", "recognition"],
  dislikes: ["bad_food", "messy_camp", "bragging"],
  favoriteGifts: ["sharp_knife", "quality_oil"],
  memories: [],
};
