export const activities = {
  sparring:   { name: "Sparring" },
  cooking:    { name: "Cooking" },
  horse_care: { name: "Horse Care" },
  archery:    { name: "Archery" },
  guard_duty: { name: "Guard Duty" },
} as const;

export type ActivityKey = keyof typeof activities;
