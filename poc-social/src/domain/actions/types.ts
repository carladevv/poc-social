export type SocialActionKey = "challenge_to_spar"|"share_rations"|"give_gift"|"boast"|"offer_comfort";

export type ActionOutcome = {
  success: boolean;
  chance: number;
  roll: number;
  relDelta: number;
  memory?: { text: string; weight: "low"|"medium"|"high"|"permanent"; meta?: Record<string,any> };
};
