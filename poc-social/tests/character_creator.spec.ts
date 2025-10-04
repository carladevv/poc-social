import {
  DEFAULT_PRONOUN_SETS,
  PERSONALITY_TYPES,
  ACTIVITIES, GIFTS, HOBBIES,
  STAT_POINT_BUDGET,
  createCharacter,
  updateCharacter,
  createMemoryRepository,
  ValidationError,
} from "../src/character_creator";

import type { CharacterDraft } from "../src/character_creator";

const baseDraft = (): CharacterDraft => ({
  name: "Testy",
  pronouns: { ...DEFAULT_PRONOUN_SETS[2] },
  personalityPrimary: "gentle",
  personalitySecondary: "fun",
  appearance: { kind: "appearance_ref", id: "appearance:basic" },
  likes: {
    activities: [ACTIVITIES[0]],
    gifts: [GIFTS[0], GIFTS[1]],
    hobbies: [HOBBIES[0], HOBBIES[1]],
  },
  dislikes: {
    activities: [ACTIVITIES[1]],
    gifts: [GIFTS[2], GIFTS[3]],
    hobbies: [HOBBIES[2], HOBBIES[3]],
  },
  stats: { str: 2, dex: 4, wis: 2, cha: 2 },
});

describe("character_creator validation", () => {
  it("creates a valid character and sets id/timestamps", () => {
    const c = createCharacter(baseDraft());
    expect(c.id).toBeTypeOf("string");
    expect(c.createdAt).toBeTypeOf("number");
    expect(c.updatedAt).toBeTypeOf("number");
  });

  it("enforces personalities must be valid and distinct", () => {
    const draft = baseDraft();
    draft.personalityPrimary = PERSONALITY_TYPES[0];
    draft.personalitySecondary = PERSONALITY_TYPES[0] as any;
    expect(() => createCharacter(draft)).toThrow(ValidationError);
  });

  it("enforces exact like/dislike counts for each category", () => {
    const bad = baseDraft();
    bad.likes.gifts = [GIFTS[0]]; // should be 2
    expect(() => createCharacter(bad)).toThrow(ValidationError);
  });

  it("rejects overlaps between likes and dislikes", () => {
    const bad = baseDraft();
    bad.dislikes.gifts = [...bad.likes.gifts]; // overlap
    expect(() => createCharacter(bad)).toThrow(ValidationError);
  });

  it("rejects invalid options", () => {
    const bad = baseDraft();
    (bad.likes.activities as any) = ["totally_not_allowed"];
    expect(() => createCharacter(bad)).toThrow(ValidationError);
  });

  it("requires stats to sum to STAT_POINT_BUDGET", () => {
    const bad = baseDraft();
    bad.stats = { str: 10, dex: 1, wis: 0, cha: 0 }; // sum 11
    expect(() => createCharacter(bad)).toThrow(ValidationError);
  });

  it("allows fully custom pronouns", () => {
    const draft = baseDraft();
    draft.pronouns = {
      label: "fae/faer",
      subject: "fae",
      object: "faer",
      possessive: "faer",
      reflexive: "faerself",
    };
    const c = createCharacter(draft);
    expect(c.pronouns.label).toBe("fae/faer");
  });

  it("updateCharacter deep-merges and revalidates", () => {
    const c1 = createCharacter(baseDraft());
    const c2 = updateCharacter(c1, {
      likes: { gifts: [GIFTS[4], GIFTS[5]] }, // replace gifts likes
      stats: { dex: 3, cha: 3, str: 2, wis: 2 }, // keep sum 10
    });
    expect(c2.likes.gifts).toEqual([GIFTS[4], GIFTS[5]]);
    expect(c2.updatedAt).toBeGreaterThan(c2.createdAt);
  });

  it("repository basic CRUD", () => {
    const repo = createMemoryRepository();
    const c = createCharacter(baseDraft());
    repo.add(c);
    expect(repo.list().length).toBe(1);
    const got = repo.get(c.id)!;
    expect(got.name).toBe("Testy");
    repo.remove(c.id);
    expect(repo.list().length).toBe(0);
  });
});
