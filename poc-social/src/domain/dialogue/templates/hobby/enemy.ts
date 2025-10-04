import type { DialogueTemplate } from "../../types";

const tpl: DialogueTemplate = {
  id: "hobby_enemy",
  kind: "hobby",
  conditions: { minRelationship: "enemy", cooldownSec: 10 },
  opener: {
    personality_jock: [
      { text: "I spent all night {hobby}. You wouldn't get it." },
      { text: "{hobby} clears my head. Not that you'd know." },
    ],
    personality_cranky: [
      { text: "{hobby}. Alone. Prefer it that way." },
      { text: "Stayed up {hobby}. Don't ask." },
    ],
    personality_stoic: [
      { text: "{hobby}. Efficient solitude." },
      { text: "Time was spent {hobby}." },
    ],
    personality_peppy: [
      { text: "Stayed up {hobby}. Try not to ruin it." },
      { text: "{hobby} binge. I needed it." },
    ],
  },

  // Affinity-aware replies
  responseByAffinity: {
    liked: {
      personality_jock: [
        { text: "You think I don't get it? I {hobby} harder than you.", tone: "pos" },
        { text: "Weird—we actually agree on something.", tone: "pos" },
      ],
      personality_cranky: [
        { text: "Congrats. We share one decent habit.", tone: "pos" },
        { text: "Fine. I like {hobby} too.", tone: "pos" },
      ],
      personality_stoic: [
        { text: "Shared preference noted.", tone: "pos" },
        { text: "On this, we align.", tone: "pos" },
      ],
      personality_peppy: [
        { text: "Wait—you {hobby} too? …Gross, but same.", tone: "pos" },
        { text: "I can't believe it—me too.", tone: "pos" },
      ],
    },
    neutral: {
      personality_jock: [
        { text: "If that keeps you out of my way.", tone: "neutral" },
        { text: "Do whatever.", tone: "neutral" },
      ],
      personality_cranky: [
        { text: "Thrilling.", tone: "neutral" },
        { text: "Good for you. I guess.", tone: "neutral" },
      ],
      personality_stoic: [
        { text: "Acknowledged.", tone: "neutral" },
        { text: "Very well.", tone: "neutral" },
      ],
      personality_peppy: [
        { text: "Okay. Not my problem.", tone: "neutral" },
        { text: "Sure. Moving on.", tone: "neutral" },
      ],
    },
    disliked: {
      personality_jock: [
        { text: "Only a rookie wastes time {hobby}.", tone: "neg" },
        { text: "That explains a lot.", tone: "neg" },
      ],
      personality_cranky: [
        { text: "Only a simpleton likes {hobby}.", tone: "neg" },
        { text: "What a slog. Spare me.", tone: "neg" },
      ],
      personality_stoic: [
        { text: "{hobby} is inefficient.", tone: "neg" },
        { text: "Unproductive.", tone: "neg" },
      ],
      personality_peppy: [
        { text: "Ugh—{hobby}? Hard no.", tone: "neg" },
        { text: "I can't stand that.", tone: "neg" },
      ],
    },
  },

  resolution: {
    positive: {
      personality_jock:   ["Huh. Who would've thought.", "Alright—respect."],
      personality_cranky: ["Tsk. One point for you."],
      personality_stoic:  ["Convergence recorded."],
      personality_peppy:  ["Fine. You're not hopeless."],
    },
    negative: {
      personality_jock:   ["I don't know why I bothered telling you.", "Walk away."],
      personality_cranky: ["Predictable.", "Done talking."],
      personality_stoic:  ["This topic ends.", "Noted."],
      personality_peppy:  ["Wow. Mood killer.", "Okay—bye."],
    },
    neutral: {
      personality_jock:   ["Back to duty."],
      personality_cranky: ["Whatever."],
      personality_stoic:  ["Proceed."],
      personality_peppy:  ["Next subject."],
    },
  },

  vars: ["hobby", "targetName"],
};

export default tpl;
