<template>
  <div class="scale-chord-card card">
    <h5 class="card-header">
      <div
        class="fret-icon fret-note-mark mb-1"
        :class="{ 'fret-note-highlight': number === 1 }"
      >
        {{ number }}
      </div>
      <div v-if="notes">{{ notes[0].name }} {{ chord.name }}</div>
      <div v-if="notes && chord" class="text-muted">
        {{ notes[0].name }}<span v-html="chord.abbr" />
      </div>
    </h5>
    <div v-if="notes" class="card-body px-0">
      {{ notes.map(n => n.name).join(" ") }}
      <ChordDiagram v-if="chord && chord.diagrams" :options="options" />
    </div>
  </div>
</template>
<script>
import ChordDiagram from "@/components/ChordDiagram";
import TuningService from "../services/TuningService";
export default {
  components: { ChordDiagram },
  props: {
    chord: { type: Object, default: () => null },
    notes: { type: Array, default: () => null },
    number: { type: Number, default: 1 }
  },
  computed: {
    options() {
      return {
        rootNote: this.notes ? this.notes[0] : null,
        chord: this.chord,
        tuning: TuningService.tunings[0]
      };
    }
  }
};
</script>
<style lang="scss" scoped>
.scale-chord-card {
  min-width: 300px;
}
</style>
