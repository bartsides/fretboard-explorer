<template>
  <div class="scale-chords container">
    <div class="scale-chords-options">
      <div class="row justify-content-center mb-4">
        <v-select
          name="scale"
          :options="scales"
          label="name"
          v-model="scale"
          class="col-md-4"
          :clearable="false"
        >
          <template #header><div class="select-header">Scale</div></template>
        </v-select>
      </div>
      <div class="row mb-4">
        <NoteSelector
          class="col"
          :selectedNote="baseNote"
          @noteSelected="value => (baseNote = value)"
        />
      </div>
    </div>
    <div
      class="scale-chords-results d-flex flex-wrap align-items-start justify-content-center"
    >
      <ScaleChordCard
        v-for="(chord, i) in chords"
        :key="i"
        :chord="chord.chord"
        :notes="chord.notes"
        :number="i + 1"
      />
    </div>
  </div>
</template>
<script>
import NoteService from "@/services/NoteService";
import ScaleService from "@/services/ScaleService";
import NoteSelector from "@/components/NoteSelector.vue";
import ScaleChordCard from "@/components/ScaleChordCard";
export default {
  components: { NoteSelector, ScaleChordCard },
  data() {
    return {
      notes: NoteService.notes,
      baseNote: NoteService.notes[7],
      scales: ScaleService.scales,
      scale: ScaleService.scales[0],
      chords: []
    };
  },
  methods: {
    updateChords() {
      if (!this.baseNote || !this.scale) this.chords = [];
      this.chords = ScaleService.getChordsInScale(this.scale, this.baseNote);
    }
  },
  watch: {
    baseNote: {
      deep: true,
      handler() {
        this.updateChords();
      }
    },
    scale: {
      deep: true,
      handler() {
        this.updateChords();
      }
    }
  },
  mounted() {
    this.updateChords();
  }
};
</script>
