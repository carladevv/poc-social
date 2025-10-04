import type { DialogueTemplate, LineOption, Tone } from "./types";
import type { Character } from "@domain/characters/types";
import type { PersonalityKey } from "@data";
import { randomPick } from "@lib/rng";
import { fillVars } from "@lib/strings";

function pick(pool?: LineOption[]) {
    return (pool && pool.length ? randomPick(pool) : { text: "", tone: "neutral" as const });
}

// Ensure we always return a PersonalityKey
function choosePersonality(c: Character): PersonalityKey {
    return (Math.random() < 0.85 || !c.secondaryPersonality) ? c.primaryPersonality : (c.secondaryPersonality as PersonalityKey);
}

// --- add this helper type ---
type ResBank = Record<`personality_${PersonalityKey}`, ReadonlyArray<string>>;

export function renderThreeBeat(
    t: DialogueTemplate,
    actor: Character,
    target: Character,
    vars: Record<string, string>
) {
    const pActor = choosePersonality(actor);
    const pTarget = target.primaryPersonality;

    const opener = pick((t.opener as any)[`personality_${pActor}`]);
    const response = pick((t.response as any)[`personality_${pTarget}`]);
    const tone: Tone = response.tone ?? "neutral";

    // Type the bank precisely so randomPick knows it's string[]
    const bank: ResBank | undefined =
        tone === "pos" ? t.resolution?.positive as ResBank | undefined
            : tone === "neg" ? t.resolution?.negative as ResBank | undefined
                : t.resolution?.neutral as ResBank | undefined;

    const pool: ReadonlyArray<string> = bank?.[`personality_${pActor}`] ?? [""];
    const resolution = randomPick<string>(pool); // <- explicitly string

    return {
        opener: fillVars(opener.text, vars),
        response: fillVars(response.text, vars),
        resolution: fillVars(resolution, vars),
        responseTone: tone,
        usedPersonalities: { actor: pActor, target: pTarget }
    };
}
