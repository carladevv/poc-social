import type { Character } from "@domain/characters/types";

export function CharacterCard({ c }: { c: Character }) {
  return (
    <section className="card">
      <h3 style={{ marginTop: 0 }}>{c.name}</h3>
      <p>
        <b>Personality:</b> {c.primaryPersonality}
        {c.secondaryPersonality ? ` / ${c.secondaryPersonality}` : ""}
      </p>
      <p><b>Stats:</b> STR {c.stats.strength} · CHA {c.stats.charisma}</p>
      <p><b>Mood:</b> {c.currentMood ?? "—"}</p>
      <p>
        <b>Hobbies:</b> {(c.flavorLikes ?? []).join(", ") || "—"}
        {c.flavorDislikes?.length ? (
          <> · <b>Dislikes:</b> {c.flavorDislikes.join(", ")}</>
        ) : null}
      </p>
      <p><b>Fav. gifts:</b> {c.favoriteGifts.join(", ") || "—"}</p>
    </section>
  );
}
