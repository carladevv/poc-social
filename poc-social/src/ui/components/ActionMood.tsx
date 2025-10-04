import type { MoodKey } from "@data";
import { useState } from "react";

export function ActionMood(props: {
  moods: ReadonlyArray<MoodKey>;
  npcMood?: MoodKey;
  onSet: (m?: MoodKey) => void;
}) {
  const { moods, npcMood, onSet } = props;
  const [m, setM] = useState<MoodKey | "none">(npcMood ?? "none");

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
