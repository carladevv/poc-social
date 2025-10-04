import type { PersonalityKey } from "@data";
import { preferences } from "@data";
import { MultiSelect } from "@ui/components/MultiSelect";

export function CreateCharacterScreen(props: {
  name: string;
  primary: PersonalityKey;
  secondary?: PersonalityKey;
  strength: number;
  charisma: number;
  personalityKeys: ReadonlyArray<PersonalityKey>;

  selectedGifts: string[];
  selectedHobbies: string[];          // likes
  selectedHobbyDislikes: string[];    // dislikes

  onName: (v: string) => void;
  onPrimary: (v: PersonalityKey) => void;
  onSecondary: (v?: PersonalityKey) => void;
  onStrength: (v: number) => void;
  onCharisma: (v: number) => void;
  onGifts: (v: string[]) => void;
  onHobbies: (v: string[]) => void;
  onHobbyDislikes: (v: string[]) => void;
  onStart: () => void;
}) {
  const {
    name, primary, secondary, strength, charisma, personalityKeys,
    selectedGifts, selectedHobbies, selectedHobbyDislikes,
    onName, onPrimary, onSecondary, onStrength, onCharisma,
    onGifts, onHobbies, onHobbyDislikes, onStart
  } = props;

  // Prevent choosing the same hobby in both lists by filtering options
  const hobbyLikeOptions = [...preferences.hobbies];
  const hobbyDislikeOptions = preferences.hobbies.filter(h => !selectedHobbies.includes(h));

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
              {personalityKeys.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </label>

          <label>
            Secondary Personality (optional)
            <select value={secondary ?? ""} onChange={(e) => onSecondary((e.target.value || undefined) as any)}>
              <option value="">—</option>
              {personalityKeys.map((k) => <option key={k} value={k}>{k}</option>)}
            </select>
          </label>

          <div />
          <label>
            Strength: {strength}
            <input type="range" min={1} max={10} value={strength} onChange={(e) => onStrength(Number(e.target.value))} />
          </label>
          <label>
            Charisma: {charisma}
            <input type="range" min={1} max={10} value={charisma} onChange={(e) => onCharisma(Number(e.target.value))} />
          </label>
        </div>

        <h3>Favorite gifts (pick up to 2)</h3>
        <MultiSelect options={[...preferences.favoriteGifts]} selected={selectedGifts} onChange={onGifts} max={2} />

        <h3>Hobby likes (pick up to 2)</h3>
        <MultiSelect options={hobbyLikeOptions} selected={selectedHobbies} onChange={onHobbies} max={2} />

        <h3>Hobby dislikes (pick up to 2)</h3>
        <MultiSelect options={hobbyDislikeOptions} selected={selectedHobbyDislikes} onChange={onHobbyDislikes} max={2} />

        <button className="primary" onClick={onStart} style={{ marginTop: 12 }}>
          Start → Interact with NPC
        </button>
      </section>
      <footer>Secondary personality: 15% chance to speak in that voice.</footer>
    </div>
  );
}
