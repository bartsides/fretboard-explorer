<script setup lang="ts">
import { Chord } from "../theory/Chords";
import DiceIcon from "../assets/DiceIcon.vue";

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
      <DiceIcon class="reroll-icon" :size="24" @click="emit('reroll', index)" />
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
