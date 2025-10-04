import type { DialogueTemplate } from "../../types";

const tpl: DialogueTemplate = {
  id: "greeting_enemy",
  kind: "greeting",
  conditions: { minRelationship: "enemy", cooldownSec: 12 },
  opener: {
    personality_jock: [
      { text: "{targetName}. Don't slow me down." },
      { text: "Out of my way, {targetName}." },
      { text: "Still breathing? Keep it that way—over there." },
    ],
    personality_cranky: [
      { text: "Move." },
      { text: "What now, {targetName}?" },
      { text: "*sigh* It's you." },
    ],
    personality_stoic: [
      { text: "{targetName}." },
      { text: "State your business." },
      { text: "Pass." },
    ],
    personality_peppy: [
      { text: "Oh. It's you, {targetName}." },
      { text: "Yikes—now?" },
      { text: "Let's skip this chat, okay?" },
    ],
  },
  response: {
    personality_jock: [
      { text: "Try me.", tone: "neg" },
      { text: "Keep talking.", tone: "neg" },
      { text: "You wish.", tone: "neg" },
    ],
    personality_cranky: [
      { text: "Tch.", tone: "neg" },
      { text: "Hnh.", tone: "neg" },
      { text: "Whatever.", tone: "neg" },
    ],
    personality_stoic: [
      { text: "Acknowledged.", tone: "neutral" },
      { text: "Very well.", tone: "neutral" },
      { text: "Noted.", tone: "neutral" },
    ],
    personality_peppy: [
      { text: "Rude.", tone: "neg" },
      { text: "Wow.", tone: "neg" },
      { text: "Ouch.", tone: "neg" },
    ],
  },
  resolution: {
    positive: {
      personality_jock:   ["Save it for the yard.", "Then prove it.", "Stay sharp."],
      personality_cranky: ["Hnh.", "Don't test me.", "As expected."],
      personality_stoic:  ["Proceed.", "Understood.", "Maintain distance."],
      personality_peppy:  ["I'll be elsewhere.", "Whatever.", "Have a nice… day, I guess."],
    },
    negative: {
      personality_jock:   ["Good. Keep distance.", "Fine by me.", "Walk away."],
      personality_cranky: ["Exactly.", "Knew it.", "Scram."],
      personality_stoic:  ["Noted.", "Avoid conflict.", "Understood."],
      personality_peppy:  ["Chill. I'm leaving.", "Rude vibes.", "Yeesh."],
    },
    neutral: {
      personality_jock:   ["Focus.", "Stay in your lane.", "Eyes front."],
      personality_cranky: ["Whatever.", "Mm.", "Fine."],
      personality_stoic:  ["Understood.", "Proceed.", "Carry on."],
      personality_peppy:  ["Okay then.", "Sure.", "Bye."],
    }
  },
  vars: ["targetName"],
};
export default tpl;
