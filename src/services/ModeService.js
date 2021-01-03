import ScaleService from "./ScaleService";

const modes = [
  { name: "Ionian", pattern: "1,2,3,4,5,6,7" },
  { name: "Dorian", pattern: "1,2,b3,4,5,6,b7" },
  { name: "Phrygian", pattern: "1,b2,b3,4,5,b6,b7" },
  { name: "Lydian", pattern: "1,2,3,#4,5,6,7" },
  { name: "Mixolydian", pattern: "1,2,3,4,5,6,b7" },
  { name: "Aeolian", pattern: "1,2,b3,4,5,b6,b7" },
  { name: "Locrian", pattern: "1,b2,b3,4,b5,b6,b7" }
];

export default {
  modes,
  getRelativeModes(scale, note) {
    // Returns relative modes for major or minor scales
    const results = [];
    const notes = ScaleService.getNotesInScale(scale, note);
    const offset = modes.indexOf(scale);
    for (let i = 0; i < notes.length; i++) {
      results.push({
        note: notes[i],
        scale: modes[(i + offset) % modes.length]
      });
    }

    return results;
  }
};
