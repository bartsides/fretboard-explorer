<script setup lang="ts">
import { NSelect } from "naive-ui";
import { onMounted, ref, watch } from "vue";
import SongChord from "../components/SongChord.vue";
import { getOption } from "../services/HelperService";
import { Chord } from "../theory/Chords";
import { Note, Notes } from "../theory/Notes";
import { getChordsInScale, Scale, Scales } from "../theory/Scales";

const root = ref<Note>(Notes[0]);
const scale = ref<Scale>(Scales[0]);

function getChords(scale: Scale, root: Note): Chord[] {
  return getChordsInScale(scale, root);
}

const chords = ref<Chord[]>(getChords(scale.value, root.value));
const songLength = ref<number>(4);
const songChords = ref<number[]>([]);
const scaleOptions = ref(Scales.map((s) => getOption(s.name)));
const noteOptions = ref(Notes.map((n) => getOption(n.name)));
const songLengthOptions = ref(
  [2, 3, 4, 5, 6, 7, 8].map((o) => getOption(o.toString()))
);

function scaleSelected(value: string) {
  scale.value = Scales.find((s) => s.name === value)!;
}
function noteSelected(value: string) {
  root.value = Notes.find((n) => n.name === value)!;
}
function songLengthSelected(value: number) {
  songLength.value = value;
}
function getScaleNotesLength(): number {
  return scale.value.pattern.split(",").length;
}

watch(root, () => (chords.value = getChords(scale.value, root.value)));
watch(scale, () => {
  chords.value = getChords(scale.value, root.value);
  songLength.value = Math.max(songLength.value, getScaleNotesLength());
});
watch(songLength, () => rollSongChords());

function getSongChord(index: number): Chord {
  return chords.value[index - 1];
}
function getNextSongChord(): number {
  return Math.floor(Math.random() * getScaleNotesLength()) + 1;
}
function rollSongChords() {
  songChords.value = [];
  for (let i = 0; i < songLength.value; i++) {
    let val = getNextSongChord();
    while (i > 0 && songChords.value[i - 1] === val) {
      val = getNextSongChord();
    }
    songChords.value.push(val);
  }
}
function rerollSongChord(index: number) {
  const currentVal = songChords.value[index];
  while (
    songChords.value[index] === currentVal ||
    (index > 0 && songChords.value[index - 1] === songChords.value[index])
  ) {
    songChords.value[index] = getNextSongChord();
  }
}

onMounted(() => {
  rollSongChords();
});
</script>
<template>
  <div class="page-title">Song O'Matic</div>
  <div class="fretboard-options">
    <div class="fretboard-option-row">
      <div class="fretboard-option">
        Scale
        <n-select
          :value="scale.name"
          :options="scaleOptions"
          @update:value="scaleSelected"
        />
      </div>
      <div class="fretboard-option">
        Root Note
        <n-select
          :value="root.name"
          :options="noteOptions"
          @update:value="noteSelected"
        />
      </div>
      <div class="fretboard-option">
        Chords
        <n-select
          :value="songLength"
          :options="songLengthOptions"
          @update:value="songLengthSelected"
        />
      </div>
    </div>
  </div>
  <div class="song-chords">
    <SongChord
      v-for="(scaleIndex, i) in songChords"
      :chord="getSongChord(scaleIndex)"
      :scale-index="scaleIndex"
      :index="i"
      @reroll="rerollSongChord"
    />
  </div>
  <!-- <div class="song-structure">
    {{ songChords.join(" ") }}
  </div> -->
</template>
<style scoped>
.song-structure {
  font-size: 60px;
}
.song-chords {
  display: inline-flex;
  gap: 40px;
  margin-bottom: 20px;
}
</style>
