import NoteService from "./NoteService";

function getTuning(name, notes) {
  return {
    name: name,
    pattern: notes,
    notes: notes.split(",").map(n => NoteService.getNote(n))
  };
}

let tunings = [
  getTuning("Standard", "E,A,D,G,B,E"),
  getTuning("Drop D", "D,A,D,G,B,E"),
  getTuning("7 String", "B,E,A,D,G,B,E"),
  getTuning("8 String", "F#,B,E,A,D,G,B,E"),
  getTuning("Bass", "E,A,D,G"),
  getTuning("Single", "F#")
];

export default {
  tunings
};
