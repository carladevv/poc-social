import type { DialogueTemplate } from "../../types";
const tpl: DialogueTemplate = {
  id: "discuss_activity_sparring",
  kind: "discussion",
  conditions: { minRelationship: "rival", requiredActivity: ["sparring"], chanceToTrigger: 0.3, cooldownSec: 15 },
  opener: {
    personality_jock:   [{ text: "That {activity} session was intense!" }, { text: "I'm still pumped from that {activity}!" }],
    personality_cranky: [{ text: "That {activity} was a waste of time." }, { text: "My back hurts from that useless {activity}." }],
    personality_stoic:  [{ text: "The {activity} was adequate." }, { text: "Decent {activity}." }],
    personality_peppy:  [{ text: "Wasn't that {activity} the best?!" }, { text: "I loved today's {activity}!" }],
  },
  response: {
    personality_jock:   [{ text: "Yeah! We should do it again!", tone: "pos" }, { text: "I could go for another round!", tone: "pos" }],
    personality_cranky: [{ text: "Speak for yourself.", tone: "neg" }, { text: "It was mediocre at best.", tone: "neg" }],
    personality_stoic:  [{ text: "It served its purpose.", tone: "neutral" }, { text: "Acceptable.", tone: "neutral" }],
    personality_peppy:  [{ text: "It was amazing! Every day!", tone: "pos" }, { text: "So much fun! Let's go again!", tone: "pos" }],
  },
  resolution: {
    positive: {
      personality_jock:   ["Meet you by the dummies in 5."],
      personality_cranky: ["Fine. But don't cheer."],
      personality_stoic:  ["Schedule it."],
      personality_peppy:  ["I'll bring water and snacks!"],
    },
    negative: {
      personality_jock:   ["You're missing out."],
      personality_cranky: ["Finally, something we agree on."],
      personality_stoic:  ["Noted."],
      personality_peppy:  ["Aw... next time then!"],
    },
    neutral: {
      personality_jock:   ["Warm-up first."],
      personality_cranky: ["Whatever."],
      personality_stoic:  ["Proceed as planned."],
      personality_peppy:  ["I'll mark it down!"],
    }
  },
  vars: ["activity"]
};
export default tpl;
