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
      <font-awesome-icon
        class="play-button"
        icon="bullhorn"
        @click="strum"
      ></font-awesome-icon>
      {{ notes.map(n => n.name).join(" ") }}
      <ChordDiagram
        v-if="chord && chord.diagrams"
        :options="options"
        @diagramSelected="val => (diagramNotes = val)"
      />
    </div>
  </div>
</template>
<script>
import ChordDiagram from "@/components/ChordDiagram";
import TuningService from "../services/TuningService";
import SoundService from "../services/SoundService";
export default {
  components: { ChordDiagram },
  props: {
    chord: { type: Object, default: () => null },
    notes: { type: Array, default: () => null },
    number: { type: Number, default: 1 }
  },
  data() {
    return { diagramNotes: [] };
  },
  methods: {
    strum() {
      SoundService.strum(this.diagramNotes);
    }
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

.play-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border: 1px solid $darkColor;
  border-radius: 0.25rem;
  background-color: $darkColor;
  padding: 4px;
}
.play-button:hover {
  color: $highlightColor;
}

.card-body {
  position: relative;
}
</style>
