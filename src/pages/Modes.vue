<script setup lang="ts">
import { NSelect } from "naive-ui";
import { ref } from "vue";
import Fretboard from "../components/Fretboard.vue";
import ModesComponent from "../components/Modes.vue";
import { getOption } from "../services/HelperService";
import { Mode, Modes } from "../theory/Modes";
import { Note, Notes } from "../theory/Notes";

const mode = ref(Modes[0]);
const note = ref(Notes[10]); // 7 E

const modeOptions = ref(Modes.map((m) => getOption(m.altName ?? m.name)));
const noteOptions = ref(Notes.map((n) => getOption(n.name)));

function modeSelected(value: string) {
  mode.value = Modes.find((m) => m.name === value || m.altName === value)!;
}
function noteSelected(value: string) {
  note.value = Notes.find((n) => n.name === value)!;
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
          :value="mode.altName ?? mode.name"
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
    <Fretboard :scale="mode" :root-note="note" />
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
