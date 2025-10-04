import type { DialogueTemplate } from "../../types";

const tpl: DialogueTemplate = {
  id: "boast_general",
  kind: "social_action",
  conditions: { trigger: "boast", /* no success gate -> matches both outcomes */ cooldownSec: 12 },
  opener: {
    personality_jock:   [{ text: "Did you see my form today?" }],
    personality_cranky: [{ text: "Obviously I'm the best around." }],
    personality_stoic:  [{ text: "My result was satisfactory." }],
    personality_peppy:  [{ text: "Guess who crushed it? This gal!" }],
  },
  response: {
    personality_jock:   [{ text: "Not bad!", tone: "pos" }, { text: "Keep it humble.", tone: "neg" }],
    personality_cranky: [{ text: "Congrats. Want a medal?", tone: "neg" }],
    personality_stoic:  [{ text: "Acknowledged.", tone: "neutral" }],
    personality_peppy:  [{ text: "Yaaas! But save room for others!", tone: "pos" }],
  },
  resolution: {
    positive: {
      personality_jock:   ["Race you to the yard."],
      personality_cranky: ["Prove it again."],
      personality_stoic:  ["Repeatability matters."],
      personality_peppy:  ["Let's celebrate later!"],
    },
    negative: {
      personality_jock:   ["Alright, message received."],
      personality_cranky: ["Finally, silence."],
      personality_stoic:  ["Understood."],
      personality_peppy:  ["Oops—I'll tone it down!"],
    },
    neutral: {
      personality_jock:   ["Back to training."],
      personality_cranky: ["Whatever."],
      personality_stoic:  ["Proceed."],
      personality_peppy:  ["Okay, onward!"],
    },
  },
  vars: [],
};

export default tpl;
