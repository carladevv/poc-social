import type { DialogueTemplate } from "../../../types";

const tpl: DialogueTemplate = {
  id: "gift_reaction_fail",
  kind: "social_action",
  conditions: { trigger: "give_gift", success: false, cooldownSec: 10 },
  // In App, NPC is actor and opens when reacting to gifts
  opener: {
    personality_jock:   [{ text: "Uh… thanks, but I don't really use a {gift}." }],
    personality_cranky: [{ text: "What am I supposed to do with a {gift}?" }],
    personality_stoic:  [{ text: "I appreciate the thought. This {gift} is not needed." }],
    personality_peppy:  [{ text: "Oh! A {gift}! It's… not really my thing, sorry." }],
  },
  response: {
    personality_jock:   [{ text: "My bad—I'll try again.", tone: "neutral" }, { text: "Thought you'd like it.", tone: "neg" }],
    personality_cranky: [{ text: "Right, noted.", tone: "neutral" }],
    personality_stoic:  [{ text: "Understood.", tone: "neutral" }],
    personality_peppy:  [{ text: "All good! I'll find you something better!", tone: "pos" }],
  },
  resolution: {
    positive: {
      personality_jock:   ["It's fine. Save it for someone else."],
      personality_cranky: ["At least you tried."],
      personality_stoic:  ["The gesture matters."],
      personality_peppy:  ["We’ll do a gift swap later!"],
    },
    negative: {
      personality_jock:   ["Let's just move on."],
      personality_cranky: ["Next time, ask first."],
      personality_stoic:  ["Noted."],
      personality_peppy:  ["No worries!"],
    },
    neutral: {
      personality_jock:   ["Training later?" ],
      personality_cranky: ["Whatever."],
      personality_stoic:  ["Proceed."],
      personality_peppy:  ["Hugs anyway!"],
    },
  },
  vars: ["gift"],
};

export default tpl;
