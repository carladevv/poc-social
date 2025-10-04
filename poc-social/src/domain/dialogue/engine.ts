import type { Character, PairState } from "@domain/characters/types";
import { templateList } from "./registry";
import { templatePasses } from "./gates";
import { renderThreeBeat } from "./render";

export function pickAndRender(
  actor: Character,
  target: Character,
  pair: PairState,
  ctx: { now: number; activity?: string; triggered?: { key: string; success: boolean }; vars?: Record<string,string> }
) {
  const candidates = templateList.filter(t => templatePasses(t, actor, target, pair, ctx));
  if (candidates.length === 0) return null;
  const chosen = candidates[Math.floor(Math.random()*candidates.length)];
  const out = renderThreeBeat(chosen, actor, target, ctx.vars ?? {});
  pair.lastTriggeredAtByTemplateId[chosen.id] = ctx.now;
  return { templateId: chosen.id, ...out };
}
