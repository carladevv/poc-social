import type { PersonalityKey, ActivityKey, MoodKey } from "@data";
import type { SocialActionKey } from "@domain/actions/types";

export type Tone = "pos" | "neg" | "neutral";
export type LineOption = { text: string; tone?: Tone };

export type DialogueTemplate = {
  id: string;
  kind: "greeting" | "discussion" | "social_action" | "memory" | "mood";
  conditions: {
    minRelationship?: "enemy"|"rival"|"neutral"|"buddy"|"companion";
    requiredMood?: MoodKey[];
    blockedMood?: MoodKey[];
    requiredActivity?: ActivityKey[];
    trigger?: SocialActionKey;
    success?: boolean;
    chanceToTrigger?: number;
    cooldownSec?: number;
  };
  opener: Record<`personality_${PersonalityKey}`, LineOption[]>;
  response: Record<`personality_${PersonalityKey}`, LineOption[]>;
  resolution?: {
    positive: Record<`personality_${PersonalityKey}`, string[]>;
    negative: Record<`personality_${PersonalityKey}`, string[]>;
    neutral?:  Record<`personality_${PersonalityKey}`, string[]>;
  };
  vars?: string[];
};
