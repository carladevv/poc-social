export const preferences = {
  activityBased: {
    likes: ["winning_sparring","good_food","clean_gear","horseback_riding","recognition"] as const,
    dislikes: ["losing_sparring","bad_food","messy_camp","loud_noises","bragging"] as const,
  },
  favoriteGifts: ["polished_stone","fresh_herbs","carved_token","quality_oil","good_rope","sharp_knife"] as const,
  hobbies: ["whittling wood","reading old scrolls","sharpening swords","playing the lute","mending clothes","stargazing"] as const,
} as const;

export type GiftKey   = (typeof preferences.favoriteGifts)[number];
export type HobbyKey  = (typeof preferences.hobbies)[number];
