// src/App.tsx
import { useMemo, useState } from "react";
import "./index.css";
import { dataSchema, type ActivityKey, type MoodKey, type PersonalityKey } from "./data";
import {
  defaultPlayer,
  premadeNPC,
  newPair,
  doGreeting,
  doDiscussActivity,
  doGiveGift,
  doMoodCheck,
  setMood,
  tick,
  levelFromScore,
  type Character,
  type PairState,
  type LogEntry,
} from "./engine";

export default function App() {
  const [view, setView] = useState<"create" | "interact">("create");

  // Player creation state
  const [name, setName] = useState("Aria");
  const [primary, setPrimary] = useState<PersonalityKey>("peppy");
  const [strength, setStrength] = useState(5);
  const [charisma, setCharisma] = useState(7);

  // Game state (initialized on "Start")
  const [player, setPlayer] = useState<Character | null>(null);
  const [npc, setNpc] = useState<Character | null>(null);
  const [pair, setPair] = useState<PairState | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const activities = Object.keys(dataSchema.activityTypes) as ActivityKey[];
  const gifts = dataSchema.likesDislikes.favoriteGifts;
  const moods = Object.keys(dataSchema.moodTypes) as MoodKey[];

  const relLevel = useMemo(() => (pair ? levelFromScore(pair.relationshipScore) : "neutral"), [pair]);

  function startGame() {
    const p = structuredClone(defaultPlayer);
    p.name = name;
    p.primaryPersonality = primary;
    p.stats = { strength, charisma };

    const n = structuredClone(premadeNPC);
    const pr = newPair(p.id, n.id);
    setPlayer(p);
    setNpc(n);
    setPair(pr);
    setLogs([{ id: "log_intro", text: `You arrive at camp. ${n.name} is nearby.` }]);
    setView("interact");
  }

  function addLogs(newLogs: LogEntry[]) {
    setLogs((prev) => [...prev, ...newLogs]);
    // refresh derived stuff
    setPair((prev) => (prev ? { ...prev } : prev));
  }

  function onTick() {
    if (player && npc && pair) tick(Date.now(), [player, npc], pair);
    setPlayer((p) => (p ? { ...p } : p));
    setNpc((n) => (n ? { ...n } : n));
  }

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
              <select value={primary} onChange={(e) => setPrimary(e.target.value as PersonalityKey)}>
                {Object.keys(dataSchema.personalityTypes).map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Strength: {strength}
              <input type="range" min={1} max={10} value={strength} onChange={(e) => setStrength(Number(e.target.value))} />
            </label>

            <label>
              Charisma: {charisma}
              <input type="range" min={1} max={10} value={charisma} onChange={(e) => setCharisma(Number(e.target.value))} />
            </label>
          </div>

          <button className="primary" onClick={startGame}>
            Start → Interact with NPC
          </button>
        </section>
        <footer>Tip: we’ll add likes/dislikes pickers later; defaults are prefilled.</footer>
      </div>
    );
  }

  // ======= Interact view =======
  if (!player || !npc || !pair) return null;

  return (
    <div className="wrap">
      <h1>PoC — Social System</h1>

      <section className="card">
        <h2>Camp</h2>
        <div className="row">
          <div className="col">
            <h3>Player</h3>
            <p><b>{player.name}</b> ({player.primaryPersonality})</p>
            <p>STR {player.stats.strength} | CHA {player.stats.charisma}</p>
            <p>Mood: {player.currentMood ?? "—"}</p>
          </div>
          <div className="col">
            <h3>NPC</h3>
            <p><b>{npc.name}</b> ({npc.primaryPersonality})</p>
            <p>STR {npc.stats.strength} | CHA {npc.stats.charisma}</p>
            <p>Mood: {npc.currentMood ?? "—"}</p>
          </div>
          <div className="col">
            <h3>Relationship</h3>
            <p>Score: <b>{pair.relationshipScore}</b></p>
            <p>Level: <b>{relLevel}</b></p>
            <button onClick={onTick}>Tick (expire moods / decay memories)</button>
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Actions</h2>
        <div className="actions">
          <button onClick={() => addLogs(doGreeting(player, npc, pair))}>Greeting</button>

          <ActionDiscuss activities={activities} onChoose={(a) => addLogs(doDiscussActivity(player, npc, pair, a))} />

          <ActionGift gifts={gifts} onChoose={(g) => addLogs(doGiveGift(player, npc, pair, g))} />

          <ActionMood moods={moods} npc={npc} onSet={(m) => { setMood(npc, m); setNpc({ ...npc }); }} />

          <button onClick={() => addLogs(doMoodCheck(player, npc, pair))}>Mood Check-in</button>
        </div>
      </section>

      <section className="card">
        <h2>Log</h2>
        <div className="log">
          {logs.map((l) => (
            <div key={l.id} className="logline">{l.text}</div>
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

/** --- Small helper subcomponents --- */
function ActionDiscuss({ activities, onChoose }: { activities: ActivityKey[]; onChoose: (a: ActivityKey) => void }) {
  const [a, setA] = useState<ActivityKey>("sparring");
  return (
    <div className="row">
      <label>
        Activity
        <select value={a} onChange={(e) => setA(e.target.value as ActivityKey)}>
          {activities.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
      </label>
      <button onClick={() => onChoose(a)}>Discuss Activity</button>
    </div>
  );
}

function ActionGift({ gifts, onChoose }: { gifts: string[]; onChoose: (g: string) => void }) {
  const [g, setG] = useState(gifts[0]);
  return (
    <div className="row">
      <label>
        Gift
        <select value={g} onChange={(e) => setG(e.target.value)}>
          {gifts.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
      </label>
      <button onClick={() => onChoose(g)}>Give Gift</button>
    </div>
  );
}

function ActionMood({ moods, npc, onSet }: { moods: MoodKey[]; npc: Character; onSet: (m?: MoodKey) => void }) {
  const [m, setM] = useState<MoodKey | "none">("none");
  return (
    <div className="row">
      <label>
        Set NPC Mood (dev)
        <select value={m} onChange={(e) => setM(e.target.value as any)}>
          <option value="none">none</option>
          {moods.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
      </label>
      <button onClick={() => onSet(m === "none" ? undefined : (m as MoodKey))}>Apply</button>
    </div>
  );
}
