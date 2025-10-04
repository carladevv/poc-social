import type { PairState } from "@domain/characters/types";

export function RelationshipPanel(props: {
  pair: PairState;
  relationshipLevel: string;
  onTick: () => void;
}) {
  const { pair, relationshipLevel, onTick } = props;
  return (
    <section className="card">
      <h3 style={{ marginTop: 0 }}>Relationship</h3>
      <p><b>Score:</b> {pair.relationshipScore}</p>
      <p><b>Level:</b> {relationshipLevel}</p>
      <button onClick={onTick}>Tick (expire moods / decay)</button>
    </section>
  );
}
