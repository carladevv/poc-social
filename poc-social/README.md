# poc-social (Character Systems)

## Overview
This repo is built as **layered, SRP-first modules** (creator, dialogue, camp, etc.). Each module is headless/pure and exposes a small public API.

### Current focus: Character Creator
Headless system to define and validate characters for the sim: stats, personalities, likes/dislikes, pronouns, and an opaque appearance ref. No UI or persistence required.

## Folder structure

```bash
src/
character_creator/
  constants.ts # single source of truth for option lists & budgets
  types.ts # Character, CharacterDraft, PronounSet, DeepPartial, etc.
  errors.ts # ValidationError
  validators.ts # business rules (no I/O)
  factory.ts # createCharacter, updateCharacter (pure + monotonic timestamps)
  repository.ts # in-memory repo (dev only)
  index.ts # public API barrel
tests/
  character_creator.spec.ts
```

## Public API (import from `src/character_creator`)
- **Constants:** `PERSONALITY_TYPES`, `DEFAULT_PRONOUN_SETS`, `ACTIVITIES`, `GIFTS`, `HOBBIES`, `STAT_KEYS`, `STAT_POINT_BUDGET`
- **Types:** `Character`, `CharacterDraft`, `PronounSet`, `AppearanceRef`, `Stats`, `Personality`
- **Errors:** `ValidationError`
- **Factory:** `createCharacter(draft) -> Character`, `updateCharacter(character, partial) -> Character`
- **Repo:** `createMemoryRepository() -> CharacterRepository`

## Core invariants
- Name required, ≤ 60 chars.
- Pronouns require `label/subject/object/possessive/reflexive` (custom allowed).
- Personalities from list and **primary ≠ secondary**.
- Likes/Dislikes:
  - **Activities:** exactly 1 like + 1 dislike.
  - **Gifts:** exactly 2 likes + 2 dislikes.
  - **Hobbies:** exactly 2 likes + 2 dislikes.
  - No duplicates; an item can’t be both liked and disliked; must be from allowed lists.
- Stats include `str/dex/wis/cha` and **sum to 10**, non-negative integers.
- `appearance` is an opaque `AppearanceRef` (future system).
- `updateCharacter` preserves invariants and guarantees **`updatedAt > previous`**.

## Development
```bash
npm i
npm i -D vitest @types/node ts-node
```

### Run tests:
```bash
npm test
# or
npm run test:watch
```

### Example usage:

```ts
import {
  DEFAULT_PRONOUN_SETS,
  createCharacter,
  createMemoryRepository,
} from "./src/character_creator";

const repo = createMemoryRepository();

const c = createCharacter({
  name: "Alice of the Vale",
  pronouns: { ...DEFAULT_PRONOUN_SETS[0] },
  personalityPrimary: "gentle",
  personalitySecondary: "fun",
  appearance: { kind: "appearance_ref", id: "appearance:basic-elf-01" },
  likes: { activities: ["archery"], gifts: ["blue_rose","fine_perfume"], hobbies: ["stargazing","writing_poetry"] },
  dislikes:{ activities: ["guard_duty"], gifts: ["smooth_rock","warm_socks"], hobbies: ["strength_training","playing_lute"] },
  stats: { str: 2, dex: 4, wis: 2, cha: 2 },
});

repo.add(c);
```