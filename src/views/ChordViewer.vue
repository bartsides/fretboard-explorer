<template>
  <div class="chord-viewer">
    <div class="container">
      <div class="justify-content-center row">
        <NoteSelector class="col" v-model="rootNote" :unselectable="true" />
      </div>
    </div>
    <div
      class="chord-cards-container my-3 mx-1 d-flex flex-wrap align-items-start justify-content-center"
    >
      <ChordDefinitionCard
        v-for="(chord, i) in chords"
        :key="i"
        :chord="chord"
        :rootNote="rootNote"
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
      rootNote: NoteService.notes[7]
    };
  },
  methods: {
    noteSelected(note) {
      if (this.rootNote && note.value === this.rootNote.value)
        this.rootNote = null;
      else this.rootNote = note;
    }
  }
};
</script>
