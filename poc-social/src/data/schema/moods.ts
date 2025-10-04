export const moods = {
  elated:   { name: "Elated",   durationHours: 4 },
  stressed: { name: "Stressed", durationHours: 6 },
  grieving: { name: "Grieving", durationHours: 48 },
  injured:  { name: "Injured",  durationHours: 24 },
  proud:    { name: "Proud",    durationHours: 8 },
} as const;

export type MoodKey = keyof typeof moods;
