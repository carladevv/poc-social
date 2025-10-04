import type { DialogueTemplate } from "../../types";

const tpl: DialogueTemplate = {
  id: "memory_reference_general",
  kind: "memory",
  conditions: { minRelationship: "rival", chanceToTrigger: 0.15, cooldownSec: 20 },
  opener: {
    personality_jock:   [{ text: "Hey, remember when {memory}? Wild day." }],
    personality_cranky: [{ text: "I haven't forgotten when {memory}." }],
    personality_stoic:  [{ text: "I recall when {memory}." }],
    personality_peppy:  [{ text: "OMG, when {memory}? Still cracks me up!" }],
  },
  response: {
    personality_jock:   [{ text: "Legendary.", tone: "pos" }, { text: "How could I forget.", tone: "neutral" }],
    personality_cranky: [{ text: "Unfortunately.", tone: "neg" }, { text: "Don't remind me.", tone: "neg" }],
    personality_stoic:  [{ text: "Indeed.", tone: "neutral" }],
    personality_peppy:  [{ text: "Best day ever!", tone: "pos" }],
  },
  resolution: {
    positive: {
      personality_jock:   ["We should top it today."],
      personality_cranky: ["Try not to repeat it."],
      personality_stoic:  ["May it inform us."],
      personality_peppy:  ["Round two later!"],
    },
    negative: {
      personality_jock:   ["Fair."],
      personality_cranky: ["Exactly."],
      personality_stoic:  ["Noted."],
      personality_peppy:  ["Okay—new memories instead!"],
    },
    neutral: {
      personality_jock:   ["Back to work."],
      personality_cranky: ["Hmph."],
      personality_stoic:  ["Proceed."],
      personality_peppy:  ["Let's make today count!"],
    },
  },
  vars: ["memory"],
};

export default tpl;
