import type { DialogueTemplate } from "../../types";

const tpl: DialogueTemplate = {
  id: "hobby_neutral",
  kind: "hobby",
  conditions: { minRelationship: "neutral", cooldownSec: 10 },
  opener: {
    personality_jock: [
      { text: "Spent time {hobby} this morning. Good reset." },
      { text: "{hobby} before drills. Helps focus." },
    ],
    personality_cranky: [
      { text: "I was {hobby}. It was fine." },
      { text: "{hobby}. Don't make it a big deal." },
    ],
    personality_stoic: [
      { text: "I practiced {hobby}." },
      { text: "{hobby}. Sufficient." },
    ],
    personality_peppy: [
      { text: "I got lost {hobby} and it was bliss!" },
      { text: "Guess what—{hobby} time! So good!" },
    ],
  },

  responseByAffinity: {
    liked: {
      personality_jock: [
        { text: "Nice. I’m into {hobby} too.", tone: "pos" },
        { text: "Respect. It helps me focus as well.", tone: "pos" },
      ],
      personality_cranky: [
        { text: "Huh. Same.", tone: "pos" },
        { text: "I won't admit it twice, but… yes.", tone: "pos" },
      ],
      personality_stoic: [
        { text: "We share this practice.", tone: "pos" },
        { text: "Alignment observed.", tone: "pos" },
      ],
      personality_peppy: [
        { text: "No way—me too!", tone: "pos" },
        { text: "We should do it together!", tone: "pos" },
      ],
    },
    neutral: {
      personality_jock: [
        { text: "Solid habit.", tone: "neutral" },
        { text: "Whatever helps.", tone: "neutral" },
      ],
      personality_cranky: [
        { text: "Uh-huh.", tone: "neutral" },
        { text: "Sure.", tone: "neutral" },
      ],
      personality_stoic: [
        { text: "Reasonable.", tone: "neutral" },
        { text: "Understood.", tone: "neutral" },
      ],
      personality_peppy: [
        { text: "Neat!", tone: "neutral" },
        { text: "Okay!", tone: "neutral" },
      ],
    },
    disliked: {
      personality_jock: [
        { text: "Does nothing for me.", tone: "neg" },
        { text: "I skip {hobby}.", tone: "neg" },
      ],
        personality_cranky: [
        { text: "Spare me.", tone: "neg" },
        { text: "Boring.", tone: "neg" },
      ],
      personality_stoic: [
        { text: "I find {hobby} inefficient.", tone: "neg" },
        { text: "Not preferable.", tone: "neg" },
      ],
      personality_peppy: [
        { text: "Ehh… not my thing.", tone: "neg" },
        { text: "Hard pass for me.", tone: "neg" },
      ],
    },
  },

  resolution: {
    positive: {
      personality_jock:   ["Keep the rhythm.", "Nice."],
      personality_cranky: ["Fine. Whatever works."],
      personality_stoic:  ["Maintain consistency."],
      personality_peppy:  ["Let's plan a session!"],
    },
    negative: {
      personality_jock:   ["Do what you want."],
      personality_cranky: ["Spare me the details."],
      personality_stoic:  ["Noted."],
      personality_peppy:  ["Okay… your call."],
    },
    neutral: {
      personality_jock:   ["Back to work."],
      personality_cranky: ["Mm."],
      personality_stoic:  ["Proceed."],
      personality_peppy:  ["What’s next?"],
    },
  },

  vars: ["hobby", "targetName"],
};

export default tpl;
