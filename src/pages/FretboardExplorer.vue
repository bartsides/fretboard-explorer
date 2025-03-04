<script setup lang="ts">
import { NSelect } from "naive-ui";
import { ref } from "vue";
import Fretboard from "../components/Fretboard.vue";
import ScaleChords from "../components/ScaleChords.vue";
import { getOption } from "../services/HelperService";
import { Notes } from "../theory/Notes";
import { Scales } from "../theory/Scales";

const scale = ref(Scales[0]);
const note = ref(Notes[3]); // 7 E

const scaleOptions = ref(Scales.map((s) => getOption(s.name)));
const noteOptions = ref(Notes.map((n) => getOption(n.name)));

function scaleSelected(value: string) {
  scale.value = Scales.find((s) => s.name === value)!;
}
function noteSelected(value: string) {
  note.value = Notes.find((n) => n.name === value)!;
}
</script>

<template>
  <div class="page-title">Fretboard Explorer</div>
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
          :value="note.name"
          :options="noteOptions"
          @update:value="noteSelected"
        />
      </div>
    </div>
  </div>
  <div class="fretboard-container wide-card">
    <Fretboard :scale="scale" :root-note="note" />
  </div>
  <ScaleChords :scale="scale" :root-note="note" />
</template>

<style lang="scss" scoped></style>
