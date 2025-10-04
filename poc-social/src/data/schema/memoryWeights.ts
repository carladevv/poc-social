export const memoryWeights = {
  low:       { value: 1,  decayRate: 0.1 },
  medium:    { value: 3,  decayRate: 0.05 },
  high:      { value: 5,  decayRate: 0.01 },
  permanent: { value: 10, decayRate: 0.0 },
} as const;

export type MemoryWeightKey = keyof typeof memoryWeights;
