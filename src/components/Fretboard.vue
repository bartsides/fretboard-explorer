<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { calcFretWidths } from "../services/HelperService";
import { getNote, Note } from "../theory/Notes";
import { getNotesInScale, Scale } from "../theory/Scales";
import { Tuning } from "../theory/Tunings";
import FretNote from "./FretNote.vue";

const emit = defineEmits<{
  (e: "fretClicked", string: number, fret: number): void;
}>();

const props = defineProps<{
  tuning: Tuning;
  scale: Scale;
  rootNote: Note;
  textMode: "Name" | "Number" | "";
  frets: number;
}>();

function getTuningNotes(notes: Note[]): Note[] {
  return JSON.parse(JSON.stringify(notes)).reverse();
}

let { defaultFretWidth, frets, tuningNotes, scaleNotes, textMode } = reactive<{
  defaultFretWidth: number;
  frets: number;
  tuningNotes: Note[];
  scaleNotes: Note[];
  textMode: "Name" | "Number" | "";
}>({
  defaultFretWidth: 46,
  frets: 15,
  tuningNotes: getTuningNotes(props.tuning.notes),
  scaleNotes: getNotesInScale(props.scale, props.rootNote),
  textMode: props.textMode,
});
const fretWidths = ref<number[]>(calcFretWidths(frets, defaultFretWidth));
watch(
  () => props.tuning,
  (val: Tuning) => {
    tuningNotes = getTuningNotes(val.notes);
  }
);
watch(
  () => props.scale,
  (val: Scale) => (scaleNotes = getNotesInScale(val, props.rootNote))
);
watch(
  () => props.rootNote,
  (val: Note) => (scaleNotes = getNotesInScale(props.scale, val))
);
watch(
  () => props.textMode,
  (val: "Name" | "Number" | "") => (textMode = val)
);
watch(
  () => props.frets,
  (val: number) => {
    frets = val;
    fretWidths.value = calcFretWidths(frets, defaultFretWidth);
  }
);
function noteInScale(stringNote: Note, fret: number): boolean {
  if (!scaleNotes.length || !stringNote || !props.rootNote) return false;
  const fretNote = getNote(stringNote.value + fret);
  if (!fretNote) return false;
  return !!scaleNotes.find((n) => n.value === fretNote.value);
}
function fretText(stringNote: Note, fret: number): string {
  if (!textMode || !stringNote) return "";
  const note = getNote(stringNote.value + fret);
  if (!note) return "";
  switch (textMode) {
    case "Name":
      return note.name;
    case "Number":
      return (
        scaleNotes.findIndex((n) => n.value === note.value) + 1
      ).toString();
    default:
      return "";
  }
}
function highlightFretNote(stringNote: Note, fret: number): boolean {
  if (!scaleNotes?.length) return false;
  const fretNote = getNote(stringNote.value + fret);
  if (!fretNote) return false;
  return fretNote.value === scaleNotes[0].value;
}
function fretSelected(string: number, fret: number): boolean {
  return false;
  // return (
  //   selectedFrets &&
  //   selectedFrets.findIndex(
  //     f => f.string === string && f.fret === fret
  //   ) > -1
  // );
}
function fretClicked(string: number, fret: number): void {
  emit("fretClicked", string, fret);
}
</script>
<template>
  <div class="fretboard pt-5">
    <div class="container">
      <div class="row fret-numbers">
        <div class="note-name"><!-- spacer --></div>
        <div class="fret-number" :style="{ width: fretWidths[0] + 'px' }">
          <div class="mx-auto">0</div>
        </div>
        <div class="nut-container"></div>
        <div
          v-for="fret in frets"
          :key="fret"
          :style="{ width: fretWidths[fret] + 'px' }"
          class="fret-number"
          :class="{ 'first-fret': fret === 1 }"
        >
          <div class="mx-auto">{{ fret }}</div>
        </div>
      </div>
      <div class="row string-row" v-for="(note, i) in tuningNotes" :key="i">
        <div class="note-name">
          {{ note.name }}
        </div>
        <FretNote
          :mark="noteInScale(note, 0)"
          :highlight="highlightFretNote(note, 0)"
          :selected="fretSelected(i, 0)"
          :string="i"
          :fret="0"
          :text="fretText(note, 0)"
          :width="fretWidths[0]"
          :round="false"
          @clicked="fretClicked"
        />
        <div class="row nut-container">
          <div class="nut" :class="{ 'first-nut': i === 0 }"></div>
          <div
            class="nut"
            :class="{ 'last-nut': i === tuningNotes.length - 1 }"
          ></div>
        </div>

        <FretNote
          v-for="fret in frets"
          :key="fret"
          :mark="noteInScale(note, fret)"
          :highlight="highlightFretNote(note, fret)"
          :selected="fretSelected(i, fret)"
          :string="i"
          :fret="fret"
          :text="fretText(note, fret)"
          :width="fretWidths[fret]"
          :class="{ 'first-fret': fret === 1 }"
          :round="false"
          @clicked="fretClicked"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.fret {
  border-right: 4px groove vars.$lightColor;
}
.nut-filler {
  color: vars.$backgroundColor;
  width: 15px;
}
.string-row {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  height: 40px;
}
.fret-numbers {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  height: 24px;
}
.fret-number {
  display: flex;
  position: relative;
  min-width: 29.4327px;
  padding-right: 3.6px;
  font:
    18px "Roboto",
    sans-serif;
}
.nut-container {
  height: 100%;
  width: vars.$nutWidth;
  min-width: vars.$nutWidth;
  margin-left: -4px;
  margin-right: 0px;
  color: vars.$backgroundColor;
}
.nut {
  height: 50%;
  min-height: 50%;
  border-right: vars.$nutWidth solid vars.$darkColor;
  z-index: 1;
  margin-left: -1px;
  margin-right: -1px;
}
.first-nut {
  border-top-right-radius: 6px;
}
.last-nut {
  border-bottom-right-radius: 6px;
}
.invis-text {
  color: vars.$backgroundColor;
}
.note-name {
  width: 30px;
  min-width: 30px;
  text-align: left;
  font:
    18px "Roboto",
    sans-serif;
}
.options-switch-container {
  width: 100%;
}
.options-switch {
  float: right;
}
</style>
