export const socialActions = {
  challenge_to_spar: { name: "Challenge to Spar", baseSuccessChance: 0.7, statInfluence: "strength" },
  share_rations:     { name: "Share Rations",     baseSuccessChance: 0.8, statInfluence: "charisma" },
  give_gift:         { name: "Give Gift",         baseSuccessChance: 0.9, statInfluence: "charisma" },
  boast:             { name: "Boast",             baseSuccessChance: 0.5, statInfluence: "charisma" },
  offer_comfort:     { name: "Offer Comfort",     baseSuccessChance: 0.6, statInfluence: "charisma" },
} as const;

export type SocialActionKey = keyof typeof socialActions;
