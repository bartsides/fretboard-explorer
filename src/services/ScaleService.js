import ChordService from "./ChordService";
import NoteService from "./NoteService";

let scales = [
  { name: "Major / Ionian", pattern: "1,2,3,4,5,6,7" },
  { name: "Minor / Aeolian", pattern: "1,2,b3,4,5,b6,b7" },
  { name: "Dorian", pattern: "1,2,b3,4,5,6,b7" },
  { name: "Phrygian", pattern: "1,b2,b3,4,5,b6,b7" },
  { name: "Lydian", pattern: "1,2,3,#4,5,6,7" },
  { name: "Mixolydian", pattern: "1,2,3,4,5,6,b7" },
  { name: "Locrian", pattern: "1,b2,b3,4,b5,b6,b7" },
  { name: "Harmonic Minor", pattern: "1,2,b3,4,5,b6,7" },
  { name: "Melodic Minor (Ascending)", pattern: "1,2,b3,4,5,6,7" },
  { name: "Melodic Minor (Descending)", pattern: "1,2,b3,4,5,b6,b7" },
  { name: "Chromatic", pattern: "1,b2,2,b3,3,4,b5,5,#5,6,b7,7" },
  { name: "Whole Tone", pattern: "1,2,3,#4,#5,b7" },
  { name: "Pentatonic Major", pattern: "1,2,3,5,6" },
  { name: "Pentatonic Minor", pattern: "1,b3,4,5,b7" },
  { name: "Pentatonic Blues", pattern: "1,b3,4,b5,5,b7" },
  { name: "Pentatonic Neutral", pattern: "1,2,4,5,b7" },
  { name: "Octatonic (H-W)", pattern: "1,b2,b3,3,b5,5,6,b7" },
  { name: "Octatonic (W-H)", pattern: "1,2,b3,4,b5,b6,6,7" },
  { name: "Lydian Augmented", pattern: "1,2,3,#4,#5,6,7" },
  { name: "Lydian Minor", pattern: "1,2,3,#4,5,b6,b7" },
  { name: "Lydian Diminished", pattern: "1,2,b3,#4,5,6,7" }
];

export default {
  scales,
  getNotesInScale(scale, baseNote) {
    const results = [];
    scale.pattern.split(",").forEach(value => {
      const result = NoteService.getNoteInScale(baseNote, value);
      if (result !== undefined) results.push(result);
    });
    return results;
  },
  getChordsInScale(scale, baseNote) {
    const results = [];
    const notes = this.getNotesInScale(scale, baseNote);
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
  }
};
