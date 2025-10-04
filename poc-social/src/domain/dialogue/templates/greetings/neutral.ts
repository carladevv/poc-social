import type { DialogueTemplate } from "../../types";

const tpl: DialogueTemplate = {
  id: "greeting_neutral",
  kind: "greeting",
  conditions: { minRelationship: "neutral", cooldownSec: 12 },
  opener: {
    personality_jock: [
      { text: "Morning, {targetName}." },
      { text: "You're up early." },
      { text: "Good day for drills." },
    ],
    personality_cranky: [
      { text: "{targetName}." },
      { text: "Don't loiter." },
      { text: "What?" },
    ],
    personality_stoic: [
      { text: "Greetings." },
      { text: "{targetName}." },
      { text: "Morning." },
    ],
    personality_peppy: [
      { text: "{targetName}! Good to see you!" },
      { text: "Hey hey—looking sharp today, {targetName}!" },
      { text: "Hi! Fancy a walk?" },
    ],
  },
  response: {
    personality_jock: [
      { text: "Let’s get to it.", tone: "neutral" },
      { text: "Training later?", tone: "pos" },
      { text: "Coffee first.", tone: "neutral" },
    ],
    personality_cranky: [
      { text: "Sure.", tone: "neutral" },
      { text: "Hn.", tone: "neutral" },
      { text: "If we must.", tone: "neg" },
    ],
    personality_stoic: [
      { text: "Indeed.", tone: "neutral" },
      { text: "Acknowledged.", tone: "neutral" },
      { text: "Very well.", tone: "neutral" },
    ],
    personality_peppy: [
      { text: "You too!", tone: "pos" },
      { text: "Let's make today sparkle!", tone: "pos" },
      { text: "Eeee!", tone: "pos" },
    ],
  },
  resolution: {
    positive: {
      personality_jock:   ["Stretch and move.", "Meet by the yard.", "Let’s set a pace."],
      personality_cranky: ["Don't chatter.", "Keep it moving.", "Fine."],
      personality_stoic:  ["Proceed.", "On schedule.", "Stay focused."],
      personality_peppy:  ["Adventure queue: now!", "Let's grab snacks!", "I'll bring music!"],
    },
    negative: {
      personality_jock:   ["Alright.", "Another time.", "Suit yourself."],
      personality_cranky: ["Thought so.", "Predictable.", "Whatever."],
      personality_stoic:  ["Noted.", "Understood.", "We adapt."],
      personality_peppy:  ["Okay… later!", "No worries!", "I'll circle back!"],
    },
    neutral: {
      personality_jock:   ["Warm up first.", "Hydrate.", "Check your laces."],
      personality_cranky: ["Fine.", "Mm.", "Okay."],
      personality_stoic:  ["Understood.", "Proceed.", "As planned."],
      personality_peppy:  ["Let's go!", "We got this!", "Sparkle time!"],
    }
  },
  vars: ["targetName"],
};
export default tpl;
