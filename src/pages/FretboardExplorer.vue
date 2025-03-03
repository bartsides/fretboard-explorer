<script setup lang="ts">
import { NCollapseTransition, NSelect, NSwitch } from "naive-ui";
import { ref } from "vue";
import Fretboard from "../components/Fretboard.vue";
import ScaleChords from "../components/ScaleChords.vue";
import { getOption } from "../services/HelperService";
import { Notes } from "../theory/Notes";
import { Scales } from "../theory/Scales";
import { Tunings } from "../theory/Tunings";

const showOptions = ref(false);
const tuning = ref(Tunings[0]);
const scale = ref(Scales[0]);
const note = ref(Notes[3]); // 7 E
const frets = ref(15);
const textMode = ref<"Name" | "Number" | "">("Number");

const tuningOptions = ref(Tunings.map((t) => getOption(t.name)));
const scaleOptions = ref(Scales.map((s) => getOption(s.name)));
const noteOptions = ref(Notes.map((n) => getOption(n.name)));
const fretOptions = ref([12, 15, 22, 24].map((f) => getOption(f.toString())));
const textModeOptions = ref(["Name", "Number", ""].map(getOption));

function tuningSelected(value: string) {
  tuning.value = Tunings.find((t) => t.name === value)!;
}
function scaleSelected(value: string) {
  scale.value = Scales.find((s) => s.name === value)!;
}
function noteSelected(value: string) {
  note.value = Notes.find((n) => n.name === value)!;
}
function fretsSelected(value: string) {
  frets.value = Number(value);
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
    <n-switch v-model:value="showOptions" class="options-switch" />
    <n-collapse-transition
      :show="showOptions"
      class="bottom-fretboard-option-row"
    >
      <div class="fretboard-option">
        Tuning
        <n-select
          :value="tuning.name"
          :options="tuningOptions"
          @update:value="tuningSelected"
        />
      </div>
      <div class="fretboard-option">
        Display
        <n-select v-model:value="textMode" :options="textModeOptions" />
      </div>
      <div class="fretboard-option">
        Frets
        <n-select
          :value="frets"
          :options="fretOptions"
          @update:value="fretsSelected"
        />
      </div>
    </n-collapse-transition>
    <Fretboard
      :tuning="tuning"
      :scale="scale"
      :root-note="note"
      :text-mode="textMode"
      :frets="frets"
    />
  </div>
  <ScaleChords :scale="scale" :root-note="note" />
</template>

<style lang="scss" scoped></style>
