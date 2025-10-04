export function MultiSelect(props: {
  options: ReadonlyArray<string>;
  selected: ReadonlyArray<string>;
  onChange: (next: string[]) => void;
  max?: number;
}) {
  const { options, selected, onChange, max } = props;

  function toggle(v: string) {
    const has = selected.includes(v);
    if (has) onChange(selected.filter((s) => s !== v));
    else {
      if (max && selected.length >= max) return;
      onChange([...selected, v]);
    }
  }

  return (
    <div className="checklist">
      {options.map((v) => (
        <label key={v} className="checkline">
          <input
            type="checkbox"
            checked={selected.includes(v)}
            onChange={() => toggle(v)}
          />
          <span>{v}</span>
        </label>
      ))}
    </div>
  );
}
