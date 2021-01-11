import NoteService from "./NoteService";
import Tunings from "@/assets/data/Tunings.js";

const tunings = Tunings;
tunings.forEach(tuning => {
  tuning.notes = tuning.pattern.split(",").map(n => NoteService.getNote(n));
});

export default {
  tunings
};
