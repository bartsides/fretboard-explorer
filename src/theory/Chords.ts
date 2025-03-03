import data from "./data/chordsData";
import { intervals } from "./Intervals";
import { notationEquals, Note, Notes } from "./Notes";
import { getNoteInScale } from "./Scales";

export interface ChordDef {
  name: string;
  abbr: string;
  formula: string;
  description?: string;
  diagrams: ChordDiagram[];
  notes?: Note[];
}

export interface Chord {
  name: string;
  abbr: string;
  formula: string;
  description?: string;
  diagrams: ChordDiagram[];
  notes: Note[];
}

export interface ChordDiagram {
  string?: number;
  width?: number;
  startMod?: number;
  hide?: number[][];
}

const chords: Chord[] = data.map((c) => {
  return { ...c, notes: getNotes(Notes[0], c) };
});

function getNotes(root: Note, chord: ChordDef): Note[] {
  const notes: Note[] = [];
  chord.formula.split(" ").forEach((e) => {
    const result = getNoteInScale(root, e);
    if (result) notes.push(result);
  });
  return notes;
}

export function getChordFromNotes(notes: Note[]): Chord | undefined {
  if (!notes?.length) return;
  const formula = getChordFormulaFromNotes(notes);
  let match = data.find((chord) => formulasAreEqual(formula, chord.formula));
  if (!match) return undefined;
  match = JSON.parse(JSON.stringify(match));
  if (!match) return undefined;
  return { ...match, notes: JSON.parse(JSON.stringify(notes)) };
}

export function formulasAreEqual(formula1: string, formula2: string): boolean {
  const parts1 = formula1.split(" ");
  const parts2 = formula2.split(" ");
  if (!parts1.length || parts1.length !== parts2.length) return false;
  for (let i = 0; i < parts1.length; i++) {
    if (!notationEquals(parts1[i], parts2[i])) return false;
  }
  return true;
}

export function getChordFormulaFromNotes(notes: Note[]): string {
  const parts = ["1"];
  const root = notes[0].value;

  for (let i = 1; i < notes.length; i++) {
    let interval = notes[i].value - root;
    if (interval < 0) interval += intervals.length;
    parts.push(intervals[interval]);
  }

  return parts.join(" ");
}
