import { useMemo, useState } from "react";
import "@styles/index.css";

// Data (read-only)
import { personalities, activities, moods } from "@data";
import type { ActivityKey, MoodKey, PersonalityKey } from "@data";
import { defaultPlayerSeed } from "@data/seeds/player.default";
import { npcRook } from "@data/seeds/npc.rook";

// Domain (no React inside)
import { newPair, setMood } from "@domain/characters/factory";
import type { Character, PairState } from "@domain/characters/types";
import { levelFromScore } from "@domain/relationships/scoring";
import { decaySimple } from "@domain/relationships/decay";
import { performAction } from "@domain/actions/apply";
import { pickAndRender } from "@domain/dialogue/engine";

// Screens
import { CreateCharacterScreen } from "@ui/screens/CreateCharacterScreen";
import { CampScreen } from "@ui/screens/CampScreen";

// UI-local
type LogEntry = { id: string; text: string };
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

  // Options for dropdowns with pretty labels
  const personalityKeys = Object.keys(personalities) as PersonalityKey[];
  const activityOptions = useMemo(
    () => (Object.keys(activities) as ActivityKey[]).map((k) => ({ key: k, label: activities[k].name })),
    []
  );
  const moodKeys = Object.keys(moods) as MoodKey[];

  // Derived
  const relLevel = useMemo(
    () => (pair ? levelFromScore(pair.relationshipScore) : "neutral"),
    [pair]
  );

  // ===== Bootstrapping =====
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

  // ===== Utilities =====
  function addLines(lines: string[]) {
    setLogs((prev: LogEntry[]) => [...prev, ...lines.map((text) => ({ id: newId(), text }))]);
    setPair((prev: PairState | null) => (prev ? { ...prev } : prev));
    setPlayer((prev: Character | null) => (prev ? { ...prev } : prev));
    setNpc((prev: Character | null) => (prev ? { ...prev } : prev));
  }

  function onTick() {
    if (!player || !npc || !pair) return;
    const t = now();
    for (const c of [player, npc]) {
      if (c.moodExpiresAt && c.moodExpiresAt < t) {
        c.currentMood = undefined;
        c.moodExpiresAt = undefined;
      }
    }
    decaySimple(t, pair);
    setPair({ ...pair }); setPlayer({ ...player }); setNpc({ ...npc });
  }

  // ===== Action handlers (call domain, format text) =====
  function handleGreeting() {
    if (!player || !npc || !pair) return;
    const dlg = pickAndRender(player, npc, pair, { now: now(), vars: { targetName: npc.name } });
    if (!dlg) return addLines([`No greeting available.`]);
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
    if (!dlg) return addLines([`They don't feel like discussing ${activities[activity].name} right now.`]);
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
    addLines([`${player.name} offers ${npc.name} a ${gift}. (p=${outcome.chance.toFixed(2)} roll=${outcome.roll.toFixed(2)})`]);

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

  function handleBoast() {
    if (!player || !npc || !pair) return;
    const t = now();
    const outcome = performAction("boast", player, npc, pair, t);
    addLines([`${player.name} boasts. (p=${outcome.chance.toFixed(2)} roll=${outcome.roll.toFixed(2)})`]);

    // For boast, player is the opener (actor)
    const dlg = pickAndRender(player, npc, pair, {
      now: t,
      triggered: { key: "boast", success: outcome.success },
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

  function handleMoodSet(m?: MoodKey) {
    if (!npc) return;
    setMood(npc, m);
    setNpc({ ...npc });
  }

  function handleMoodCheck() {
    if (!player || !npc || !pair) return;
    const t = now();
    const outcome = performAction("offer_comfort", player, npc, pair, t);
    addLines([`${player.name} checks in. (p=${outcome.chance.toFixed(2)} roll=${outcome.roll.toFixed(2)})`]);
    const dlg = pickAndRender(player, npc, pair, { now: t, vars: { targetName: npc.name } });
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
      <CreateCharacterScreen
        name={name}
        primary={primary}
        strength={strength}
        charisma={charisma}
        personalityKeys={personalityKeys}
        onName={setName}
        onPrimary={setPrimary}
        onStrength={setStrength}
        onCharisma={setCharisma}
        onStart={startGame}
      />
    );
  }

  if (!player || !npc || !pair) return null;

  return (
    <CampScreen
      player={player}
      npc={npc}
      pair={pair}
      relationshipLevel={relLevel}
      activityOptions={activityOptions}
      moodKeys={moodKeys}
      logs={logs}
      onTick={onTick}
      onGreeting={handleGreeting}
      onDiscuss={handleDiscussActivity}
      onGift={handleGift}
      onBoast={handleBoast}
      onMoodSet={handleMoodSet}
      onMoodCheck={handleMoodCheck}
    />
  );
}
