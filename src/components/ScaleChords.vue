<script setup lang="ts">
import { reactive, watch } from "vue";
import { Chord } from "../theory/Chords";
import { Note } from "../theory/Notes";
import { getChordsInScale, Scale } from "../theory/Scales";

const { scale, rootNote } = defineProps<{
  scale: Scale;
  rootNote: Note;
}>();

function getChords(): Chord[] {
  if (!scale || !rootNote) return [];
  return getChordsInScale(scale, rootNote);
}

let { chords } = reactive<{ chords: Chord[] }>({
  chords: getChords(),
});

watch(
  () => scale,
  () => (chords = getChords())
);
watch(
  () => rootNote,
  () => (chords = getChords())
);
</script>
<template>
  <div class="chords-list">
    <div v-for="(chord, i) in chords" class="chord-card">
      <div class="chord-number">{{ i + 1 }}</div>
      <div class="chord-name">
        {{ chord.notes[0].name }}
        <div v-html="chord.abbr"></div>
      </div>
      <!-- <div class="chord-notes">
        {{ chord.notes.map((n) => n.name).join(" ") }}
      </div> -->
    </div>
  </div>
</template>
<style lang="scss" scoped>
$fontSize: 16px;
.chords-list {
  display: inline-flex;
  gap: 22px;
  margin-top: 50px;
}
.chord-card {
  display: inline-flex;
  flex-direction: column;
  place-content: center;
  position: relative;
  width: 100px;
  height: 96px;
  background-color: vars.$cardBorderColor;
  border: 1px solid vars.$highlightColor;
  border-radius: 5px;
  box-shadow: 2px 2px 2px vars.$darkColor;
  cursor: pointer;
  transition:
    background-color 1s,
    color 1.5s;
}
.chord-number {
  position: absolute;
  top: -3px;
  left: 4px;
  font-size: 18px;
}
.chord-note {
  font-size: $fontSize;
  margin-top: 13px;
}
.chord-name {
  font-size: 30px;
  display: inline-flex;
  margin-left: auto;
  margin-right: auto;
}
</style>
