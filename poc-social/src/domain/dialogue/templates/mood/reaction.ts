import type { DialogueTemplate } from "../../types";
const tpl: DialogueTemplate = {
  id: "mood_reaction",
  kind: "mood",
  conditions: { requiredMood: ["stressed","grieving","injured"], minRelationship: "buddy", cooldownSec: 20 },
  opener: {
    personality_jock:   [{ text: "You look rough. Want to spar to take your mind off things?" }, { text: "Hey, you okay? You seem off." }],
    personality_cranky: [{ text: "You look terrible. What's wrong with you?" }, { text: "Stop moping. It's annoying." }],
    personality_stoic:  [{ text: "You seem troubled." }, { text: "I see your distress." }],
    personality_peppy:  [{ text: "Oh no! You look so sad! Want to talk about it?" }, { text: "Hey, what's wrong? You can tell me anything!" }],
  },
  response: {
    personality_jock:   [{ text: "I'll be fine. Just need to push through.", tone: "neutral" }, { text: "Thanks for noticing. I'll manage.", tone: "pos" }],
    personality_cranky: [{ text: "Nothing a good complaint won't fix.", tone: "neutral" }, { text: "Leave me alone.", tone: "neg" }],
    personality_stoic:  [{ text: "I will endure.", tone: "neutral" }, { text: "It will pass.", tone: "neutral" }],
    personality_peppy:  [{ text: "Thanks for caring! I just need some cheer!", tone: "pos" }, { text: "You're so sweet for asking! I'll be okay!", tone: "pos" }],
  },
  resolution: {
    positive: {
      personality_jock:   ["Come on—walk with me."],
      personality_cranky: ["...Fine. Sit."],
      personality_stoic:  ["Breathe."],
      personality_peppy:  ["Group hug later!"],
    },
    negative: {
      personality_jock:   ["Alright. Space it is."],
      personality_cranky: ["Good. Quiet."],
      personality_stoic:  ["As you wish."],
      personality_peppy:  ["I'll be nearby if you need me!"],
    },
    neutral: {
      personality_jock:   ["Hydrate and stretch."],
      personality_cranky: ["Tch."],
      personality_stoic:  ["Understood."],
      personality_peppy:  ["I'll check back soon!"],
    }
  },
  vars: ["targetName"]
};
export default tpl;
