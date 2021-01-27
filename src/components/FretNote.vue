<template>
  <div
    class="fret-note px-0"
    :style="{ width: width + 'px' }"
    :class="{ fret: !isNut }"
    @click="click"
  >
    <div
      class="fret-icon"
      :class="{
        'fret-icon-round': round,
        'fret-note-mark': mark,
        'fret-note-highlight': highlight,
        'fret-strip-selector-option-selected': selected
      }"
    >
      <div v-if="mark || selected">{{ text }}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    mark: { type: Boolean, default: false },
    highlight: { type: Boolean, default: false },
    selected: { type: Boolean, default: false },
    string: { type: Number, default: 0 },
    fret: { type: Number, default: 0 },
    size: { type: Number, default: 35 },
    text: { type: [String, Number], default: "" },
    width: { type: Number, default: 35 },
    round: { type: Boolean, default: false }
  },
  methods: {
    click() {
      this.$emit("clicked", this.string, this.fret);
    }
  },
  computed: {
    isNut() {
      return this.fret === 0;
    }
  }
};
</script>
