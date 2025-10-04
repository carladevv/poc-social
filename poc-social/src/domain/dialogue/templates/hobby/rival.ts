import type { DialogueTemplate } from "../../types";

const tpl: DialogueTemplate = {
  id: "hobby_rival",
  kind: "hobby",
  conditions: { minRelationship: "rival", cooldownSec: 10 },
  opener: {
    personality_jock: [
      { text: "I was up all night {hobby}. You wouldn't get it." },
      { text: "{hobby} keeps my edge. Doubt you know how." },
    ],
    personality_cranky: [
      { text: "{hobby}. I don't need your opinion." },
      { text: "Stayed up {hobby}. You'd slow me down anyway." },
    ],
    personality_stoic: [
      { text: "Time allocated to {hobby}." },
      { text: "{hobby}. Incremental gains." },
    ],
    personality_peppy: [
      { text: "Up all night {hobby}. You probably bailed at midnight." },
      { text: "Confession: I’m obsessed with {hobby} lately." },
    ],
  },

  // NEW: responses change with target’s preference
  responseByAffinity: {
    liked: {
      personality_jock: [
        { text: "Not get it? I was {hobby} every night this week!", tone: "pos" },
        { text: "Ha—same grind. Respect.", tone: "pos" },
      ],
      personality_cranky: [
        { text: "Please. I {hobby} better than you.", tone: "pos" },
        { text: "You're late to the party.", tone: "pos" },
      ],
      personality_stoic: [
        { text: "Shared practice noted.", tone: "pos" },
        { text: "We align in this.", tone: "pos" },
      ],
      personality_peppy: [
        { text: "Wait—we both {hobby}?! Best rivalry ever!", tone: "pos" },
        { text: "Twinsies!", tone: "pos" },
      ],
    },
    neutral: {
      personality_jock: [
        { text: "If it works for you.", tone: "neutral" },
        { text: "Whatever sharpens the blade.", tone: "neutral" },
      ],
      personality_cranky: [
        { text: "Do what you want.", tone: "neutral" },
        { text: "Thrilling.", tone: "neutral" },
      ],
      personality_stoic: [
        { text: "Acknowledged.", tone: "neutral" },
        { text: "As you wish.", tone: "neutral" },
      ],
      personality_peppy: [
        { text: "Neat. Maybe I'll try it sometime.", tone: "neutral" },
        { text: "Okay!", tone: "neutral" },
      ],
    },
    disliked: {
      personality_jock: [
        { text: "Only a rookie wastes time {hobby}.", tone: "neg" },
        { text: "That won’t help you beat me.", tone: "neg" },
      ],
      personality_cranky: [
        { text: "Only a simpleton likes {hobby}.", tone: "neg" },
        { text: "What a slog. Pass.", tone: "neg" },
      ],
      personality_stoic: [
        { text: "I find {hobby} inefficient.", tone: "neg" },
        { text: "Unproductive.", tone: "neg" },
      ],
      personality_peppy: [
        { text: "Ugh, {hobby}? Hard no.", tone: "neg" },
        { text: "I can’t stand that.", tone: "neg" },
      ],
    },
  },

  resolution: {
    positive: {
      personality_jock:   ["Huh. Who would've thought.", "Alright—respect."],
      personality_cranky: ["Tsk. Fine, we agree—for once."],
      personality_stoic:  ["Noted. We can compare notes."],
      personality_peppy:  ["See? We *are* compatible rivals!"],
    },
    negative: {
      personality_jock:   ["I don't know why I bothered telling you.", "Keep your mouthguard on."],
      personality_cranky: ["Predictable response.", "Spare me."],
      personality_stoic:  ["Acknowledged.", "This topic ends."],
      personality_peppy:  ["Wow. Mood killer.", "Okay—ouch."],
    },
    neutral: {
      personality_jock:   ["Back to drills."],
      personality_cranky: ["Whatever."],
      personality_stoic:  ["Proceed."],
      personality_peppy:  ["Next time, maybe you'll try it!"],
    }
  },

  vars: ["hobby","targetName"],
};

export default tpl;
