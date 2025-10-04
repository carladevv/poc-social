import type { DialogueTemplate } from "../../types";

const tpl: DialogueTemplate = {
  id: "greeting_companion",
  kind: "greeting",
  conditions: { minRelationship: "companion", cooldownSec: 8 },
  opener: {
    personality_jock: [
      { text: "{targetName}! You’re just who I wanted to see." },
      { text: "Partner! Ready to smash goals?" },
      { text: "Got your back, {targetName}." },
    ],
    personality_cranky: [
      { text: "Hey. You made it." },
      { text: "Took you long enough—kidding. Kind of." },
      { text: "Sit. Walk. Your pick." },
    ],
    personality_stoic: [
      { text: "Your presence is welcome, {targetName}." },
      { text: "I prefer when you're around." },
      { text: "Good. You're here." },
    ],
    personality_peppy: [
      { text: "{targetName}! My favorite person!" },
      { text: "Eeee! I saved a pastry for you!" },
      { text: "Today is going to be perfect with you here!" },
    ],
  },
  response: {
    personality_jock: [
      { text: "Right back at you.", tone: "pos" },
      { text: "Always.", tone: "pos" },
      { text: "Let’s set a pace.", tone: "pos" },
    ],
    personality_cranky: [
      { text: "Don't make it weird.", tone: "pos" },
      { text: "…Okay, fine.", tone: "pos" },
      { text: "I guess I missed you too.", tone: "pos" },
    ],
    personality_stoic: [
      { text: "Likewise.", tone: "pos" },
      { text: "Affirmative.", tone: "pos" },
      { text: "Good.", tone: "pos" },
    ],
    personality_peppy: [
      { text: "Same!!", tone: "pos" },
      { text: "Hugs later!", tone: "pos" },
      { text: "Let's conquer the day!", tone: "pos" },
    ],
  },
  resolution: {
    positive: {
      personality_jock:   ["Let’s crush today together.", "Run with me.", "We’ll set a PR."],
      personality_cranky: ["Come on, then.", "Don't dawdle.", "I saved you a seat."],
      personality_stoic:  ["Proceed in step.", "We move.", "Maintain rhythm."],
      personality_peppy:  ["Best day incoming!", "Snack break on me!", "Dance break later!"],
    },
    negative: {
      personality_jock:   ["All good.", "Another time.", "Catch you later."],
      personality_cranky: ["Fine, fine.", "Your loss.", "Hmph."],
      personality_stoic:  ["Noted.", "As you wish.", "We’ll regroup."],
      personality_peppy:  ["We’ll catch up later!", "No worries!", "I’ll text you sparkles!"],
    },
    neutral: {
      personality_jock:   ["Warm up?", "Hydrate first.", "Light jog."],
      personality_cranky: ["Sure.", "Fine.", "Okay."],
      personality_stoic:  ["Understood.", "Proceed.", "On schedule."],
      personality_peppy:  ["Let’s roll!", "We got this!", "Sparkle squad—assemble!"],
    }
  },
  vars: ["targetName"],
};
export default tpl;
