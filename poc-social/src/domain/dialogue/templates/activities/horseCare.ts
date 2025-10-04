import type { DialogueTemplate } from "../../types";

const tpl: DialogueTemplate = {
  id: "discuss_activity_horse_care",
  kind: "discussion",
  conditions: { minRelationship: "rival", requiredActivity: ["horse_care"], chanceToTrigger: 0.3, cooldownSec: 15 },
  opener: {
    personality_jock:   [{ text: "{activity} keeps me grounded." }, { text: "Brushed the mane till it shone." }],
    personality_cranky: [{ text: "Mud. Hooves. My back hurts.", }, { text: "{activity}? Again?" }],
    personality_stoic:  [{ text: "Animals require patience." }, { text: "{activity} completed." }],
    personality_peppy:  [{ text: "They nuzzled my hand! Instant joy!", tone:"pos" }, { text: "I sang while grooming!", tone:"pos" }],
  },
  response: {
    personality_jock:   [{ text: "They like a firm hand.", tone: "neutral" }, { text: "Let's ride later.", tone: "pos" }],
    personality_cranky: [{ text: "Stable reeks.", tone: "neg" }, { text: "Next time, you swap with me.", tone: "neg" }],
    personality_stoic:  [{ text: "Care builds trust.", tone: "neutral" }, { text: "Routine matters.", tone: "neutral" }],
    personality_peppy:  [{ text: "We should braid their tails!", tone: "pos" }, { text: "Carrots for everyone!", tone: "pos" }],
  },
  resolution: {
    positive: {
      personality_jock:   ["Saddles at dusk."],
      personality_cranky: ["Fine. I'm washing my boots."],
      personality_stoic:  ["Note it in the ledger."],
      personality_peppy:  ["Stable party later!"],
    },
    negative: {
      personality_jock:   ["You're missing the fun."],
      personality_cranky: ["Exactly."],
      personality_stoic:  ["Noted."],
      personality_peppy:  ["Aww—okay, rain check."],
    },
    neutral: {
      personality_jock:   ["Warm up first."],
      personality_cranky: ["Whatever."],
      personality_stoic:  ["Proceed."],
      personality_peppy:  ["I'll bring sugar cubes!"],
    }
  },
  vars: ["activity"],
};

export default tpl;
