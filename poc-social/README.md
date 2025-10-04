# React + TypeScript + Vite

This is a proof of concept for a dialogue/social system between user-created characters. It aims for maximum flexibility and variation while keeping the number of variables and constraints reasonable.

## Folder structure

```bash
src/
  app/                      # App shell & routes (keeps React app wiring separate)
    App.tsx
    main.tsx
  ui/                       # Pure presentational components (buttons, pickers, panels)
    components/
      Button.tsx
      Field.tsx
      Select.tsx
      LogPanel.tsx
      StatsMeter.tsx
    screens/
      CreateCharacterScreen.tsx
      CampScreen.tsx
  state/                    # App state (store + selectors), no domain logic
    store.ts                # Zustand/Context or simple reducers
    selectors.ts
    types.ts                # UI-level state shapes only
  domain/                   # Game domain, framework-agnostic (NO React imports here)
    characters/
      types.ts              # Character types only
      factory.ts            # Create character from inputs
      validators.ts         # (Optional) zod/yup validation for creation form
    relationships/
      types.ts              # Relationship types only
      scoring.ts            # +/− relationship adjustments
      decay.ts              # memory decay, mood expiry
    memories/
      types.ts
      create.ts             # addMemory, compose memory text, tagging
    actions/                # Mechanics for social actions (no UI)
      types.ts              # SocialAction types only
      success.ts            # successChance(...) ONLY
      apply.ts              # How an action mutates pair state + memories
    dialogue/               # Dialogue engine (selection + rendering), SRP-per-file
      types.ts              # Template & rendering types only
      gates.ts              # Template gating (conditions)
      rank.ts               # (Optional) scoring/weighting when many templates match
      render.ts             # Interpolate vars, pick lines, 3-sentence stitcher
      engine.ts             # Public API: pickAndRender(ctx) using the above files
      registry.ts           # Auto-load & index templates from templates/**
      templates/            # Each template is its own file; grouped in folders
        greetings/
          casual.ts
          formal.ts
        activities/
          sparring.ts
          cooking.ts
          archery.ts
        social/
          gift/
            success.ts
            fail.ts
          boast.ts
          offer_comfort.ts
        memory/
          callbacks.ts
  data/                     # Static game data; no logic
    schema/                 # Each schema in its own file
      personalities.ts
      activities.ts
      moods.ts
      socialActions.ts
      relationshipLevels.ts
      memoryWeights.ts
    index.ts                # Re-export schemas; read-only constants
    seeds/                  # Seed characters/world
      npc.rook.ts
      player.default.ts
  lib/                      # Small generic utilities (no domain knowledge)
    rng.ts                  # randomPick, weightedPick
    time.ts                 # now(), clampMs, durations
    strings.ts              # safeReplace, capitalize, etc.
  config/
    paths.d.ts              # (Optional) path aliases typings
  styles/
    index.css

```