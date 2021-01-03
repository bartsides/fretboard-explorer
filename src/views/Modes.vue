<template>
  <div class="modes">
    <div class="modes-options container mb-4">
      <div class="row justify-content-center">
        <v-select
          name="tuning"
          :options="tunings"
          label="name"
          v-model="tuning"
          class="col-md-3 mb-4"
          :clearable="false"
        >
          <template #header><div class="select-header">Tuning</div></template>
        </v-select>
        <v-select
          name="scale"
          :options="scales"
          label="name"
          v-model="scale"
          class="col-md-4 mb-4"
          :clearable="false"
        >
          <template #header><div class="select-header">Mode</div></template>
        </v-select>
      </div>
      <div class="row justify-content-center">
        <NoteSelector
          class="col"
          :selectedNote="note"
          @noteSelected="value => (note = value)"
        />
      </div>
    </div>
    <div class="d-flex justify-content-center flex-wrap">
      <ModeCard
        class="mode"
        :mode="modes[0]"
        :index="1"
        :selected="modes[0].note.value === mode.note.value"
        @click.native="modeSelected(modes[0])"
        :fret="getFret(modes[0])"
      />
    </div>
    <div
      class="mode-container d-flex flex-wrap align-items-start justify-content-center"
    >
      <ModeCard
        class="mode"
        v-for="(option, i) in modes.slice(1)"
        :key="i"
        :mode="option"
        :index="i + 2"
        :selected="option.note.value === mode.note.value"
        @click.native="modeSelected(option)"
        :fret="getFret(option)"
      />
    </div>
    <Fretboard
      class="mb-5"
      :options="{
        baseNote: note,
        scale: scale,
        tuning: tuning,
        textMode: 'Number'
      }"
      :highlightedNote="mode.note"
    />
  </div>
</template>
<script>
import ModeService from "@/services/ModeService.js";
import NoteService from "@/services/NoteService.js";
import TuningService from "@/services/TuningService.js";
import Fretboard from "@/components/Fretboard.vue";
import ModeCard from "@/components/ModeCard.vue";
import NoteSelector from "@/components/NoteSelector.vue";
export default {
  components: { Fretboard, ModeCard, NoteSelector },
  data() {
    return {
      tunings: TuningService.tunings,
      tuning: TuningService.tunings[0],
      scales: ModeService.modes,
      scale: ModeService.modes[0],
      notes: NoteService.notes,
      note: NoteService.notes[0],
      modes: [],
      mode: {}
    };
  },
  methods: {
    getFret(mode) {
      const baseNote = this.tuning.notes[0];
      let diff = mode.note.value - baseNote.value;
      if (diff < 0) diff += NoteService.notes.length;
      return diff;
    },
    getModes() {
      this.modes = ModeService.getRelativeModes(this.scale, this.note);
      this.mode = this.modes[0];
    },
    modeSelected(mode) {
      this.mode = mode;
    },
    setBaseNote(note) {
      this.note = note;
    }
  },
  watch: {
    scale: {
      deep: true,
      immediate: true,
      handler() {
        this.getModes();
      }
    },
    note: {
      deep: true,
      immediate: true,
      handler() {
        this.getModes();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.mode-card {
  width: 180px;
}
</style>
