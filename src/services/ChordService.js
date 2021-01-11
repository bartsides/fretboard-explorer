import NoteService from "./NoteService";
import Chords from "@/assets/data/Chords.js";

const chords = Chords;
chords.forEach(chord => {
  chord.rootNotes = getNotes(NoteService.notes[0], chord);
});

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
    // Chords have notes of A in rootNotes
    const shift = notes[0].value - NoteService.notes[0].value;
    const shiftedNotes = notes.map(n =>
      NoteService.getValidNoteValue(n.value - shift)
    );

    // Find chord that has the same number of notes, same root note and
    //   contains the same notes not necessarily in the same order
    const match = chords.find(
      chord =>
        chord.rootNotes.length === notes.length &&
        chord.rootNotes[0].value ===
          NoteService.getValidNoteValue(notes[0].value - shift) &&
        shiftedNotes.every(n => chord.rootNotes.some(bn => bn.value === n))
    );
    return match;
  }
};
