// src/app/App.tsx
import { useMemo, useState } from "react";
import "@styles/index.css";

// ---- Data (read-only) ----
import {
  personalities,
  activities,
  moods,
} from "@data";
import { defaultPlayerSeed } from "@data/seeds/player.default";
import { npcRook } from "@data/seeds/npc.rook";

// ---- Domain (game rules, no React) ----
import { newPair, setMood } from "@domain/characters/factory";
import type { Character, PairState } from "@domain/characters/types";
import { levelFromScore } from "@domain/relationships/scoring";
import { decaySimple } from "@domain/relationships/decay";
import { performAction } from "@domain/actions/apply";
import { pickAndRender } from "@domain/dialogue/engine";

// ---- Types from data layer ----
import type { ActivityKey, MoodKey, PersonalityKey } from "@data";

// ===== UI-local types =====
type LogEntry = { id: string; text: string };

// ===== TEMP catalog (move to data/schema/items.ts when ready) =====
const DEFAULT_GIFTS = [
  "polished_stone",
  "fresh_herbs",
  "carved_token",
  "quality_oil",
  "good_rope",
  "sharp_knife",
] as const;

// ===== Helpers =====
const newId = () => "log_" + Math.random().toString(36).slice(2);
const now = () => Date.now();

export default function App() {
  const [view, setView] = useState<"create" | "interact">("create");

  // --- Creator state ---
  const [name, setName] = useState("Aria");
  const [primary, setPrimary] = useState<PersonalityKey>("peppy");
  const [strength, setStrength] = useState(5);
  const [charisma, setCharisma] = useState(7);

  // --- Game state ---
  const [player, setPlayer] = useState<Character | null>(null);
  const [npc, setNpc] = useState<Character | null>(null);
  const [pair, setPair] = useState<PairState | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // Keys for selects
  const personalityKeys = Object.keys(personalities) as PersonalityKey[];
  const activityKeys = Object.keys(activities) as ActivityKey[];
  const moodKeys = Object.keys(moods) as MoodKey[];

  // Gifts available to choose from (union of defaults + each character's prefs)
  const giftOptions = useMemo(() => {
    if (!player || !npc) return [...DEFAULT_GIFTS];
    return Array.from(
      new Set<string>([
        ...DEFAULT_GIFTS,
        ...player.favoriteGifts,
        ...npc.favoriteGifts,
      ])
    );
  }, [player, npc]);

  const relLevel = useMemo(
    () => (pair ? levelFromScore(pair.relationshipScore) : "neutral"),
    [pair]
  );

  // ===== Actions =====
  function startGame() {
    const p: Character = structuredClone(defaultPlayerSeed);
    p.name = name;
    p.primaryPersonality = primary;
    p.stats = { strength, charisma };

    const n: Character = structuredClone(npcRook);
    const pr = newPair(p.id, n.id);

    setPlayer(p);
    setNpc(n);
    setPair(pr);
    setLogs([{ id: "log_intro", text: `You arrive at camp. ${n.name} is nearby.` }]);
    setView("interact");
  }

  function addLines(lines: string[]) {
    setLogs((prev) => [...prev, ...lines.map((text) => ({ id: newId(), text }))]);
    // force react to notice in-place mutations inside domain
    setPair((prev) => (prev ? { ...prev } : prev));
    setPlayer((prev) => (prev ? { ...prev } : prev));
    setNpc((prev) => (prev ? { ...prev } : prev));
  }

  function onTick() {
    if (!player || !npc || !pair) return;
    // expire moods
    const t = now();
    for (const c of [player, npc]) {
      if (c.moodExpiresAt && c.moodExpiresAt < t) {
        c.currentMood = undefined;
        c.moodExpiresAt = undefined;
      }
    }
    // decay shared memories
    decaySimple(t, pair);

    // poke React
    setPair({ ...pair });
    setPlayer({ ...player });
    setNpc({ ...npc });
  }

  function handleGreeting() {
    if (!player || !npc || !pair) return;
    const dlg = pickAndRender(player, npc, pair, {
      now: now(),
      vars: { targetName: npc.name },
    });
    if (!dlg) {
      addLines([`No greeting available.`]);
      return;
    }
    addLines([
      `${player.name}: ${dlg.opener}`,
      `${npc.name}: ${dlg.response}`,
      `${player.name}: ${dlg.resolution}`,
    ]);
  }

  function handleDiscussActivity(activity: ActivityKey) {
    if (!player || !npc || !pair) return;
    const dlg = pickAndRender(player, npc, pair, {
      now: now(),
      activity,
      vars: { activity, targetName: npc.name },
    });
    if (!dlg) {
      addLines([`They don't feel like discussing ${activity} right now.`]);
      return;
    }
    addLines([
      `${player.name}: ${dlg.opener}`,
      `${npc.name}: ${dlg.response}`,
      `${player.name}: ${dlg.resolution}`,
    ]);
  }

  function handleGift(gift: string) {
    if (!player || !npc || !pair) return;
    const t = now();
    const outcome = performAction("give_gift", player, npc, pair, t, { gift });
    addLines([
      `${player.name} offers ${npc.name} a ${gift}. (p=${outcome.chance.toFixed(
        2
      )} roll=${outcome.roll.toFixed(2)})`,
    ]);

    // Gift reaction dialogue is authored as NPC opener → Player response
    const dlg = pickAndRender(npc, player, pair, {
      now: t,
      triggered: { key: "give_gift", success: outcome.success },
      vars: { gift, targetName: player.name },
    });
    if (dlg) {
      addLines([
        `${npc.name}: ${dlg.opener}`,
        `${player.name}: ${dlg.response}`,
        `${npc.name}: ${dlg.resolution}`,
      ]);
    } else {
      addLines([`${npc.name} hesitates. It doesn't quite land.`]);
    }
  }

  function handleMoodCheck() {
    if (!player || !npc || !pair) return;
    const t = now();
    // Perform an "offer_comfort" action to record mechanics effects (rel + memory).
    const outcome = performAction("offer_comfort", player, npc, pair, t);
    addLines([
      `${player.name} checks in. (p=${outcome.chance.toFixed(
        2
      )} roll=${outcome.roll.toFixed(2)})`,
    ]);

    const dlg = pickAndRender(player, npc, pair, {
      now: t,
      vars: { targetName: npc.name },
    });
    if (dlg) {
      addLines([
        `${player.name}: ${dlg.opener}`,
        `${npc.name}: ${dlg.response}`,
        `${player.name}: ${dlg.resolution}`,
      ]);
    }
  }

  // ===== Render =====
  if (view === "create") {
    return (
      <div className="wrap">
        <h1>PoC — Social System</h1>

        <section className="card">
          <h2>Character Creation</h2>
          <div className="grid2">
            <label>
              Name
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </label>

            <label>
              Primary Personality
              <select
                value={primary}
                onChange={(e) => setPrimary(e.target.value as PersonalityKey)}
              >
                {personalityKeys.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Strength: {strength}
              <input
                type="range"
                min={1}
                max={10}
                value={strength}
                onChange={(e) => setStrength(Number(e.target.value))}
              />
            </label>

            <label>
              Charisma: {charisma}
              <input
                type="range"
                min={1}
                max={10}
                value={charisma}
                onChange={(e) => setCharisma(Number(e.target.value))}
              />
            </label>
          </div>

          <button className="primary" onClick={startGame}>
            Start → Interact with NPC
          </button>
        </section>

        <footer>We’ll add more creator fields as your schema grows.</footer>
      </div>
    );
  }

  // --- Interact view ---
  if (!player || !npc || !pair) return null;

  return (
    <div className="wrap">
      <h1>PoC — Social System</h1>

      <section className="card">
        <h2>Camp</h2>
        <div className="row">
          <div className="col">
            <h3>Player</h3>
            <p>
              <b>{player.name}</b> ({player.primaryPersonality})
            </p>
            <p>
              STR {player.stats.strength} | CHA {player.stats.charisma}
            </p>
            <p>Mood: {player.currentMood ?? "—"}</p>
          </div>

          <div className="col">
            <h3>NPC</h3>
            <p>
              <b>{npc.name}</b> ({npc.primaryPersonality})
            </p>
            <p>
              STR {npc.stats.strength} | CHA {npc.stats.charisma}
            </p>
            <p>Mood: {npc.currentMood ?? "—"}</p>
          </div>

          <div className="col">
            <h3>Relationship</h3>
            <p>
              Score: <b>{pair.relationshipScore}</b>
            </p>
            <p>
              Level: <b>{relLevel}</b>
            </p>
            <button onClick={onTick}>Tick (expire moods / decay memories)</button>
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Actions</h2>
        <div className="actions">
          <button onClick={handleGreeting}>Greeting</button>

          <ActionDiscuss
            activities={activityKeys}
            onChoose={(a) => handleDiscussActivity(a)}
          />

          <ActionGift
            gifts={giftOptions}
            onChoose={(g) => handleGift(g)}
          />

          <ActionMood
            moods={moodKeys}
            npc={npc}
            onSet={(m) => {
              setMood(npc, m);
              setNpc({ ...npc });
            }}
          />

          <button onClick={handleMoodCheck}>Mood Check-in</button>
        </div>
      </section>

      <section className="card">
        <h2>Log</h2>
        <div className="log">
          {logs.map((l) => (
            <div key={l.id} className="logline">
              {l.text}
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Debug</h2>
        <details>
          <summary>Shared memories ({pair.sharedMemories.length})</summary>
          <ul>
            {pair.sharedMemories.map((m) => (
              <li key={m.id}>
                <code>[{m.weight}]</code> {m.text}
              </li>
            ))}
          </ul>
        </details>
      </section>
    </div>
  );
}

// ===== Tiny helper subcomponents (UI-only; presentational) =====
function ActionDiscuss({
  activities,
  onChoose,
}: {
  activities: ReadonlyArray<ActivityKey>;
  onChoose: (a: ActivityKey) => void;
}) {
  const [a, setA] = useState<ActivityKey>("sparring");
  return (
    <div className="row">
      <label>
        Activity
        <select
          value={a}
          onChange={(e) => setA(e.target.value as ActivityKey)}
        >
          {activities.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </label>
      <button onClick={() => onChoose(a)}>Discuss Activity</button>
    </div>
  );
}

function ActionGift({
  gifts,
  onChoose,
}: {
  gifts: ReadonlyArray<string>;
  onChoose: (g: string) => void;
}) {
  const [g, setG] = useState(gifts[0] ?? "");
  return (
    <div className="row">
      <label>
        Gift
        <select value={g} onChange={(e) => setG(e.target.value)}>
          {gifts.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </label>
      <button disabled={!g} onClick={() => onChoose(g)}>
        Give Gift
      </button>
    </div>
  );
}

function ActionMood({
  moods,
  npc,
  onSet,
}: {
  moods: ReadonlyArray<MoodKey>;
  npc: Character;
  onSet: (m?: MoodKey) => void;
}) {
  const [m, setM] = useState<MoodKey | "none">("none");
  return (
    <div className="row">
      <label>
        Set NPC Mood (dev)
        <select value={m} onChange={(e) => setM(e.target.value as any)}>
          <option value="none">none</option>
          {moods.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
      </label>
      <button onClick={() => onSet(m === "none" ? undefined : (m as MoodKey))}>
        Apply
      </button>
    </div>
  );
}
