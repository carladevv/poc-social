// src/engine.ts
import { dataSchema, type ActivityKey, type MemoryWeightKey, type MoodKey, type PersonalityKey, type SocialActionKey, type Stats } from "./data";
import { dialogueTemplates, type Template } from "./templates";

/** === Domain types === */
export type Character = {
  id: string;
  name: string;
  primaryPersonality: PersonalityKey;
  secondaryPersonality?: PersonalityKey;
  stats: Stats;
  likes: string[];
  dislikes: string[];
  favoriteGifts: string[];
  currentMood?: MoodKey;
  moodExpiresAt?: number;
  memories: Memory[];
};

export type Memory = {
  id: string;
  text: string;
  weight: MemoryWeightKey;
  createdAt: number;
  meta?: Record<string, any>;
};

export type PairState = {
  aId: string;
  bId: string;
  relationshipScore: number; // -100..100
  lastTriggeredAtByTemplateId: Record<string, number | undefined>;
  sharedMemories: Memory[];
};

export type EventCtx = {
  now: number;
  activity?: ActivityKey;
  triggeredAction?: { key: SocialActionKey; success: boolean; payload?: Record<string, any> };
};

const REL_ORDER = ["enemy", "rival", "neutral", "buddy", "companion"] as const;
export type RelLevel = typeof REL_ORDER[number];

/** === Helpers === */
export function levelFromScore(score: number): RelLevel {
  const L = dataSchema.relationshipLevels;
  if (score >= L.companion.minScore) return "companion";
  if (score >= L.buddy.minScore) return "buddy";
  if (score >= L.neutral.minScore) return "neutral";
  if (score >= L.rival.minScore) return "rival";
  return "enemy";
}

export function successChance(
  actionKey: SocialActionKey,
  actor: Character,
  target: Character,
  pair: PairState,
  ctx?: { gift?: string }
) {
  const action = dataSchema.socialActions[actionKey];
  let p = action.baseSuccessChance; // e.g. 0.7

  // Stat influence (baseline 5)
  const statName = action.statInfluence as keyof Stats;
  const statVal = actor.stats[statName] ?? 5;
  p += (statVal - 5) * 0.05; // each +1 adds 5%

  // Relationship nudge
  p += pair.relationshipScore * 0.002; // +20 => +4%

  // Mood nudges examples
  if (target.currentMood === "stressed" && actionKey === "offer_comfort") p += 0.15;
  if (target.currentMood === "grieving" && actionKey === "boast") p -= 0.25;

  // Likes/dislikes examples
  if (actionKey === "give_gift" && ctx?.gift && target.favoriteGifts.includes(ctx.gift)) p += 0.2;
  if (actionKey === "boast" && target.dislikes.includes("bragging")) p -= 0.2;

  return Math.max(0.05, Math.min(0.95, p));
}

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fillVars(s: string, vars: Record<string, string>) {
  return s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");
}

function lineForPersonality(map: Record<string, string[]>, p: PersonalityKey, vars: Record<string, string>) {
  const key = `personality_${p}`;
  const pool = (map as any)[key] as string[] | undefined;
  const raw = pool && pool.length ? randomPick(pool) : "";
  return fillVars(raw, vars);
}

export function templatePasses(
  t: Template,
  actor: Character,
  target: Character,
  pair: PairState,
  ctx: EventCtx
): boolean {
  const level = levelFromScore(pair.relationshipScore);

  if (t.conditions.minRelationship) {
    if (REL_ORDER.indexOf(level) < REL_ORDER.indexOf(t.conditions.minRelationship)) return false;
  }
  if (t.conditions.requiredMood?.length && (!target.currentMood || !t.conditions.requiredMood.includes(target.currentMood))) return false;
  if (t.conditions.blockedMood?.length && target.currentMood && t.conditions.blockedMood.includes(target.currentMood)) return false;
  if (t.conditions.requiredActivity?.length && (!ctx.activity || !t.conditions.requiredActivity.includes(ctx.activity))) return false;

  if (t.type === "social_action") {
    if (!ctx.triggeredAction) return false;
    if (t.conditions.trigger && t.conditions.trigger !== ctx.triggeredAction.key) return false;
    if (t.conditions.success !== undefined && t.conditions.success !== ctx.triggeredAction.success) return false;
  }

  const last = pair.lastTriggeredAtByTemplateId[t.id] ?? 0;
  if (t.cooldownSec && ctx.now - last < t.cooldownSec * 1000) return false;

  const chance = t.conditions.chanceToTrigger ?? 1;
  if (Math.random() > chance) return false;

  return true;
}

