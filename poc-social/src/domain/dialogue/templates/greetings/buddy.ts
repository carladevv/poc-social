import type { DialogueTemplate } from "../../types";

const tpl: DialogueTemplate = {
  id: "greeting_buddy",
  kind: "greeting",
  conditions: { minRelationship: "buddy", cooldownSec: 10 },
  opener: {
    personality_jock: [
      { text: "{targetName}! Training partner!" },
      { text: "There you are—spot me later?" },
      { text: "Got a new drill to try." },
    ],
    personality_cranky: [
      { text: "There you are. Took you long enough." },
      { text: "Don't make me wave twice." },
      { text: "You remembered." },
    ],
    personality_stoic: [
      { text: "{targetName}. Good timing." },
      { text: "Your presence is useful." },
      { text: "Walk with me." },
    ],
    personality_peppy: [
      { text: "{targetName}! I missed you!" },
      { text: "Hiiii! Group hug later?" },
      { text: "I saved you a seat!" },
    ],
  },
  response: {
    personality_jock: [
      { text: "Let’s move.", tone: "pos" },
      { text: "Always.", tone: "pos" },
      { text: "Warm-up first?", tone: "neutral" },
    ],
    personality_cranky: [
      { text: "Yeah, yeah.", tone: "neutral" },
      { text: "Don't get sappy.", tone: "neg" },
      { text: "Fine.", tone: "neutral" },
    ],
    personality_stoic: [
      { text: "Ready.", tone: "neutral" },
      { text: "Proceed.", tone: "neutral" },
      { text: "Affirmative.", tone: "neutral" },
    ],
    personality_peppy: [
      { text: "Same!!", tone: "pos" },
      { text: "Best timing!", tone: "pos" },
      { text: "Let's do something fun!", tone: "pos" },
    ],
  },
  resolution: {
    positive: {
      personality_jock:   ["Meet you at the yard.", "Race you there.", "I'll bring bands."],
      personality_cranky: ["Don't slow me down.", "Bring coffee.", "Try to keep up."],
      personality_stoic:  ["Proceed.", "We stay on schedule.", "I will brief you."],
      personality_peppy:  ["Adventure time!", "Snack run!", "Music on!"],
    },
    negative: {
      personality_jock:   ["Okay, later.", "No sweat.", "Catch you after drills."],
      personality_cranky: ["Hmph.", "Whatever.", "Don't make me wait."],
      personality_stoic:  ["Noted.", "Another time.", "We adapt."],
      personality_peppy:  ["Rain check?", "I'll be nearby!", "Sending you good vibes!"],
    },
    neutral: {
      personality_jock:   ["Stretch first.", "Hydrate.", "Check straps."],
      personality_cranky: ["Fine.", "Sure.", "Mm."],
      personality_stoic:  ["Understood.", "Proceed.", "As planned."],
      personality_peppy:  ["Let's roll!", "We got this!", "Sparkle squad!"],
    }
  },
  vars: ["targetName"],
};
export default tpl;
