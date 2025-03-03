<script setup lang="ts">
import { NCollapseTransition, NSelect, NSwitch } from "naive-ui";
import { ref } from "vue";
import Fretboard from "../components/Fretboard.vue";
import ModesComponent from "../components/Modes.vue";
import { getOption } from "../services/HelperService";
import { Mode, Modes } from "../theory/Modes";
import { Note, Notes } from "../theory/Notes";
import { Tunings } from "../theory/Tunings";

const showOptions = ref(false);
const tuning = ref(Tunings[0]);
const mode = ref(Modes[0]);
const note = ref(Notes[10]); // 7 E
const frets = ref(15);
const textMode = ref<"Name" | "Number" | "">("Number");

const tuningOptions = ref(Tunings.map((t) => getOption(t.name)));
const modeOptions = ref(Modes.map((m) => getOption(m.name)));
const noteOptions = ref(Notes.map((n) => getOption(n.name)));
const fretOptions = ref([12, 15, 22, 24].map((f) => getOption(f.toString())));
const textModeOptions = ref(["Name", "Number", ""].map(getOption));

function tuningSelected(value: string) {
  tuning.value = Tunings.find((t) => t.name === value)!;
}
function modeSelected(value: string) {
  mode.value = Modes.find((m) => m.name === value)!;
}
function noteSelected(value: string) {
  note.value = Notes.find((n) => n.name === value)!;
}
function fretsSelected(value: string) {
  frets.value = Number(value);
}
function modeOptionSelected(m: Mode, n: Note) {
  mode.value = m;
  note.value = n;
}
</script>
<template>
  <div class="page-title">Modes</div>
  <div class="fretboard-options">
    <div class="fretboard-option-row">
      <div class="fretboard-option">
        Root Note
        <n-select
          :value="note.name"
          :options="noteOptions"
          @update:value="noteSelected"
        />
      </div>
      <div class="fretboard-option">
        Mode
        <n-select
          :value="mode.name"
          :options="modeOptions"
          @update:value="modeSelected"
        />
      </div>
    </div>
  </div>
  <ModesComponent
    class="modes-component"
    :selected-mode="mode"
    :root-note="note"
    @mode-selected="modeOptionSelected"
  />
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
      :scale="mode"
      :root-note="note"
      :text-mode="textMode"
      :frets="frets"
    />
  </div>
</template>
<style lang="scss" scoped>
.modes-component {
  margin-bottom: 2em;
}
.fretboard-options {
  width: 100%;
}
</style>