export function pickDialogue(
  t: Template,
  actor: Character,
  target: Character,
  vars: Record<string, string>
) {
  // 85% primary, 15% secondary flavor
  const actorP: PersonalityKey =
    Math.random() < 0.85 || !actor.secondaryPersonality ? actor.primaryPersonality : actor.secondaryPersonality;
  const targetP = target.primaryPersonality;

  const opener = lineForPersonality(t.opener as any, actorP, vars);
  const response = lineForPersonality(t.response as any, targetP, vars);
  return { opener, response, actorP, targetP };
}

/** === Relationship & memories === */
export function addMemory(list: Memory[], text: string, weight: MemoryWeightKey, meta?: Record<string, any>) {
  list.push({ id: "mem_" + Math.random().toString(36).slice(2), text, weight, createdAt: Date.now(), meta });
}

export function adjustRelationship(pair: PairState, delta: number) {
  pair.relationshipScore = Math.max(-100, Math.min(100, Math.round(pair.relationshipScore + delta)));
}

export function decaySimple(now: number, mems: Memory[]) {
  // Simple PoC policy
  for (let i = mems.length - 1; i >= 0; i--) {
    const m = mems[i];
    const age = now - m.createdAt;
    if (m.weight === "low" && age > 24 * 3600 * 1000) mems.splice(i, 1);
    if (m.weight === "medium" && age > 7 * 24 * 3600 * 1000) mems.splice(i, 1);
    if (m.weight === "high" && age > 30 * 24 * 3600 * 1000) mems.splice(i, 1);
  }
}

