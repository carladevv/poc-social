// src/domain/dialogue/registry.ts
import type { DialogueTemplate } from "./types";

// Include both .ts and .tsx just in case
const modules = import.meta.glob("./templates/**/*.{ts,tsx}", { eager: true }) as
  Record<string, { default?: unknown }>;

// Collect templates; log anything that looks wrong
const list: DialogueTemplate[] = [];
for (const [path, mod] of Object.entries(modules)) {
  const tpl = (mod as any)?.default;
  if (!tpl || typeof tpl !== "object" || typeof (tpl as any).id !== "string") {
    console.warn(`[dialogue] Skipping template at ${path} (no default export with 'id').`);
    continue;
  }
  list.push(tpl as DialogueTemplate);
}

// Public API
export const templateList: DialogueTemplate[] = list;
export const templateById = Object.fromEntries(list.map((t) => [t.id, t]));
