<template>
  <div class="chord-def-card card">
    <h5 class="card-header">
      <span v-if="number">{{ number }}</span>
      {{ chord.name }}
      <h6 class="text-muted mb-0"><span v-html="chord.abbr" /></h6>
    </h5>
    <div v-if="chord" class="card-body">
      <p class="card-text">Formula: {{ chord.formula }}</p>
      <h6 class="card-subtitle text-muted" v-if="chord.notes">
        {{ chord.notes }}
      </h6>
    </div>
    <div class="card-footer" v-if="rootNote">
      <p class="mb-0">
        {{ rootNote.name }}<span v-html="chord.abbr" /><br />
        {{ notesString }}
      </p>
    </div>
  </div>
</template>
<script>
import ChordService from "@/services/ChordService";
export default {
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
<style scoped>
.chord-def-card {
  width: 220px;
}
</style>