/** === Seed data (premade NPC + default player) === */
export const premadeNPC: Character = {
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

export const defaultPlayer: Character = {
  id: "pc_1",
  name: "Aria",
  primaryPersonality: "peppy",
  stats: { strength: 5, charisma: 7 },
  likes: ["good_food", "recognition"],
  dislikes: ["loud_noises"],
  favoriteGifts: ["carved_token", "fresh_herbs"],
  memories: [],
};

export function newPair(aId: string, bId: string): PairState {
  return { aId, bId, relationshipScore: 0, lastTriggeredAtByTemplateId: {}, sharedMemories: [] };
}

/** === Interactions exposed to UI === */

export type LogEntry = {
  id: string;
  text: string;
};

export function doGreeting(player: Character, npc: Character, pair: PairState, now = Date.now()): LogEntry[] {
  const t = dialogueTemplates.greeting_casual;
  const ctx: EventCtx = { now };
  if (!templatePasses(t, player, npc, pair, ctx)) return [{ id: "log_" + cryptoRand(), text: "No greeting available." }];

  const { opener, response } = pickDialogue(t, player, npc, { targetName: npc.name });
  pair.lastTriggeredAtByTemplateId[t.id] = now;
  return [
    { id: "log_" + cryptoRand(), text: `${player.name}: ${opener}` },
    { id: "log_" + cryptoRand(), text: `${npc.name}: ${response}` },
  ];
}

export function doDiscussActivity(
  player: Character,
  npc: Character,
  pair: PairState,
  activity: ActivityKey,
  now = Date.now()
): LogEntry[] {
  const t = dialogueTemplates.discuss_activity;
  const ctx: EventCtx = { now, activity };
  if (!templatePasses(t, player, npc, pair, ctx)) {
    return [{ id: "log_" + cryptoRand(), text: `They don't feel like discussing ${activity} right now.` }];
  }
  const { opener, response } = pickDialogue(t, player, npc, { activity, targetName: npc.name });
  pair.lastTriggeredAtByTemplateId[t.id] = now;
  return [
    { id: "log_" + cryptoRand(), text: `${player.name}: ${opener}` },
    { id: "log_" + cryptoRand(), text: `${npc.name}: ${response}` },
  ];
}

export function doGiveGift(
  player: Character,
  npc: Character,
  pair: PairState,
  gift: string,
  now = Date.now()
): LogEntry[] {
  const p = successChance("give_gift", player, npc, pair, { gift });
  const roll = Math.random();
  const success = roll < p;
  const logs: LogEntry[] = [];

  logs.push({ id: "log_" + cryptoRand(), text: `${player.name} offers ${npc.name} a ${gift}. (p=${p.toFixed(2)} roll=${roll.toFixed(2)})` });

  if (success) {
    const t = dialogueTemplates.gift_reaction_success;
    const ctx: EventCtx = { now, triggeredAction: { key: "give_gift", success: true, payload: { gift } } };
    if (templatePasses(t, player, npc, pair, ctx)) {
      const { opener, response } = pickDialogue(t, npc, player, { gift, targetName: player.name });
      pair.lastTriggeredAtByTemplateId[t.id] = now;
      logs.push({ id: "log_" + cryptoRand(), text: `${npc.name}: ${opener}` });
      logs.push({ id: "log_" + cryptoRand(), text: `${player.name}: ${response}` });
    }

    // Relationship deltas
    const delta = npc.favoriteGifts.includes(gift) ? 8 : 3;
    adjustRelationship(pair, delta);
    addMemory(pair.sharedMemories, `${player.name} gave ${gift} to ${npc.name}`, npc.favoriteGifts.includes(gift) ? "medium" : "low", {
      gift,
      success: true,
    });
  } else {
    adjustRelationship(pair, -1);
    addMemory(pair.sharedMemories, `${player.name} tried to give ${gift}, it landed awkwardly`, "low", { gift, success: false });
    logs.push({ id: "log_" + cryptoRand(), text: `${npc.name} hesitates. It doesn't quite land.` });
  }

  return logs;
}

export function doMoodCheck(
  player: Character,
  npc: Character,
  pair: PairState,
  now = Date.now()
): LogEntry[] {
  const t = dialogueTemplates.mood_reaction;
  const ctx: EventCtx = { now };
  if (!templatePasses(t, player, npc, pair, ctx)) {
    return [{ id: "log_" + cryptoRand(), text: `${npc.name} isn't in a mood that needs checking in — or you're not close enough.` }];
  }
  const { opener, response } = pickDialogue(t, player, npc, { targetName: npc.name });
  pair.lastTriggeredAtByTemplateId[t.id] = now;
  adjustRelationship(pair, 6); // comfort nudge
  addMemory(pair.sharedMemories, `${player.name} checked in on ${npc.name}'s mood`, "medium", { mood: npc.currentMood });
  return [
    { id: "log_" + cryptoRand(), text: `${player.name}: ${opener}` },
    { id: "log_" + cryptoRand(), text: `${npc.name}: ${response}` },
  ];
}

export function setMood(c: Character, mood?: MoodKey) {
  if (!mood) {
    c.currentMood = undefined;
    c.moodExpiresAt = undefined;
    return;
  }
  c.currentMood = mood;
  const hours = dataSchema.moodTypes[mood].durationHours;
  c.moodExpiresAt = Date.now() + hours * 3600 * 1000;
}

export function tick(now: number, chars: Character[], pair: PairState) {
  // expire moods
  for (const c of chars) {
    if (c.moodExpiresAt && c.moodExpiresAt < now) {
      c.currentMood = undefined;
      c.moodExpiresAt = undefined;
    }
  }
  decaySimple(now, pair.sharedMemories);
}

function cryptoRand() {
  return Math.random().toString(36).slice(2);
}
