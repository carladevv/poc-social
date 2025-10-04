export const personalities = {
  jock:   { name: "Jock",   description: "Energetic, competitive, and constantly talks about training." },
  cranky: { name: "Cranky", description: "Grumpy, blunt, and quick to complain." },
  stoic:  { name: "Stoic",  description: "Quiet, observant, and speaks in short sentences." },
  peppy:  { name: "Peppy",  description: "Enthusiastic, talkative, and easily excited." },
} as const;

export type PersonalityKey = keyof typeof personalities;
