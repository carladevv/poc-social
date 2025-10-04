// src/character_creator/repository.ts
import type { Character } from "./types";

export interface CharacterRepository {
  add(c: Character): void;
  get(id: string): Character | undefined;
  list(): Character[];
  update(c: Character): void;
  remove(id: string): void;
}

export function createMemoryRepository(): CharacterRepository {
  const map = new Map<string, Character>();
  return {
    add(c) { map.set(c.id, c); },
    get(id) { return map.get(id); },
    list() { return Array.from(map.values()); },
    update(c) { if (!map.has(c.id)) throw new Error("Character not found"); map.set(c.id, c); },
    remove(id) { map.delete(id); },
  };
}
