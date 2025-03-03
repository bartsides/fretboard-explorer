import { Note, getNote as n } from "./Notes";

export interface Tuning {
  name: string;
  notes: Note[];
}

export const Tunings: Tuning[] = [
  {
    name: "Standard",
    notes: [n("E", 2), n("A", 2), n("D", 3), n("G", 3), n("B", 3), n("E", 4)],
  },
  {
    name: "Drop D",
    notes: [n("D", 2), n("A", 2), n("D", 3), n("G", 3), n("B", 3), n("E", 4)],
  },
  {
    name: "7 String",
    notes: [
      n("B", 1),
      n("E", 2),
      n("A", 2),
      n("D", 3),
      n("G", 3),
      n("B", 3),
      n("E", 4),
    ],
  },
  {
    name: "8 String",
    notes: [
      n("F#", 1),
      n("B", 1),
      n("E", 2),
      n("A", 2),
      n("D", 3),
      n("G", 3),
      n("B", 3),
      n("E", 4),
    ],
  },
  {
    name: "Bass",
    notes: [n("E", 1), n("A", 1), n("D", 2), n("G", 2)],
  },
];
