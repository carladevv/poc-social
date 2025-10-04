import type { DialogueTemplate } from "../../types";

const tpl: DialogueTemplate = {
  id: "greeting_formal",
  kind: "greeting",
  conditions: { minRelationship: "buddy", blockedMood: ["grieving"], cooldownSec: 25 },
  opener: {
    personality_jock:   [{ text: "Good to see you, {targetName}. Training later?" }],
    personality_cranky: [{ text: "You're punctual, {targetName}." }],
    personality_stoic:  [{ text: "{targetName}. Your presence is noted." }],
    personality_peppy:  [{ text: "Greetings, {targetName}! You look radiant." }],
  },
  response: {
    personality_jock:   [{ text: "Count me in.", tone: "pos" }],
    personality_cranky: [{ text: "I suppose.", tone: "neutral" }],
    personality_stoic:  [{ text: "Acknowledged.", tone: "neutral" }],
    personality_peppy:  [{ text: "Absolutely! Lead the way!", tone: "pos" }],
  },
  resolution: {
    positive: {
      personality_jock:   ["Meet by the yard after noon."],
      personality_cranky: ["Don't waste my time."],
      personality_stoic:  ["We begin promptly."],
      personality_peppy:  ["I'll bring ribbons!"],
    },
    negative: {
      personality_jock:   ["Rain check, then."],
      personality_cranky: ["As expected."],
      personality_stoic:  ["Understood."],
      personality_peppy:  ["Another time!"],
    },
    neutral: {
      personality_jock:   ["Stretch first."],
      personality_cranky: ["Fine."],
      personality_stoic:  ["Proceed."],
      personality_peppy:  ["I'll ping you!"],
    },
  },
  vars: ["targetName"],
};

export default tpl;
