import type { DialogueTemplate } from "../../types";

const tpl: DialogueTemplate = {
  id: "offer_comfort_success",
  kind: "social_action",
  conditions: { trigger: "offer_comfort", success: true, cooldownSec: 20 },
  opener: {
    personality_jock:   [{ text: "Hey—I'm here. Want to walk it off?" }],
    personality_cranky: [{ text: "Sit. Talk. Or don't." }],
    personality_stoic:  [{ text: "You are not alone." }],
    personality_peppy:  [{ text: "I'm here for you. Always." }],
  },
  response: {
    personality_jock:   [{ text: "Thanks. I needed that.", tone: "pos" }],
    personality_cranky: [{ text: "…Fine. Stay.", tone: "pos" }],
    personality_stoic:  [{ text: "Your presence helps.", tone: "pos" }],
    personality_peppy:  [{ text: "You're the best, really.", tone: "pos" }],
  },
  resolution: {
    positive: {
      personality_jock:   ["Let's get some air."],
      personality_cranky: ["Don't make it weird."],
      personality_stoic:  ["Breathe with me."],
      personality_peppy:  ["Tea and blankets later!"],
    },
    negative: {
      personality_jock:   [""],
      personality_cranky: [""],
      personality_stoic:  [""],
      personality_peppy:  [""],
    },
    neutral: {
      personality_jock:   [""],
      personality_cranky: [""],
      personality_stoic:  [""],
      personality_peppy:  [""],
    },
  },
  vars: [],
};

export default tpl;
