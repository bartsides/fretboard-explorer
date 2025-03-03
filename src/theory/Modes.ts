export interface Mode {
  name: string;
  altName?: string;
  pattern: string;
}

export const Modes: Mode[] = [
  { name: "Ionian", altName: "Ionian / Major", pattern: "1,2,3,4,5,6,7" },
  { name: "Dorian", pattern: "1,2,b3,4,5,6,b7" },
  { name: "Phrygian", pattern: "1,b2,b3,4,5,b6,b7" },
  { name: "Lydian", pattern: "1,2,3,#4,5,6,7" },
  { name: "Mixolydian", pattern: "1,2,3,4,5,6,b7" },
  { name: "Aeolian", altName: "Aeolian / Minor", pattern: "1,2,b3,4,5,b6,b7" },
  { name: "Locrian", pattern: "1,b2,b3,4,b5,b6,b7" },
];
