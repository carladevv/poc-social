import type { ActivityKey, MoodKey } from "@data";
import type { Character, PairState } from "@domain/characters/types";
import { ActionDiscuss } from "@ui/components/ActionDiscuss";
import { ActionGift } from "@ui/components/ActionGift";
import { ActionMood } from "@ui/components/ActionMood";
import { ActionBoast } from "@ui/components/ActionBoast";
import { ActionShareHobby } from "@ui/components/ActionShareHobby";
import { LogPanel } from "@ui/components/LogPanel";

export function CampScreen(props: {
  player: Character;
  npc: Character;
  pair: PairState;
  relationshipLevel: string;
  activityOptions: ReadonlyArray<{ key: ActivityKey; label: string }>;
  moodKeys: ReadonlyArray<MoodKey>;
  logs: ReadonlyArray<{ id: string; text: string }>;
  onTick: () => void;
  onGreeting: () => void;
  onDiscuss: (a: ActivityKey) => void;
  onGift: (g: string) => void;
  onBoast: () => void;
  onShareHobby: (hobby: string) => void;
  onMoodSet: (m?: MoodKey) => void;
  onMoodCheck: () => void;
}) {
  const {
    player, npc, pair, relationshipLevel, activityOptions, moodKeys, logs,
    onTick, onGreeting, onDiscuss, onGift, onBoast, onShareHobby, onMoodSet, onMoodCheck
  } = props;

  // gift list (union of known defaults + favorites)
  const giftOptions = Array.from(new Set<string>([
    "polished_stone","fresh_herbs","carved_token","quality_oil","good_rope","sharp_knife",
    ...player.favoriteGifts, ...npc.favoriteGifts
  ]));

  return (
    <div className="wrap">
      <h1>PoC — Social System</h1>

      {/* Top status card */}
      <section className="card">
        <h2>Camp</h2>
        <div className="row">
          <div className="col">
            <h3>Player</h3>
            <p><b>{player.name}</b> ({player.primaryPersonality}{player.secondaryPersonality ? ` / ${player.secondaryPersonality}` : ""})</p>
            <p>STR {player.stats.strength} | CHA {player.stats.charisma}</p>
            <p>Mood: {player.currentMood ?? "—"}</p>
            <p>
              Hobbies: {(player.flavorLikes ?? []).join(", ") || "—"}
              {(player.flavorDislikes?.length ? ` | Dislikes: ${player.flavorDislikes.join(", ")}` : "")}
            </p>
          </div>
          <div className="col">
            <h3>NPC</h3>
            <p><b>{npc.name}</b> ({npc.primaryPersonality}{npc.secondaryPersonality ? ` / ${npc.secondaryPersonality}` : ""})</p>
            <p>STR {npc.stats.strength} | CHA {npc.stats.charisma}</p>
            <p>Mood: {npc.currentMood ?? "—"}</p>
            <p>
              Hobbies: {(npc.flavorLikes ?? []).join(", ") || "—"}
              {(npc.flavorDislikes?.length ? ` | Dislikes: ${npc.flavorDislikes.join(", ")}` : "")}
            </p>
          </div>
          <div className="col">
            <h3>Relationship</h3>
            <p>Score: <b>{pair.relationshipScore}</b></p>
            <p>Level: <b>{relationshipLevel}</b></p>
            <button onClick={onTick}>Tick (expire moods / decay memories)</button>
          </div>
        </div>
      </section>

      {/* Split: Actions (left) + Log (right) */}
      <section className="split">
        <div className="col">
          <section className="card">
            <h2>Actions</h2>
            <div className="actions">
              <button onClick={onGreeting}>Greeting</button>
              <ActionDiscuss options={activityOptions} onChoose={onDiscuss} />
              <ActionGift gifts={giftOptions} onChoose={onGift} />
              <ActionBoast onClick={onBoast} />
              <ActionShareHobby hobbies={player.flavorLikes ?? []} onShare={onShareHobby} />
              <ActionMood moods={moodKeys} npcMood={npc.currentMood} onSet={onMoodSet} />
              <button onClick={onMoodCheck}>Mood Check-in</button>
            </div>
          </section>
        </div>

        <div className="col">
          <section className="card log-card">
            <h2>Log</h2>
            <LogPanel
              logs={logs}
              memories={pair.sharedMemories}
              height="55vh"         // side column height; adjust as you like
              autoScroll={true}     // always scroll to newest line
            />
          </section>
        </div>
      </section>
    </div>
  );
}
