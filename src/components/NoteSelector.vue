<template>
  <div class="note-selector container">
    <div class="select-header justify-content-center row">Note</div>
    <div class="justify-content-center row">
      <div
        v-for="option in notes"
        :key="option.value"
        class="strip-selector-option col"
        :class="{
          'strip-selector-option-selected':
            selectedNote && option.value === selectedNote.value
        }"
        @click="noteSelected(option)"
        @mouseover="$event.target.classList.add('selection-hover')"
        @mouseleave="$event.target.classList.remove('selection-hover')"
      >
        {{ option.name }}
      </div>
    </div>
  </div>
</template>
<script>
import NoteService from "@/services/NoteService";
export default {
  data() {
    return { notes: NoteService.notes };
  },
  props: {
    selectedNote: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  methods: {
    noteSelected(note) {
      this.$emit("noteSelected", note);
    }
  }
};
</script>
