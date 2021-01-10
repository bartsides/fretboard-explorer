<template>
  <div class="note-selector container mx-4">
    <div class="select-header justify-content-center row">Note</div>
    <div class="justify-content-center row">
      <div
        v-for="option in notes"
        :key="option.value"
        class="strip-selector-option col"
        :class="{
          'strip-selector-option-selected':
            value && option.value === value.value
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
    value: { type: Object, default: () => null },
    unselectable: { type: Boolean, default: false }
  },
  methods: {
    noteSelected(note) {
      const emitVal =
        this.unselectable && this.value && this.value.value === note.value
          ? null
          : note;
      this.$emit("input", emitVal);
    }
  }
};
</script>
<style scoped>
.strip-selector-option {
  max-width: 55px !important;
  min-width: 55px;
}
</style>
