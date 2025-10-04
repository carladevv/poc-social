import type { DialogueTemplate } from "../../types";

const tpl: DialogueTemplate = {
  id: "hobby_buddy",
  kind: "hobby",
  conditions: { minRelationship: "buddy", cooldownSec: 8 },
  opener: {
    personality_jock: [
      { text: "I was {hobby}. Want in next time?" },
      { text: "{hobby} session went great—could use your eye." },
    ],
    personality_cranky: [
      { text: "{hobby}. Don't tell anyone I liked it." },
      { text: "I ended up {hobby}. It helped." },
    ],
    personality_stoic: [
      { text: "I practiced {hobby}. You may join." },
      { text: "{hobby}. It was productive." },
    ],
    personality_peppy: [
      { text: "I had the *best* time {hobby}! Come with me next time?" },
      { text: "Guess who's obsessed with {hobby}? Me!" },
    ],
  },

  responseByAffinity: {
    liked: {
      personality_jock: [
        { text: "Heck yes. I love {hobby}.", tone: "pos" },
        { text: "I'm in—let's push each other.", tone: "pos" },
      ],
      personality_cranky: [
        { text: "…Fine. I like it too.", tone: "pos" },
        { text: "Keep it low-key and I'm there.", tone: "pos" },
      ],
      personality_stoic: [
        { text: "Agreed. Shared practice is beneficial.", tone: "pos" },
        { text: "We can coordinate.", tone: "pos" },
      ],
      personality_peppy: [
        { text: "Eeee—same!!", tone: "pos" },
        { text: "Best idea ever!", tone: "pos" },
      ],
    },
    neutral: {
      personality_jock: [
        { text: "Could be good training.", tone: "neutral" },
        { text: "Sure, why not.", tone: "neutral" },
      ],
      personality_cranky: [
        { text: "Might be tolerable.", tone: "neutral" },
        { text: "Don't make it cheesy.", tone: "neutral" },
      ],
      personality_stoic: [
        { text: "Acceptable.", tone: "neutral" },
        { text: "Very well.", tone: "neutral" },
      ],
      personality_peppy: [
        { text: "I'll try it!", tone: "neutral" },
        { text: "We can test it out.", tone: "neutral" },
      ],
    },
    disliked: {
      personality_jock: [
        { text: "I'd rather skip {hobby}.", tone: "neg" },
        { text: "Not my groove.", tone: "neg" },
      ],
      personality_cranky: [
        { text: "Pass.", tone: "neg" },
        { text: "No thanks. Pick something else.", tone: "neg" },
      ],
      personality_stoic: [
        { text: "I do not prefer {hobby}.", tone: "neg" },
        { text: "I will observe instead.", tone: "neg" },
      ],
      personality_peppy: [
        { text: "Aww, that's not my thing.", tone: "neg" },
        { text: "Maybe I'll cheer you on!", tone: "neg" },
      ],
    },
  },

  resolution: {
    positive: {
      personality_jock:   ["Tomorrow at dawn.", "Bring chalk and bands."],
      personality_cranky: ["Don't be late.", "Keep it quiet."],
      personality_stoic:  ["I will prepare.", "I will schedule it."],
      personality_peppy:  ["It's a date!", "Snacks on me!"],
    },
    negative: {
      personality_jock:   ["Another time, then.", "We can swap activities."],
      personality_cranky: ["Your loss.", "Pick better next time."],
      personality_stoic:  ["Noted.", "We will revisit."],
      personality_peppy:  ["Aww—next time!", "I'll find an overlap!"],
    },
    neutral: {
      personality_jock:   ["Stretch first.", "Hydrate up."],
      personality_cranky: ["Fine.", "Sure."],
      personality_stoic:  ["Proceed.", "On schedule."],
      personality_peppy:  ["I'll plan it!", "Let's pencil it in!"],
    },
  },

  vars: ["hobby", "targetName"],
};

export default tpl;
