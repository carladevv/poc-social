import type { Character, PairState } from "@domain/characters/types";
import type { DialogueTemplate, Tone, Affinity } from "./types";
import { templateList } from "./registry";
import { templatePasses } from "./gates";
import { renderThreeBeat } from "./render";

type DialogueKind = DialogueTemplate["kind"];
const REL_ORDER = ["enemy","rival","neutral","buddy","companion"] as const;
function reqIdx(t: DialogueTemplate) {
  const min = (t.conditions.minRelationship ?? "enemy") as (typeof REL_ORDER)[number];
  return REL_ORDER.indexOf(min);
}

export type DialogueCtx = {
  now: number;
  activity?: string;
  triggered?: { key: string; success: boolean };
  vars?: Record<string, string>;
  onlyKind?: DialogueKind;
  forceResolutionTone?: Tone;
  affinity?: Affinity; // ← NEW
};

export function pickAndRender(actor: Character, target: Character, pair: PairState, ctx: DialogueCtx) {
  let pool = ctx.onlyKind ? templateList.filter(t => t.kind === ctx.onlyKind) : templateList;
  pool = pool.filter(t => templatePasses(t, actor, target, pair, ctx));

  if (ctx.triggered) {
    const actionPool = pool.filter(t => t.kind === "social_action");
    if (actionPool.length) pool = actionPool;
  }

  if (pool.length === 0) return null;
  pool.sort((a, b) => reqIdx(b) - reqIdx(a));
  const bestIdx = reqIdx(pool[0]);
  const tied = pool.filter(t => reqIdx(t) === bestIdx);

  const chosen = tied[Math.floor(Math.random() * tied.length)];
  const out = renderThreeBeat(
    chosen, actor, target, ctx.vars ?? {},
    { forceResolutionTone: ctx.forceResolutionTone, affinity: ctx.affinity }
  );
  pair.lastTriggeredAtByTemplateId[chosen.id] = ctx.now;
  return { templateId: chosen.id, ...out };
}
