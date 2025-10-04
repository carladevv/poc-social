import type { DialogueTemplate } from "../../types";

const tpl: DialogueTemplate = {
  id: "greeting_rival",
  kind: "greeting",
  conditions: { minRelationship: "rival", cooldownSec: 12 },
  opener: {
    personality_jock: [
      { text: "{targetName}. Ready to lose today?" },
      { text: "Round two, {targetName}." },
      { text: "Try to keep up." },
    ],
    personality_cranky: [
      { text: "Try not to waste my time, {targetName}." },
      { text: "You're late." },
      { text: "If we must." },
    ],
    personality_stoic: [
      { text: "{targetName}. Keep pace." },
      { text: "Remain focused." },
      { text: "We proceed." },
    ],
    personality_peppy: [
      { text: "Game on, {targetName}!" },
      { text: "Rival check-in: I'm winning today!" },
      { text: "Let’s make this fun." },
    ],
  },
  response: {
    personality_jock: [
      { text: "Bring it.", tone: "pos" },
      { text: "Finally.", tone: "pos" },
      { text: "Warm-up first.", tone: "neutral" },
    ],
    personality_cranky: [
      { text: "We'll see.", tone: "neutral" },
      { text: "Hurry up.", tone: "neg" },
      { text: "Don't boast yet.", tone: "neg" },
    ],
    personality_stoic: [
      { text: "As required.", tone: "neutral" },
      { text: "Acknowledged.", tone: "neutral" },
      { text: "Begin.", tone: "neutral" },
    ],
    personality_peppy: [
      { text: "You're on!", tone: "pos" },
      { text: "Loser makes tea!", tone: "pos" },
      { text: "Eeee—let's go!", tone: "pos" },
    ],
  },
  resolution: {
    positive: {
      personality_jock:   ["Meet you at the yard.", "Last one there runs laps.", "Loser carries water."],
      personality_cranky: ["Don't be late.", "Keep up.", "Try not to whine."],
      personality_stoic:  ["Proceed.", "We begin promptly.", "Maintain form."],
      personality_peppy:  ["Winner gets snacks!", "I'll bring ribbons!", "High-five after!"],
    },
    negative: {
      personality_jock:   ["Backing out already?", "Talk after you prove it.", "Save your breath."],
      personality_cranky: ["As expected.", "Figures.", "Spare me."],
      personality_stoic:  ["Noted.", "Delay unacceptable.", "We continue anyway."],
      personality_peppy:  ["Aww, okay.", "Another time then.", "Mood killer!"],
    },
    neutral: {
      personality_jock:   ["Warm up.", "Gloves on.", "Stretch first."],
      personality_cranky: ["Fine.", "Whatever.", "Hmph."],
      personality_stoic:  ["Understood.", "Proceed.", "On my mark."],
      personality_peppy:  ["See you there!", "Let's roll!", "I'll grab water!"],
    }
  },
  vars: ["targetName"],
};
export default tpl;
