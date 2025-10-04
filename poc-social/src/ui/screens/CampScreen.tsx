import type { ActivityKey, MoodKey } from "@data";
import type { Character, PairState } from "@domain/characters/types";
import { ActionDiscuss } from "@ui/components/ActionDiscuss";
import { ActionGift } from "@ui/components/ActionGift";
import { ActionMood } from "@ui/components/ActionMood";
import { ActionBoast } from "@ui/components/ActionBoast";
import { ActionShareHobby } from "@ui/components/ActionShareHobby";
import { LogPanel } from "@ui/components/LogPanel";
import { CharacterCard } from "@ui/components/CharacterCard";
import { RelationshipPanel } from "@ui/components/RelationshipPanel";

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

      <section className="split-3">
        {/* Column 1: Characters list */}
        <div className="col">
          <CharacterCard c={player} />
          <CharacterCard c={npc} />
          <RelationshipPanel pair={pair} relationshipLevel={relationshipLevel} onTick={onTick} />
        </div>

        {/* Column 2: Actions */}
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

        {/* Column 3: Log */}
        <div className="col">
          <section className="card log-card">
            <h2>Log</h2>
            <LogPanel
              logs={logs}
              memories={pair.sharedMemories}
              height="65vh"
              autoScroll={true}
            />
          </section>
        </div>
      </section>
    </div>
  );
}
