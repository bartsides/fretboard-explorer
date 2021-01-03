const notes = [
  { name: "A", value: 1 },
  { name: "A#", alt: "Bb", value: 2 },
  { name: "B", value: 3 },
  { name: "C", value: 4 },
  { name: "C#", alt: "Db", value: 5 },
  { name: "D", value: 6 },
  { name: "D#", alt: "Eb", value: 7 },
  { name: "E", value: 8 },
  { name: "F", value: 9 },
  { name: "F#", alt: "Gb", value: 10 },
  { name: "G", value: 11 },
  { name: "G#", alt: "Ab", value: 12 }
];

function getNoteFromValue(value) {
  while (value < 1) value += notes.length;
  return notes[(value - 1) % notes.length];
}

function getNoteFromName(name) {
  let mod = 0;
  if (name.includes("b")) mod = -1;
  else if (name.includes("#")) mod = 1;

  if (mod === 0) return notes.find(n => n.name === name);
  const match = notes.find(
    n => n.name === name.replace("b", "").replace("#", "")
  );
  if (!match) return undefined;
  return getNoteFromValue(match.value + mod);
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
  getNoteInScale(baseNote, value) {
    let mod = baseNote.value;
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
