import type { DialogueTemplate } from "../../types";

const tpl: DialogueTemplate = {
  id: "discuss_activity_cooking",
  kind: "discussion",
  conditions: { minRelationship: "rival", requiredActivity: ["cooking"], chanceToTrigger: 0.3, cooldownSec: 15 },
  opener: {
    personality_jock:   [{ text: "That stew was protein-packed.", }, { text: "Cooking's just fuel science." }],
    personality_cranky: [{ text: "Today's {activity}? Burnt. Obviously.", }, { text: "Who salted it like that?" }],
    personality_stoic:  [{ text: "{activity} was adequate.", }, { text: "Balanced flavors." }],
    personality_peppy:  [{ text: "That {activity} session smelled amazing!", tone:"pos" }, { text: "I love chopping veggies!", tone:"pos" }],
  },
  response: {
    personality_jock:   [{ text: "More meat next time.", tone: "neutral" }, { text: "I can stir while doing squats.", tone: "pos" }],
    personality_cranky: [{ text: "Eat it or don't.", tone: "neg" }, { text: "I miss real kitchens.", tone: "neg" }],
    personality_stoic:  [{ text: "Spices were acceptable.", tone: "neutral" }, { text: "Heat control matters.", tone: "neutral" }],
    personality_peppy:  [{ text: "Let's bake bread tomorrow!", tone: "pos" }, { text: "Tea party after dinner!", tone: "pos" }],
  },
  resolution: {
    positive: {
      personality_jock:   ["I'll prep the firepit."],
      personality_cranky: ["Fine. I'll taste-test."],
      personality_stoic:  ["We will follow a recipe."],
      personality_peppy:  ["Yay! Aprons on!"],
    },
    negative: {
      personality_jock:   ["Then ration bars it is."],
      personality_cranky: ["Exactly. Skip it."],
      personality_stoic:  ["Noted."],
      personality_peppy:  ["Aw… my whisk is sad now."],
    },
    neutral: {
      personality_jock:   ["Keep it simple."],
      personality_cranky: ["Whatever."],
      personality_stoic:  ["Proceed."],
      personality_peppy:  ["We’ll try again!"],
    },
  },
  vars: ["activity"],
};

export default tpl;
