import type { DialogueTemplate } from "../../types";

const tpl: DialogueTemplate = {
  id: "discuss_activity_archery",
  kind: "discussion",
  conditions: { minRelationship: "rival", requiredActivity: ["archery"], chanceToTrigger: 0.3, cooldownSec: 15 },
  opener: {
    personality_jock:   [{ text: "That {activity} burned my shoulders—in a good way." }, { text: "Arms steady, arrows steady." }],
    personality_cranky: [{ text: "{activity}? Wind ruined my shots.", }, { text: "My string's frayed. Figures." }],
    personality_stoic:  [{ text: "Form first. Then release." }, { text: "The {activity} range was quiet." }],
    personality_peppy:  [{ text: "{activity} was sooo fun!", tone:"pos" }, { text: "Did you see that bullseye?!", tone:"pos" }],
  },
  response: {
    personality_jock:   [{ text: "We can tighten your stance.", tone: "pos" }, { text: "Next round, farther targets.", tone: "pos" }],
    personality_cranky: [{ text: "It was fine. Barely.", tone: "neg" }, { text: "Could be worse.", tone: "neutral" }],
    personality_stoic:  [{ text: "Consistency matters.", tone: "neutral" }, { text: "Adjust for wind.", tone: "neutral" }],
    personality_peppy:  [{ text: "Let's paint our fletching!", tone: "pos" }, { text: "I want another try!", tone: "pos" }],
  },
  resolution: {
    positive: {
      personality_jock:   ["Range in five. Bring extra arrows."],
      personality_cranky: ["Fine. Just don't cheer."],
      personality_stoic:  ["We will measure groups."],
      personality_peppy:  ["Archery club starts now!"],
    },
    negative: {
      personality_jock:   ["Suit yourself."],
      personality_cranky: ["Exactly what I said."],
      personality_stoic:  ["Noted."],
      personality_peppy:  ["Aww—next time then!"],
    },
    neutral: {
      personality_jock:   ["Warm up shoulders first."],
      personality_cranky: ["Whatever."],
      personality_stoic:  ["Proceed."],
      personality_peppy:  ["I'll bring targets!"],
    },
  },
  vars: ["activity"],
};

export default tpl;
