import { useState } from "react";

export function ActionGift(props: {
  gifts: ReadonlyArray<string>;
  onChoose: (g: string) => void;
}) {
  const { gifts, onChoose } = props;
  const [g, setG] = useState(gifts[0] ?? "");

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
      <button disabled={!g} onClick={() => onChoose(g)}>Give Gift</button>
    </div>
  );
}
