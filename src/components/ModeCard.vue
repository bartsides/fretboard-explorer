<template>
  <div
    class="mode-card card"
    v-if="mode"
    :class="{ 'mode-card-selected': selected }"
  >
    <div
      class="card-header container"
      :class="{ 'mode-card-selected': selected }"
    >
      <div class="row">
        <div
          v-if="index"
          class="col-3 fret-icon fret-note-mark ml-1"
          :class="{ 'fret-note-highlight': selected }"
        >
          {{ index }}
        </div>
        <div class="col">
          {{ mode.note.name }} {{ mode.scale.name }}<br />
          Fret {{ fret }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    mode: { type: Object, default: () => null },
    index: { type: Number, default: 0 },
    selected: { type: Boolean, default: false },
    fret: { type: Number }
  }
};
</script>
<style lang="scss" scoped>
.mode-card-selected {
  background-color: $highlightColor;
}
</style>
