import ChordService from "./ChordService";
import NoteService from "./NoteService";
import Scales from "@/assets/data/Scales.js";

let scales = Scales;

function getNotesInScale(scale, rootNote) {
  const results = [];
  scale.pattern.split(",").forEach(value => {
    const result = NoteService.getNoteInScale(rootNote, value);
    if (result !== undefined) results.push(result);
  });
  return results;
}

export default {
  scales,
  getNotesInScale,
  getChordsInScale(scale, rootNote) {
    const results = [];
    const notes = this.getNotesInScale(scale, rootNote);
    // build chord triads
    for (let i = 0; i < notes.length; i++) {
      const chordNotes = [
        notes[i],
        notes[(i + 2) % notes.length],
        notes[(i + 4) % notes.length]
      ];
      results.push({
        notes: chordNotes,
        chord: ChordService.getChordFromNotes(chordNotes)
      });
    }
    return results;
  },
  findMatches(notes) {
    if (!notes || !notes.length) return [];
    const results = [];
    scales
      .slice()
      .sort((a, b) => (a.name > b.name ? 1 : -1))
      .forEach(scale =>
        NoteService.notes.forEach(function(rootNote) {
          const scaleNotes = getNotesInScale(scale, rootNote);
          if (
            notes.every(
              note =>
                scaleNotes.filter(scaleNote => scaleNote.value === note.value)
                  .length > 0
            )
          )
            results.push({
              note: rootNote,
              scale: scale,
              scaleNotes: scaleNotes.map(n => n.name).join(", ")
            });
        })
      );
    return results;
  }
};
