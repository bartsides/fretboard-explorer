<template>
  <div
    class="scale-match-selector container d-flex flex-wrap align-items-start justify-content-center"
  >
    <ScaleMatchCard
      v-for="(match, i) in matches"
      :key="i"
      :match="match"
      :selected="matchSelected(match)"
      @clicked="clicked"
    />
  </div>
</template>
<script>
import ScaleMatchCard from "@/components/ScaleMatchCard.vue";
export default {
  components: { ScaleMatchCard },
  props: {
    value: { type: Object, default: () => null },
    matches: { type: Array, default: () => [] }
  },
  methods: {
    clicked(match) {
      const returnVal =
        this.value &&
        this.value.note.value === match.note.value &&
        this.value.scale.name === match.scale.name
          ? null
          : match;
      this.$emit("input", returnVal);
    },
    matchSelected(match) {
      return (
        this.value &&
        this.value.note.value === match.note.value &&
        this.value.scale.name === match.scale.name
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.scale-match-card {
  max-width: 230px;
  min-width: 230px;
}
</style>
