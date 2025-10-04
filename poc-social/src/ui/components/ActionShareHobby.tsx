import { useState } from "react";

export function ActionShareHobby(props: {
  hobbies: ReadonlyArray<string>;
  onShare: (hobby: string) => void;
}) {
  const { hobbies, onShare } = props;
  const [h, setH] = useState(hobbies[0] ?? "");
  return (
    <div className="row">
      <label>
        Hobby
        <select value={h} onChange={(e) => setH(e.target.value)}>
          {hobbies.map((k) => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
      </label>
      <button disabled={!hobbies.length} onClick={() => onShare(h)}>Share Hobby</button>
    </div>
  );
}
