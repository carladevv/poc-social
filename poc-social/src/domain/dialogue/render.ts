import type { DialogueTemplate, LineOption, Tone, Affinity } from "./types";
import type { Character } from "@domain/characters/types";
import type { PersonalityKey } from "@data";
import { randomPick } from "@lib/rng";
import { fillVars } from "@lib/strings";

function pick(pool?: LineOption[]) {
  return (pool && pool.length ? randomPick(pool) : { text: "", tone: "neutral" as const });
}
function choosePersonality(c: Character): PersonalityKey {
  return (Math.random() < 0.85 || !c.secondaryPersonality)
    ? c.primaryPersonality
    : (c.secondaryPersonality as PersonalityKey);
}

export function renderThreeBeat(
  t: DialogueTemplate,
  actor: Character,
  target: Character,
  vars: Record<string, string>,
  opts?: { forceResolutionTone?: Tone; affinity?: Affinity }
) {
  const pActor = choosePersonality(actor);
  const pTarget = target.primaryPersonality;

  // Opener by actor’s (primary/secondary) personality
  const opener = pick((t.opener as any)[`personality_${pActor}`]);

  // Response: if template has affinity banks and an affinity was provided, use it.
  let response: LineOption;
  if (t.responseByAffinity && opts?.affinity) {
    const bank = (t.responseByAffinity as any)[opts.affinity] as Record<string, LineOption[]>;
    response = pick(bank?.[`personality_${pTarget}`]);
  } else {
    response = pick((t.response as any)?.[`personality_${pTarget}`]);
  }

  // Resolution tone: explicit override wins; otherwise derived from response tone.
  const tone: Tone = opts?.forceResolutionTone ?? (response.tone ?? "neutral");

  const resBank =
    tone === "pos" ? t.resolution?.positive :
    tone === "neg" ? t.resolution?.negative :
    t.resolution?.neutral;

  const resolution = resBank
    ? randomPick<string>((resBank as any)[`personality_${pActor}`] ?? [""])
    : "";

  return {
    opener: fillVars(opener.text, vars),
    response: fillVars(response.text, vars),
    resolution: fillVars(resolution, vars),
    responseTone: tone,
    usedPersonalities: { actor: pActor, target: pTarget }
  };
}
