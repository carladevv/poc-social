import type { DialogueTemplate } from "../../../types";
const tpl: DialogueTemplate = {
  id: "gift_reaction_success",
  kind: "social_action",
  conditions: { trigger: "give_gift", success: true, cooldownSec: 10 },
  opener: {
    personality_jock:   [{ text: "Whoa, thanks for the {gift}!" }, { text: "This {gift} is perfect! Thanks!" }],
    personality_cranky: [{ text: "Hmph. I suppose this {gift} is... acceptable." }, { text: "Didn't expect this. Thanks." }],
    personality_stoic:  [{ text: "Thank you for the {gift}." }, { text: "I appreciate this." }],
    personality_peppy:  [{ text: "Oh my gods! I love this {gift}! Thank you!!!" }, { text: "This {gift} is the best! You're amazing!" }],
  },
  response: {
    personality_jock:   [{ text: "No problem! Thought you'd like it!", tone: "pos" }, { text: "Knew you needed one of those!", tone: "pos" }],
    personality_cranky: [{ text: "Don't get used to it.", tone: "neutral" }, { text: "Yeah, yeah. You're welcome.", tone: "neutral" }],
    personality_stoic:  [{ text: "You're welcome.", tone: "neutral" }, { text: "It was nothing.", tone: "neutral" }],
    personality_peppy:  [{ text: "Anything for you!", tone: "pos" }, { text: "I'm just so happy you like it!", tone: "pos" }],
  },
  resolution: {
    positive: {
      personality_jock:   ["Use it well."],
      personality_cranky: ["Try not to make me regret it."],
      personality_stoic:  ["It will be useful."],
      personality_peppy:  ["Let's celebrate later!"],
    },
    negative: { personality_jock: [""], personality_cranky: [""], personality_stoic: [""], personality_peppy: [""] },
    neutral:  { personality_jock: [""], personality_cranky: [""], personality_stoic: [""], personality_peppy: [""] }
  },
  vars: ["gift","targetName"]
};
export default tpl;
