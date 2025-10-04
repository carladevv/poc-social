export const relationshipLevels = {
  enemy:     { minScore: -100, maxScore: -60 },
  rival:     { minScore: -59,  maxScore: -20 },
  neutral:   { minScore: -19,  maxScore: 19 },
  buddy:     { minScore: 20,   maxScore: 59 },
  companion: { minScore: 60,   maxScore: 100 },
} as const;

export type RelLevel = keyof typeof relationshipLevels;
