import type { DialogueTemplate } from "../../types";

const tpl: DialogueTemplate = {
  id: "hobby_companion",
  kind: "hobby",
  conditions: { minRelationship: "companion", cooldownSec: 6 },
  opener: {
    personality_jock: [
      { text: "Stayed up {hobby}. Thought of you." },
      { text: "{hobby} calmed me. Join me next time?" },
    ],
    personality_cranky: [
      { text: "{hobby}. It… helped. Don't get mushy.", },
      { text: "I tried {hobby} because of you.", },
    ],
    personality_stoic: [
      { text: "{hobby}. It was… pleasant." },
      { text: "I appreciated {hobby} last night." },
    ],
    personality_peppy: [
      { text: "Spent the whole evening {hobby} and smiling the *entire* time!" },
      { text: "I love {hobby}—especially with you." },
    ],
  },

  responseByAffinity: {
    liked: {
      personality_jock: [
        { text: "Same here. With you, even better.", tone: "pos" },
        { text: "Count me in—always.", tone: "pos" },
      ],
      personality_cranky: [
        { text: "…Fine. I like it. With you.", tone: "pos" },
        { text: "Don't make me repeat it, but yes.", tone: "pos" },
      ],
      personality_stoic: [
        { text: "Likewise.", tone: "pos" },
        { text: "We will continue together.", tone: "pos" },
      ],
      personality_peppy: [
        { text: "My heart is cartwheeling!", tone: "pos" },
        { text: "Yes, please, forever!", tone: "pos" },
      ],
    },
    neutral: {
      personality_jock: [
        { text: "If it helps you, I'm in.", tone: "neutral" },
        { text: "We can make it our thing.", tone: "neutral" },
      ],
      personality_cranky: [
        { text: "I can tolerate it. For you.", tone: "neutral" },
        { text: "Fine. We'll try it your way.", tone: "neutral" },
      ],
      personality_stoic: [
        { text: "Acceptable.", tone: "neutral" },
        { text: "I will accompany you.", tone: "neutral" },
      ],
      personality_peppy: [
        { text: "I'll give it a go!", tone: "neutral" },
        { text: "We can experiment!", tone: "neutral" },
      ],
    },
    disliked: {
      personality_jock: [
        { text: "Not my usual lane—but for you, maybe.", tone: "neg" },
        { text: "I’ll cheer you instead.", tone: "neg" },
      ],
      personality_cranky: [
        { text: "I hate it. But… fine. Sometimes.", tone: "neg" },
        { text: "Don't push it.", tone: "neg" },
      ],
      personality_stoic: [
        { text: "I do not prefer it. I will observe.", tone: "neg" },
        { text: "We can alternate activities.", tone: "neg" },
      ],
      personality_peppy: [
        { text: "Ehhh… not my fave, but I'll sit with you.", tone: "neg" },
        { text: "I'll bring snacks while you {hobby}!", tone: "neg" },
      ],
    },
  },

  resolution: {
    positive: {
      personality_jock:   ["Let's set a time.", "Run with me after."],
      personality_cranky: ["Don't be late.", "…I brought tea."],
      personality_stoic:  ["I will prepare materials.", "We will make it a ritual."],
      personality_peppy:  ["Tea and stars later!", "Picnic plus {hobby}!"],
    },
    negative: {
      personality_jock:   ["All good.", "We’ll pick a better overlap."],
      personality_cranky: ["Hmph.", "Another time."],
      personality_stoic:  ["Noted.", "We will adapt."],
      personality_peppy:  ["Another time!", "I'll plan something you like!"],
    },
    neutral: {
      personality_jock:   ["Hydrate first.", "Light jog after."],
      personality_cranky: ["Fine.", "Okay."],
      personality_stoic:  ["Proceed.", "On schedule."],
      personality_peppy:  ["I'll bring a blanket!", "We got this!"],
    },
  },

  vars: ["hobby", "targetName"],
};

export default tpl;
