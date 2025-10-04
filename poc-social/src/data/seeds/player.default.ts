import type { Character } from "@domain/characters/types";

export const defaultPlayerSeed: Character = {
  id: "pc_1",
  name: "Aria",
  primaryPersonality: "peppy",
  stats: { strength: 5, charisma: 7 },
  likes: ["good_food", "recognition"],
  dislikes: ["loud_noises"],
  favoriteGifts: ["carved_token", "fresh_herbs"],
  memories: [],
};
