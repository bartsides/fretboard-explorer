<template>
  <div class="fretboard-explorer">
    <div class="fretboard-options mb-3">
      <div class="container-fluid">
        <div
          class="d-flex flex-wrap align-items-start justify-content-center row w-100 mb-4"
        >
          <v-select
            name="tuning"
            :options="tunings"
            label="name"
            v-model="tuning"
            class="col-md-3 col-lg-2 mb-1"
            :clearable="false"
          >
            <template #header><div class="select-header">Tuning</div></template>
          </v-select>
          <v-select
            name="scale"
            :options="scales"
            label="name"
            v-model="scale"
            class="col-md-4 col-lg-3 mb-1"
            :clearable="false"
          >
            <template #header><div class="select-header">Scale</div></template>
          </v-select>
          <v-select
            name="textMode"
            :options="['Number', 'Name', 'None']"
            v-model="textMode"
            class="col-md-3 col-lg-2 mb-1"
            :clearable="false"
          >
            <template #header>
              <div class="select-header">Display</div>
            </template>
          </v-select>
        </div>
      </div>
      <div class="row">
        <NoteSelector
          class="col"
          :selectedNote="baseNote"
          @noteSelected="value => (baseNote = value)"
        />
      </div>
    </div>
    <Fretboard :options="options" />
  </div>
</template>

<script>
import Fretboard from "@/components/Fretboard.vue";
import NoteSelector from "@/components/NoteSelector.vue";
import NoteService from "@/services/NoteService";
import TuningService from "@/services/TuningService";
import ScaleService from "@/services/ScaleService";

export default {
  name: "Home",
  components: {
    Fretboard,
    NoteSelector
  },
  data() {
    return {
      notes: NoteService.notes,
      tunings: TuningService.tunings,
      scales: ScaleService.scales,
      baseNote: NoteService.notes[7],
      tuning: TuningService.tunings[0],
      scale: ScaleService.scales[0],
      textMode: "Number"
    };
  },
  computed: {
    options() {
      return {
        baseNote: this.baseNote,
        scale: this.scale,
        tuning: this.tuning,
        textMode: this.textMode
      };
    }
  }
};
</script>
