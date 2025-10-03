// src/templates.ts
import type { ActivityKey, MoodKey, PersonalityKey, SocialActionKey } from "./data";

export type Template = {
  id: string;
  type: "greeting" | "discussion" | "social_action" | "memory" | "mood";
  conditions: {
    minRelationship?: "enemy" | "rival" | "neutral" | "buddy" | "companion";
    requiredMood?: MoodKey[];
    blockedMood?: MoodKey[];
    requiredActivity?: ActivityKey[];
    chanceToTrigger?: number;
    trigger?: SocialActionKey;
    success?: boolean;
  };
  opener: Record<`personality_${PersonalityKey}`, string[]>;
  response: Record<`personality_${PersonalityKey}`, string[]>;
  cooldownSec?: number;
};

export const dialogueTemplates: Record<string, Template> = {
  greeting_casual: {
    id: "greeting_casual",
    type: "greeting",
    conditions: { minRelationship: "neutral", requiredMood: [], blockedMood: ["grieving", "stressed"] },
    opener: {
      personality_jock: ["Hey, {targetName}! Ready to train?", "You're up early, {targetName}."],
      personality_cranky: ["{targetName}. You're in my way.", "What do you want, {targetName}?"],
      personality_stoic: ["{targetName}.", "Morning."],
      personality_peppy: ["{targetName}! Good to see you!", "Hey hey! Looking great today, {targetName}!"],
    },
    response: {
      personality_jock: ["Always ready!", "Yeah, let's go!"],
      personality_cranky: ["Don't push your luck.", "Whatever."],
      personality_stoic: ["Hmm.", "Indeed."],
      personality_peppy: ["You too! Love your spirit!", "Yay! Let's make today amazing!"],
    },
    cooldownSec: 20,
  },

  discuss_activity: {
    id: "discuss_activity",
    type: "discussion",
    conditions: { minRelationship: "rival", requiredActivity: ["sparring", "cooking", "archery"], chanceToTrigger: 0.3 },
    opener: {
      personality_jock: ["That {activity} session was intense!", "I'm still pumped from that {activity}!"],
      personality_cranky: ["That {activity} was a waste of time.", "My back hurts from that useless {activity}."],
      personality_stoic: ["The {activity} was adequate.", "Decent {activity}."],
      personality_peppy: ["Wasn't that {activity} session the best?!", "I loved today's {activity}!"],
    },
    response: {
      personality_jock: ["Yeah! We should do it again!", "I could go for another round!"],
      personality_cranky: ["Speak for yourself.", "It was mediocre at best."],
      personality_stoic: ["It served its purpose.", "Acceptable."],
      personality_peppy: ["It was amazing! We should do it every day!", "So much fun! Let's go again!"],
    },
    cooldownSec: 15,
  },

  gift_reaction_success: {
    id: "gift_reaction_success",
    type: "social_action",
    conditions: { trigger: "give_gift", success: true },
    opener: {
      personality_jock: ["Whoa, thanks for the {gift}!", "This {gift} is perfect! Thanks!"],
      personality_cranky: ["Hmph. I suppose this {gift} is... acceptable.", "Didn't expect this. Thanks."],
      personality_stoic: ["Thank you for the {gift}.", "I appreciate this."],
      personality_peppy: ["Oh my gods! I love this {gift}! Thank you!!!", "This {gift} is the best thing ever! You're amazing!"],
    },
    response: {
      personality_jock: ["No problem! Thought you'd like it!", "Knew you needed one of those!"],
      personality_cranky: ["Don't get used to it.", "Yeah, yeah. You're welcome."],
      personality_stoic: ["You're welcome.", "It was nothing."],
      personality_peppy: ["Anything for you!", "I'm just so happy you like it!"],
    },
    cooldownSec: 10,
  },

  memory_reference: {
    id: "memory_reference",
    type: "memory",
    conditions: { minRelationship: "rival", requiredMood: [], blockedMood: [], chanceToTrigger: 0.15 },
    opener: {
      personality_jock: ["Hey, remember that time {memory}? That was wild!", "I was just thinking about when {memory}. Good times!"],
      personality_cranky: ["I still haven't forgotten when {memory}. Typical.", "Don't think I've forgotten about {memory}."],
      personality_stoic: ["I recall when {memory}.", "The incident where {memory} was... memorable."],
      personality_peppy: ["OMG, remember when {memory}? That was so crazy!", "Thinking about when {memory} still makes me laugh!"],
    },
    response: {
      personality_jock: ["How could I forget!", "That was legendary!"],
      personality_cranky: ["Unfortunately, I remember.", "Don't remind me."],
      personality_stoic: ["I remember.", "Indeed."],
      personality_peppy: ["That was the best day ever!", "I'll never forget that!"],
    },
    cooldownSec: 20,
  },

  mood_reaction: {
    id: "mood_reaction",
    type: "mood",
    conditions: { requiredMood: ["stressed", "grieving", "injured"], minRelationship: "buddy" },
    opener: {
      personality_jock: ["You look rough. Want to spar to take your mind off things?", "Hey, you okay? You seem off."],
      personality_cranky: ["You look terrible. What's wrong with you?", "Stop moping. It's annoying."],
      personality_stoic: ["You seem troubled.", "I see your distress."],
      personality_peppy: ["Oh no! You look so sad! Want to talk about it?", "Hey, what's wrong? You can tell me anything!"],
    },
    response: {
      personality_jock: ["I'll be fine. Just need to push through.", "Thanks for noticing. I'll manage."],
      personality_cranky: ["Nothing a good complaint won't fix.", "Leave me alone."],
      personality_stoic: ["I will endure.", "It will pass."],
      personality_peppy: ["Thanks for caring! I just need some cheer!", "You're so sweet for asking! I'll be okay!"],
    },
    cooldownSec: 20,
  },
};
