import NoteService from "./NoteService";

// Chord formulas from https://spinditty.com/learning/chord-building-for-musicians
const chords = [
  { name: "Major", abbr: "M", formula: "1 3 5" },
  { name: "Minor", abbr: "m", formula: "1 b3 5" },
  { name: "Dominant 7th", abbr: "<sup>7</sup>", formula: "1 3 5 b7" },
  { name: "Major 7th", abbr: "M<sup>7</sup>", formula: "1 3 5 7" },
  { name: "Minor 7th", abbr: "m<sup>7</sup>", formula: "1 b3 5 b7" },
  { name: "6th", abbr: "<sup>6</sup>", formula: "1 3 5 6" },
  { name: "Minor 6th", abbr: "m<sup>6</sup>", formula: "1 b3 5 6" },
  { name: "Diminished", abbr: "dim", formula: "1 b3 b5" },
  { name: "Diminished 7th", abbr: "dim<sup>7</sup>", formula: "1 b3 b5 bb7" },
  {
    name: "Half diminished 7th",
    abbr: "<sup>ø7</sup>",
    formula: "1 b3 b5 b7"
  },
  { name: "Augmented", abbr: "aug", formula: "1 3 #5" },
  { name: "7th #5", abbr: "<sup>7#5</sup>", formula: "1 3 #5 b7" },
  { name: "9th", abbr: "<sup>9</sup>", formula: "1 3 5 b7 9" },
  { name: "7th #9", abbr: "<sup>7#9</sup>", formula: "1 3 5 b7 #9" },
  { name: "Major 9th", abbr: "M<sup>9</sup>", formula: "1 3 5 7 9" },
  { name: "Added 9th", abbr: "<sup>add9</sup>", formula: "1 3 5 9" },
  { name: "Minor 9th", abbr: "m<sup>9</sup>", formula: "1 b3 5 b7 9" },
  { name: "Minor add 9th", abbr: "min<sup>add9</sup>", formula: "1 b3 5 9" },
  {
    name: "11th",
    abbr: "<sup>11</sup>",
    formula: "1 (3) 5 b7 9 11",
    notes: "3rd often omitted"
  },
  { name: "Minor 11th", abbr: "m<sup>11</sup>", formula: "1 b3 5 b7 9 11" },
  { name: "7th #11", abbr: "<sup>7#11</sup>", formula: "1 3 5 b7 #11" },
  { name: "Major 7th #11", abbr: "M<sup>7#11</sup>", formula: "1 3 5 7 9 #11" },
  {
    name: "13th",
    abbr: "<sup>13</sup>",
    formula: "1 3 5 b7 9 (11) 13",
    notes: "11th often omitted"
  },
  {
    name: "Major 13th",
    abbr: "M<sup>13</sup>",
    formula: "1 3 5 7 9 (11) 13",
    notes: "11th often omitted"
  },
  { name: "Minor 13th", abbr: "m<sup>13</sup>", formula: "1 b3 5 b7 9 11 13" },
  { name: "Suspended 4th", abbr: "sus4", formula: "1 4 5" },
  { name: "Suspended 2nd", abbr: "sus2", formula: "1 2 5" },
  { name: "Power Chord", abbr: "<sup>5</sup>", formula: "1 5" }
];

chords.forEach(
  chord => (chord.baseNotes = getNotes(NoteService.notes[0], chord))
);

function getNotes(rootNote, chord) {
  const notes = [];
  chord.formula.split(" ").forEach(e => {
    const result = getFormulaNote(rootNote, e);
    if (result) notes.push(result);
  });
  return notes;
}

function getFormulaNote(rootNote, noteDescriptor) {
  return NoteService.getNoteInScale(rootNote, noteDescriptor);
}

export default {
  chords,
  getNotes,
  getFormulaNote,
  getChordFromNotes(notes) {
    if (!notes) return null;
    // Chords have notes of A in baseNotes
    const shift = notes[0].value - NoteService.notes[0].value;
    const shiftedNotes = notes.map(n =>
      NoteService.getValidNoteValue(n.value - shift)
    );

    // Find chord that has the same number of notes, same root note and
    //   contains the same notes not necessarily in the same order
    const match = chords.find(
      chord =>
        chord.baseNotes.length === notes.length &&
        chord.baseNotes[0].value ===
          NoteService.getValidNoteValue(notes[0].value - shift) &&
        shiftedNotes.every(n => chord.baseNotes.some(bn => bn.value === n))
    );
    return match;
  }
};
