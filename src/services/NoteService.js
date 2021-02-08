import Notes from "@/assets/data/Notes.js";

const notes = Notes;

function getNoteFromValue(value) {
  while (value < 1) value += notes.length;
  while (value > notes.length) value -= notes.length;
  const note = notes.find(n => n.value === value);
  return note;
}

function getNoteFromName(name) {
  let mod = 0;
  if (name.includes("b")) mod = -1;
  else if (name.includes("#")) mod = 1;

  const octave = parseInt(name.replace(/^\D+/g, ""));
  // strip octave number
  name = name
    .replace(/[0-9]/g, "")
    .replace("b", "")
    .replace("#", "");

  let note = notes.find(n => n.name === name);
  if (!note) return undefined;
  if (mod) note = getNoteFromValue(note.value + mod);
  note.octave = octave;
  return note;
}

export default {
  notes,
  getNote(value) {
    return JSON.parse(
      JSON.stringify(
        typeof value == "number"
          ? getNoteFromValue(value)
          : getNoteFromName(value)
      )
    );
  },
  getNoteWithMod(rootNote, mod) {
    // only supports positive mod
    if (!rootNote) return;
    if (mod === 0) return rootNote;
    const note = this.getNote(rootNote.value + mod);
    const notes = this.notes.length;
    let octave = rootNote.octave;
    if (
      octave !== undefined &&
      octave !== null &&
      mod > notes - rootNote.value
    ) {
      octave++;
      mod -= notes - rootNote.value;
      if (mod > notes) octave += Math.floor(mod / notes);
    }
    note.octave = octave;
    return note;
  },
  getNoteInScale(rootNote, value) {
    let mod = rootNote.value;
    const omitted = value.includes("(");
    const flat = value.includes("b");
    if (flat) mod -= value.match(/b/g).length;
    if (value.includes("#")) mod += value.match(/#/g).length;

    value = parseInt(
      value
        .replace(/b/g, "")
        .replace(/#/g, "")
        .replace("(", "")
        .replace(")", "")
    );
    while (value >= 8) value -= 7;

    // Skip first note
    if (value === 2) mod += 2;
    else if (value === 3) mod += 4;
    else if (value === 4) mod += 5;
    else if (value === 5) mod += 7;
    else if (value === 6) mod += 9;
    else if (value === 7) mod += 11;

    const result = this.getNote(mod);
    if (flat && result.alt) result.name = result.alt;
    if (omitted) result.name = `(${result.name})`;
    return result;
  },
  getValidNoteValue(value) {
    while (value < 1) value += notes.length;
    return value % notes.length;
  }
};
