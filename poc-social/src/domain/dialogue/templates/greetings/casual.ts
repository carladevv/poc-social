import type { DialogueTemplate } from "../../types";
const tpl: DialogueTemplate = {
  id: "greeting_casual",
  kind: "greeting",
  conditions: { minRelationship: "neutral", blockedMood: ["grieving","stressed"], cooldownSec: 20 },
  opener: {
    personality_jock:   [{ text: "Hey, {targetName}! Ready to train?" }, { text: "You're up early, {targetName}." }],
    personality_cranky: [{ text: "{targetName}. You're in my way." }, { text: "What do you want, {targetName}?" }],
    personality_stoic:  [{ text: "{targetName}." }, { text: "Morning." }],
    personality_peppy:  [{ text: "{targetName}! Good to see you!" }, { text: "Hey hey! Looking great today, {targetName}!" }],
  },
  response: {
    personality_jock:   [{ text: "Always ready!", tone: "pos" }, { text: "Yeah, let's go!", tone: "pos" }],
    personality_cranky: [{ text: "Don't push your luck.", tone: "neg" }, { text: "Whatever.", tone: "neg" }],
    personality_stoic:  [{ text: "Hmm.", tone: "neutral" }, { text: "Indeed.", tone: "neutral" }],
    personality_peppy:  [{ text: "You too! Love your spirit!", tone: "pos" }, { text: "Yay! Let's make today amazing!", tone: "pos" }],
  },
  resolution: {
    positive: {
      personality_jock:   ["Then let's stretch and move!"],
      personality_cranky: ["Huh. Fine. Don't slow me down."],
      personality_stoic:  ["Proceed."],
      personality_peppy:  ["Let's make it sparkle!"],
    },
    negative: {
      personality_jock:   ["C'mon, loosen up!"],
      personality_cranky: ["See? This is why I avoid chatter."],
      personality_stoic:  ["Noted."],
      personality_peppy:  ["Oh... okay, maybe later!"],
    },
    neutral: {
      personality_jock:   ["Warm-up first, yeah?"],
      personality_cranky: ["Tch."],
      personality_stoic:  ["Understood."],
      personality_peppy:  ["I'll grab my boots!"],
    }
  },
  vars: ["targetName"]
};
export default tpl;
