<script setup lang="ts">
import { reactive, watch } from "vue";
import { Mode, Modes } from "../theory/Modes";
import { Note } from "../theory/Notes";
import { getNotesInScale, Scale } from "../theory/Scales";

const emit = defineEmits<{
  (e: "mode-selected", mode: Mode, note: Note): void;
}>();

const { selectedMode, rootNote } = defineProps<{
  selectedMode: Scale;
  rootNote: Note;
}>();

const originalNumbers = Array(7)
  .fill(0)
  .map((_, i) => i + 1);

function getNotes(i: number): Note[] {
  const scaleNotes = getNotesInScale(selectedMode, rootNote);
  return [
    ...scaleNotes.slice(scaleNotes.length - i, scaleNotes.length),
    ...scaleNotes.slice(0, scaleNotes.length - i),
  ];
}

let { modes, numbers, notes } = reactive<{
  modes: Mode[];
  numbers: number[];
  notes: Note[];
}>({
  modes: Modes,
  numbers: originalNumbers,
  notes: getNotes(0),
});

function selectionChanged() {
  const i = modes.indexOf(selectedMode);
  numbers = [
    ...originalNumbers.slice(
      originalNumbers.length - i,
      originalNumbers.length
    ),
    ...originalNumbers.slice(0, originalNumbers.length - i),
  ];
  notes = getNotes(i);
}

watch(
  () => selectedMode,
  () => selectionChanged()
);
watch(
  () => rootNote,
  () => selectionChanged()
);
</script>
<template>
  <div class="modes-list unselectable">
    <div
      v-for="(mode, i) in modes"
      class="mode-card"
      :class="{ 'selected-mode': selectedMode.name === mode.name }"
      @click="emit('mode-selected', mode, notes[i])"
    >
      <div class="mode-number">{{ numbers[i] }}</div>
      <div class="mode-note">{{ notes[i]?.name }}</div>
      <div class="mode-name">{{ mode.name }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
$fontSize: 16px;
.modes-list {
  display: inline-flex;
  gap: 10px;
}
.mode-card {
  position: relative;
  width: 100px;
  height: 76px;
  color: vars.$darkColor;
  background-color: vars.$highlightColor2;
  border: 1px solid vars.$highlightColor;
  border-radius: 5px;
  box-shadow: 2px 2px 2px vars.$darkColor;
  cursor: pointer;
  transition:
    background-color 1s,
    color 1.5s;
}
.mode-number {
  position: absolute;
  top: -3px;
  left: 4px;
  font-size: 18px;
}
.mode-note {
  font-size: $fontSize;
  margin-top: 13px;
}
.mode-name {
  font-size: $fontSize;
}
.selected-mode {
  color: vars.$textColor;
  background-color: vars.$highlightColor;
}
</style>
