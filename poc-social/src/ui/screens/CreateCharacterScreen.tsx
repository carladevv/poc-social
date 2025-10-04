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
        <h2>Create a Character</h2>

        <div className="form-vertical">
          <label className="field">
            <span className="label">Name</span>
            <input
              autoFocus
              value={name}
              onChange={(e) => onName(e.target.value)}
              placeholder="e.g., Aria"
            />
          </label>

          <label className="field">
            <span className="label">Primary personality</span>
            <select
              value={primary}
              onChange={(e) => onPrimary(e.target.value as PersonalityKey)}
            >
              {personalityKeys.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="label">Secondary personality (optional)</span>
            <select
              value={secondary ?? ""}
              onChange={(e) => onSecondary((e.target.value || undefined) as any)}
            >
              <option value="">—</option>
              {personalityKeys.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
            <small className="hint">15% chance to speak in this voice.</small>
          </label>

          <label className="field">
            <span className="label">Strength: {strength}</span>
            <input
              type="range" min={1} max={10}
              value={strength}
              onChange={(e) => onStrength(Number(e.target.value))}
            />
          </label>

          <label className="field">
            <span className="label">Charisma: {charisma}</span>
            <input
              type="range" min={1} max={10}
              value={charisma}
              onChange={(e) => onCharisma(Number(e.target.value))}
            />
          </label>

          <div className="field">
            <span className="label">Favorite gifts (pick up to 2)</span>
            <MultiSelect
              options={[...preferences.favoriteGifts]}
              selected={selectedGifts}
              onChange={onGifts}
              max={2}
            />
          </div>

          <div className="field">
            <span className="label">Hobby likes (pick up to 2)</span>
            <MultiSelect
              options={hobbyLikeOptions}
              selected={selectedHobbies}
              onChange={onHobbies}
              max={2}
            />
          </div>

          <div className="field">
            <span className="label">Hobby dislikes (pick up to 2)</span>
            <MultiSelect
              options={hobbyDislikeOptions}
              selected={selectedHobbyDislikes}
              onChange={onHobbyDislikes}
              max={2}
            />
            <small className="hint">You can’t select a hobby in both lists.</small>
          </div>

          <button className="primary" onClick={onStart}>Start → Interact with NPC</button>
        </div>
      </section>
    </div>
  );
}
