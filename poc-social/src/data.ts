// src/data.ts
export const dataSchema = {
  personalityTypes: {
    jock: { name: "Jock", description: "Energetic, competitive, and constantly talks about training." },
    cranky: { name: "Cranky", description: "Grumpy, blunt, and quick to complain." },
    stoic: { name: "Stoic", description: "Quiet, observant, and speaks in short sentences." },
    peppy: { name: "Peppy", description: "Enthusiastic, talkative, and easily excited." },
  },
  activityTypes: {
    sparring: { name: "Sparring" },
    cooking: { name: "Cooking" },
    horse_care: { name: "Horse Care" },
    archery: { name: "Archery" },
    guard_duty: { name: "Guard Duty" },
  },
  likesDislikes: {
    activityBased: {
      likes: ["winning_sparring", "good_food", "clean_gear", "horseback_riding", "recognition"],
      dislikes: ["losing_sparring", "bad_food", "messy_camp", "loud_noises", "bragging"],
    },
    favoriteGifts: ["polished_stone", "fresh_herbs", "carved_token", "quality_oil", "good_rope", "sharp_knife"],
    flavorText: {
      hobbies: ["whittling wood", "reading old scrolls", "sharpening swords", "playing the lute", "mending clothes", "stargazing"],
    },
  },
  moodTypes: {
    elated: { name: "Elated", durationHours: 4 },
    stressed: { name: "Stressed", durationHours: 6 },
    grieving: { name: "Grieving", durationHours: 48 },
    injured: { name: "Injured", durationHours: 24 },
    proud: { name: "Proud", durationHours: 8 },
  },
  socialActions: {
    challenge_to_spar: { name: "Challenge to Spar", baseSuccessChance: 0.7, statInfluence: "strength" },
    share_rations: { name: "Share Rations", baseSuccessChance: 0.8, statInfluence: "charisma" },
    give_gift: { name: "Give Gift", baseSuccessChance: 0.9, statInfluence: "charisma" },
    boast: { name: "Boast", baseSuccessChance: 0.5, statInfluence: "charisma" },
    offer_comfort: { name: "Offer Comfort", baseSuccessChance: 0.6, statInfluence: "charisma" },
  },
  relationshipLevels: {
    enemy: { minScore: -100, maxScore: -60 },
    rival: { minScore: -59, maxScore: -20 },
    neutral: { minScore: -19, maxScore: 19 },
    buddy: { minScore: 20, maxScore: 59 },
    companion: { minScore: 60, maxScore: 100 },
  },
  memoryWeights: {
    low: { value: 1, decayRate: 0.1 },
    medium: { value: 3, decayRate: 0.05 },
    high: { value: 5, decayRate: 0.01 },
    permanent: { value: 10, decayRate: 0.0 },
  },
} as const;

export type PersonalityKey = keyof typeof dataSchema.personalityTypes;
export type ActivityKey = keyof typeof dataSchema.activityTypes;
export type MoodKey = keyof typeof dataSchema.moodTypes;
export type SocialActionKey = keyof typeof dataSchema.socialActions;
export type MemoryWeightKey = keyof typeof dataSchema.memoryWeights;

export type Stats = { strength: number; charisma: number };
