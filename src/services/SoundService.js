import * as Tone from "tone";

let volume = -24;
let vol = new Tone.Volume(volume).toDestination();
const synth = new Tone.PolySynth().connect(vol);
let bpm = 120;
const wholeNote = bpm / 60;
const quarterNote = wholeNote / 4;

export default {
  setVolume(value) {
    volume = value;
    synth.disconnect(vol);
    vol.dispose();
    vol = new Tone.Volume(volume).toDestination();
    synth.connect(vol);
  },
  strum(notes) {
    synth.releaseAll();
    if (!notes || !notes.length) return;
    const synthNotes = [];
    notes.forEach(note => synthNotes.push(`${note.name}${note.octave}`));
    synth.triggerAttackRelease(synthNotes, "2n");
  },
  pluck(notes) {
    synth.releaseAll();
    let now = Tone.now();
    if (!notes || !notes.length) return;
    const synthNotes = [];
    notes.forEach(note => synthNotes.push(`${note.name}${note.octave}`));
    for (let i = 0; i < notes.length; i++) {
      synth.triggerAttack(synthNotes[i], now + i * quarterNote);
    }
    synth.triggerRelease(
      synthNotes,
      now + synthNotes.length * quarterNote + quarterNote
    );
  },
  pluckAndStrum(notes) {
    synth.releaseAll();
    let now = Tone.now();
    if (!notes || !notes.length) return;
    const synthNotes = [];
    notes.forEach(note => synthNotes.push(`${note.name}${note.octave}`));
    for (let i = 0; i < notes.length; i++) {
      synth.triggerAttack(synthNotes[i], now + i * quarterNote);
    }
    synth.triggerRelease(synthNotes, now + synthNotes.length * quarterNote);
    synth.triggerAttackRelease(
      synthNotes,
      "4n",
      now + synthNotes.length * quarterNote + quarterNote
    );
  }
};
