<template>
  <div class="chord-def-card card">
    <h5 class="card-header pb-0">
      <span v-if="number">{{ number }}</span>
      {{ chord.name }}
      <h6 class="text-muted"><span v-html="chord.abbr" /></h6>
      <p class="card-text" :class="{ 'mb-1': chord.notes }">
        {{ chord.formula }}
      </p>
      <h6 class="text-muted" v-if="chord.notes">
        {{ chord.notes }}
      </h6>
      <div v-if="rootNote"></div>
    </h5>
    <div v-if="chord" class="card-body px-0">
      <p class="mb-0">
        {{ rootNote.name }}<span v-html="chord.abbr" /><br />
        {{ notesString }}
      </p>
      <ChordDiagram v-if="rootNote && chord.diagrams" :options="options" />
    </div>
  </div>
</template>
<script>
import ChordDiagram from "@/components/ChordDiagram";
import ChordService from "@/services/ChordService";
import TuningService from "../services/TuningService";
export default {
  components: { ChordDiagram },
  props: {
    chord: { type: Object, default: () => null },
    rootNote: { type: Object, default: () => null },
    number: { type: [Number, undefined], default: null }
  },
  data() {
    return { notes: [] };
  },
  methods: {
    getNotes() {
      if (!this.chord || !this.rootNote) {
        this.notes = [];
        return;
      }
      this.notes = ChordService.getNotes(this.rootNote, this.chord);
    }
  },
  computed: {
    notesString() {
      if (!this.notes) return "";
      return this.notes.map(n => n.name).join(" ");
    },
    options() {
      return {
        rootNote: this.rootNote,
        chord: this.chord,
        tuning: TuningService.tunings[0]
      };
    }
  },
  watch: {
    chord: {
      immediate: true,
      deep: true,
      handler() {
        this.getNotes();
      }
    },
    rootNote: {
      immediate: true,
      deep: true,
      handler() {
        this.getNotes();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.chord-def-card {
  min-width: 300px;
}
</style>
