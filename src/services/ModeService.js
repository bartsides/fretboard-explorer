import ScaleService from "./ScaleService";
import Modes from "@/assets/data/Modes.js";

const modes = Modes;

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
