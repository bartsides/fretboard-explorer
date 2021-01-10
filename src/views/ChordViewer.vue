<template>
  <div class="chord-viewer container">
    <div class="justify-content-center row">
      <NoteSelector class="col" v-model="baseNote" :unselectable="true" />
    </div>
    <div
      class="chord-cards-container my-3 mx-1 d-flex flex-wrap align-items-start justify-content-center"
    >
      <ChordDefinitionCard
        v-for="(chord, i) in chords"
        :key="i"
        :chord="chord"
        :rootNote="baseNote"
      />
    </div>
  </div>
</template>
<script>
import ChordService from "@/services/ChordService";
import NoteService from "@/services/NoteService";
import ChordDefinitionCard from "@/components/ChordDefinitionCard";
import NoteSelector from "@/components/NoteSelector.vue";
export default {
  components: { ChordDefinitionCard, NoteSelector },
  data() {
    return {
      chords: ChordService.chords,
      notes: NoteService.notes,
      baseNote: null
    };
  },
  methods: {
    noteSelected(note) {
      if (this.baseNote && note.value === this.baseNote.value)
        this.baseNote = null;
      else this.baseNote = note;
    }
  }
};
</script>
