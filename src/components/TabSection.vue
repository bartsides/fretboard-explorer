<template>
  <div class="tab-section">
    <div v-if="tuning">
      <div
        class="tab-string d-flex justify-content-center"
        v-for="(note, y) in tuning.notes.slice().reverse()"
        :key="y"
      >
        <TabSpot
          v-for="x in numNotes"
          :key="`${x + offset}-${y}`"
          :text="getSpotText(x + offset, y)"
          @input="text => input(x + offset, y, text)"
        />
      </div>
    </div>
  </div>
</template>
<script>
import TabSpot from "./TabSpot";
export default {
  props: {
    selections: { type: Array, default: () => [] },
    numNotes: { type: Number, default: 1 },
    tuning: { type: Object, default: () => null },
    offset: { type: Number, default: 0 }
  },
  components: { TabSpot },
  methods: {
    getSpotText(x, y) {
      const spot = this.selections.find(n => n.x === x && n.y === y);
      return spot ? spot.text : "";
    },
    input(x, y, text) {
      this.$emit("input", x, y, text);
    }
  }
};
</script>
