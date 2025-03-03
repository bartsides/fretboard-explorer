import { majorScaleIntervals } from "./Intervals";

export interface Note {
  name: string;
  alt?: string;
  value: number;
  octave?: number;
}

export const Notes: Note[] = [
  { name: "A", value: 10 },
  { name: "A#", alt: "Bb", value: 11 },
  { name: "B", value: 12 },
  { name: "C", value: 1 },
  { name: "C#", alt: "Db", value: 2 },
  { name: "D", value: 3 },
  { name: "D#", alt: "Eb", value: 4 },
  { name: "E", value: 5 },
  { name: "F", value: 6 },
  { name: "F#", alt: "Gb", value: 7 },
  { name: "G", value: 8 },
  { name: "G#", alt: "Ab", value: 9 },
];

export function getNoteByName(name: string, octave?: number): Note {
  let note = Notes.find((n) => n.name === name || n.alt === name);
  if (!note) throw new Error(`Couldn't find note '${name}'`);
  note = JSON.parse(JSON.stringify(note));
  if (!note) throw new Error(`Couldn't find note '${name}'`);
  note.octave = octave;
  return note;
}

export function getNoteByValue(value: number, octave?: number): Note {
  while (value < 1) value += Notes.length;
  while (value > Notes.length) value -= Notes.length;
  let note = Notes.find((n) => n.value === value);
  if (!note) throw new Error(`Couldn't find note with value ${value}`);
  note = JSON.parse(JSON.stringify(note));
  if (!note) throw new Error(`Couldn't find note with value ${value}`);
  if (octave) note.octave = octave;
  return note;
}

export function getNote(value: string | number, octave?: number): Note {
  const note =
    typeof value === "string" ? getNoteByName(value) : getNoteByValue(value);
  note.octave = octave;
  return note;
}

export function addNote(note: Note, mod: number): Note {
  let val = note.value - 1 + mod;
  let i = val % Notes.length;
  while (i < 0) i += Notes.length;
  const res = Notes[i];
  res.octave = note.octave;
  if (res.octave) {
    while (val < 0) {
      res.octave--;
      val += 12;
    }
    while (val > 11) {
      res.octave++;
      val -= 12;
    }
  }
  return res;
}

export function getValidNoteValue(value: number): number {
  while (value < 1) value += Notes.length;
  return value % Notes.length;
}

export function notationEquals(a: string, b: string): boolean {
  return getNotationValue(a) === getNotationValue(b);
}

export function getNotationValue(notation: string): number {
  let mod = 0;
  if (notation.includes("b")) mod -= 1;
  if (notation.includes("#")) mod += 1;
  let value =
    majorScaleIntervals[Number(notation.replace("b", "").replace("#", ""))];
  return value + mod;
}
