import {
  DEFAULT_PRONOUN_SETS,
  createCharacter,
  createMemoryRepository,
} from "../character_creator";

const repo = createMemoryRepository();

const alice = createCharacter({
  name: "Alice of the Vale",
  pronouns: { ...DEFAULT_PRONOUN_SETS[0] }, // she/her preset (can edit later)
  personalityPrimary: "gentle",
  personalitySecondary: "fun",
  appearance: { kind: "appearance_ref", id: "appearance:basic-elf-01" },
  likes: {
    activities: ["archery"],
    gifts: ["blue_rose", "fine_perfume"],
    hobbies: ["stargazing", "writing_poetry"],
  },
  dislikes: {
    activities: ["guard_duty"],
    gifts: ["smooth_rock", "warm_socks"],
    hobbies: ["strength_training", "playing_lute"],
  },
  stats: { str: 2, dex: 4, wis: 2, cha: 2 }, // sums to 10
});

repo.add(alice);
console.log(repo.list().length); // 1
