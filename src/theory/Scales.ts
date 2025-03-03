import { Chord, getChordFromNotes } from "./Chords";
import data from "./data/scalesData";
import { majorScaleIntervals } from "./Intervals";
import { getNote, Note } from "./Notes";

export interface Scale {
  name: string;
  pattern: string;
}

export const Scales: Scale[] = data.map((d) => ({ name: d[0], pattern: d[1] }));

export function getNoteInScale(rootNote: Note, value: string): Note {
  let mod = rootNote.value;
  const omitted = value.includes("(");
  const flat = value.includes("b");
  if (flat) mod -= value.match(/b/g)!.length;
  if (value.includes("#")) mod += value.match(/#/g)!.length;

  let i = parseInt(
    value.replace(/b/g, "").replace(/#/g, "").replace("(", "").replace(")", "")
  );
  mod += majorScaleIntervals[(i - 1) % majorScaleIntervals.length];

  const result = getNote(mod);
  if (flat && result.alt) result.name = result.alt;
  if (omitted) result.name = `(${result.name})`;
  return result;
}

export function getNotesInScale(scale: Scale, rootNote: Note): Note[] {
  const res: Note[] = [];
  scale.pattern.split(",").forEach((value) => {
    const result = getNoteInScale(rootNote, value);
    if (result) res.push(result);
  });
  return res;
}

export function getChordsInScale(scale: Scale, rootNote: Note): Chord[] {
  const chords: Chord[] = [];
  const notes = getNotesInScale(scale, rootNote);
  // build chord triads
  for (let i = 0; i < notes.length; i++) {
    const chordNotes = [
      notes[i],
      notes[(i + 2) % notes.length],
      notes[(i + 4) % notes.length],
    ];
    const chord = getChordFromNotes(chordNotes);
    if (chord) chords.push(chord);
  }

  return chords;
}
