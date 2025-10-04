import type { DialogueTemplate } from "./types";
import type { Character, PairState } from "@domain/characters/types";
import { levelFromScore } from "@domain/relationships/scoring";

const REL_ORDER = ["enemy","rival","neutral","buddy","companion"] as const;

export function templatePasses(
  t: DialogueTemplate,
  actor: Character,
  target: Character,
  pair: PairState,
  ctx: { now: number; activity?: string; triggered?: { key: string; success: boolean } }
) {
  const level = levelFromScore(pair.relationshipScore);

  if (t.conditions.minRelationship && REL_ORDER.indexOf(level) < REL_ORDER.indexOf(t.conditions.minRelationship)) return false;
  if (t.conditions.requiredMood?.length && (!target.currentMood || !t.conditions.requiredMood.includes(target.currentMood))) return false;
  if (t.conditions.blockedMood?.length && target.currentMood && t.conditions.blockedMood.includes(target.currentMood)) return false;
  if (t.conditions.requiredActivity?.length && (!ctx.activity || !t.conditions.requiredActivity.includes(ctx.activity as any))) return false;

  if (t.kind === "social_action") {
    if (!ctx.triggered) return false;
    if (t.conditions.trigger && t.conditions.trigger !== ctx.triggered.key) return false;
    if (t.conditions.success !== undefined && t.conditions.success !== ctx.triggered.success) return false;
  }

  const last = pair.lastTriggeredAtByTemplateId[t.id] ?? 0;
  if (t.conditions.cooldownSec && ctx.now - last < t.conditions.cooldownSec * 1000) return false;

  const chance = t.conditions.chanceToTrigger ?? 1;
  if (Math.random() > chance) return false;

  return true;
}
