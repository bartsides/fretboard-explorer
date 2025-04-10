<script setup lang="ts">
import { Chord } from "../theory/Chords";

const emit = defineEmits<{
  (e: "reroll", index: number): void;
}>();
const { chord, scaleIndex, index } = defineProps<{
  chord: Chord;
  scaleIndex: number;
  index: number;
}>();
function getAbbr(): string {
  if (chord.abbr === "M") return "";
  return chord.abbr;
}
</script>
<template>
  <div class="song-chord">
    <div class="song-chord-top-bar">
      <div class="song-chord-scale-index unselectable">{{ scaleIndex }}</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#e3e3e3"
        @click="emit('reroll', index)"
        class="reroll-icon"
      >
        <path
          d="M300-240q25 0 42.5-17.5T360-300q0-25-17.5-42.5T300-360q-25 0-42.5 17.5T240-300q0 25 17.5 42.5T300-240Zm0-360q25 0 42.5-17.5T360-660q0-25-17.5-42.5T300-720q-25 0-42.5 17.5T240-660q0 25 17.5 42.5T300-600Zm180 180q25 0 42.5-17.5T540-480q0-25-17.5-42.5T480-540q-25 0-42.5 17.5T420-480q0 25 17.5 42.5T480-420Zm180 180q25 0 42.5-17.5T720-300q0-25-17.5-42.5T660-360q-25 0-42.5 17.5T600-300q0 25 17.5 42.5T660-240Zm0-360q25 0 42.5-17.5T720-660q0-25-17.5-42.5T660-720q-25 0-42.5 17.5T600-660q0 25 17.5 42.5T660-600ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"
        />
      </svg>
    </div>
    <div class="song-chord-name unselectable">
      <div>{{ chord.notes[0].name }}</div>
      <div v-html="getAbbr()"></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.song-chord {
  min-width: 120px;
  max-width: 120px;
  min-height: 100px;
  max-height: 100px;
  display: flex;
  flex-direction: column;
  background-color: vars.$cardBorderColor;
  border: 1px solid vars.$highlightColor;
  border-radius: 5px;
  padding-left: 10px;
  padding-right: 10px;
}
.song-chord-top-bar {
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  height: 20px;
  font-size: 19px;
}
.reroll-icon {
  position: relative;
  right: -10px;
  cursor: pointer;
}
.song-chord-name {
  display: inline-flex;
  place-content: center;
  font-size: 40px;
  width: 100%;
  height: 100%;
}
</style>
