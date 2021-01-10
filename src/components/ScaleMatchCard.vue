<template>
  <div
    class="scale-match-card card"
    v-if="match"
    @click="clicked"
    :class="{ 'match-selected': selected }"
  >
    <div class="card-header container" :class="{ 'match-selected': selected }">
      <div class="row">
        <div class="col-3 fret-icon ml-1 fret-note-highlight">
          {{ match.note.name }}
        </div>
        <div class="col">{{ match.note.name }} {{ match.scale.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    match: { type: Object, default: () => null },
    selected: { type: Boolean, default: false }
  },
  methods: {
    clicked() {
      this.$emit("clicked", this.match);
    }
  }
};
</script>
<style lang="scss" scoped>
.match-selected {
  background-color: $highlightColor !important;
}
</style>
