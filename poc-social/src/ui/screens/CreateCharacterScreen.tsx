import type { PersonalityKey } from "@data";

export function CreateCharacterScreen(props: {
  name: string;
  primary: PersonalityKey;
  strength: number;
  charisma: number;
  personalityKeys: ReadonlyArray<PersonalityKey>;
  onName: (v: string) => void;
  onPrimary: (v: PersonalityKey) => void;
  onStrength: (v: number) => void;
  onCharisma: (v: number) => void;
  onStart: () => void;
}) {
  const { name, primary, strength, charisma, personalityKeys, onName, onPrimary, onStrength, onCharisma, onStart } = props;

  return (
    <div className="wrap">
      <h1>PoC — Social System</h1>
      <section className="card">
        <h2>Character Creation</h2>
        <div className="grid2">
          <label>
            Name
            <input value={name} onChange={(e) => onName(e.target.value)} />
          </label>

          <label>
            Primary Personality
            <select value={primary} onChange={(e) => onPrimary(e.target.value as PersonalityKey)}>
              {personalityKeys.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </label>

          <label>
            Strength: {strength}
            <input type="range" min={1} max={10} value={strength} onChange={(e) => onStrength(Number(e.target.value))} />
          </label>

          <label>
            Charisma: {charisma}
            <input type="range" min={1} max={10} value={charisma} onChange={(e) => onCharisma(Number(e.target.value))} />
          </label>
        </div>

        <button className="primary" onClick={onStart}>Start → Interact with NPC</button>
      </section>
      <footer>We’ll add more creator fields as your schema grows.</footer>
    </div>
  );
}
