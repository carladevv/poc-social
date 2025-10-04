import type { Memory } from "./types";
import type { PairState } from "@domain/characters/types";

export function addMemory(list: Memory[], text: string, weight: Memory["weight"], meta?: Record<string,any>) {
  list.push({ id: "mem_" + Math.random().toString(36).slice(2), text, weight, createdAt: Date.now(), meta });
}

export function addPairMemory(pair: PairState, text: string, weight: Memory["weight"], meta?: Record<string,any>) {
  addMemory(pair.sharedMemories, text, weight, meta);
}
