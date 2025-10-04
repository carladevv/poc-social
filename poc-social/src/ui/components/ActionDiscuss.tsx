import type { ActivityKey } from "@data";
import { useState } from "react";

export function ActionDiscuss(props: {
  options: ReadonlyArray<{ key: ActivityKey; label: string }>;
  onChoose: (a: ActivityKey) => void;
}) {
  const { options, onChoose } = props;
  const [val, setVal] = useState<ActivityKey>(options[0]?.key ?? "sparring");

  return (
    <div className="row">
      <label>
        Activity
        <select value={val} onChange={(e) => setVal(e.target.value as ActivityKey)}>
          {options.map((o) => (
            <option key={o.key} value={o.key}>{o.label}</option>
          ))}
        </select>
      </label>
      <button onClick={() => onChoose(val)}>Discuss Activity</button>
    </div>
  );
}
