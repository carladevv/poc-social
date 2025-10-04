import type { DialogueTemplate } from "../../types";

const tpl: DialogueTemplate = {
  id: "discuss_activity_guard_duty",
  kind: "discussion",
  conditions: { minRelationship: "rival", requiredActivity: ["guard_duty"], chanceToTrigger: 0.3, cooldownSec: 15 },
  opener: {
    personality_jock:   [{ text: "Long {activity}, but I stayed sharp." }, { text: "Kept pace on the wall." }],
    personality_cranky: [{ text: "{activity}? Boring and cold." }, { text: "Nothing but creaking wood." }],
    personality_stoic:  [{ text: "{activity} was quiet." }, { text: "Perimeter held." }],
    personality_peppy:  [{ text: "{activity} with good company flies by!", tone:"pos" }, { text: "I waved at every passerby!", tone:"pos" }],
  },
  response: {
    personality_jock:   [{ text: "We can rotate next time.", tone: "pos" }, { text: "I like the discipline.", tone: "pos" }],
    personality_cranky: [{ text: "Swap with me next round.", tone: "neg" }, { text: "I want a real assignment.", tone: "neg" }],
    personality_stoic:  [{ text: "Routine is essential.", tone: "neutral" }, { text: "Vigilance prevents trouble.", tone: "neutral" }],
    personality_peppy:  [{ text: "We should bring snacks!", tone: "pos" }, { text: "Let's name the torches!", tone: "pos" }],
  },
  resolution: {
    positive: {
      personality_jock:   ["I'll take first watch."],
      personality_cranky: ["Fine. You owe me."],
      personality_stoic:  ["Schedule posted."],
      personality_peppy:  ["Guard buddies forever!"],
    },
    negative: {
      personality_jock:   ["Then keep your gripes to yourself."],
      personality_cranky: ["Exactly my point."],
      personality_stoic:  ["Noted."],
      personality_peppy:  ["Aww… okay, next time."],
    },
    neutral: {
      personality_jock:   ["Stretch between rounds."],
      personality_cranky: ["Whatever."],
      personality_stoic:  ["Proceed."],
      personality_peppy:  ["I'll bring lantern charms!"],
    }
  },
  vars: ["activity"],
};

export default tpl;
