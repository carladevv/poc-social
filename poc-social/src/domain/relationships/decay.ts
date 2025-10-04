import type { PairState } from "@domain/characters/types";
import { MS } from "@lib/time";

export function decaySimple(now: number, pair: PairState) {
  const mems = pair.sharedMemories;
  for (let i = mems.length - 1; i >= 0; i--) {
    const m = mems[i];
    const age = now - m.createdAt;
    if (m.weight === "low"    && age > 1 * MS.day) mems.splice(i, 1);
    if (m.weight === "medium" && age > 7 * MS.day) mems.splice(i, 1);
    if (m.weight === "high"   && age > 30 * MS.day) mems.splice(i, 1);
  }
}
