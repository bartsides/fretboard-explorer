<script setup lang="ts">
import { computed } from "vue";

const emit = defineEmits<{
  (e: "clicked", string: number, fret: number): void;
}>();

const { mark, highlight, selected, string, fret, text, width, round } =
  defineProps<{
    mark: boolean;
    highlight: boolean;
    selected: boolean;
    string: number;
    fret: number;
    text: string | number;
    width: number;
    round: boolean;
  }>();

const isNut = computed(() => {
  return fret === 0;
});
function click() {
  emit("clicked", string, fret);
}
</script>
<template>
  <div
    class="fret-note"
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
        'fret-strip-selector-option-selected': selected,
      }"
    >
      <div class="fret-text" v-if="mark || selected">{{ text }}</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.fret-note {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  min-width: 29.4327px;
}
.fret-note:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  border-top: 1px inset vars.$darkColor;
  background: vars.$textColor;
  width: 100%;
  transform: translateY(-50%);
}
.fret-icon {
  height: 70%;
  width: 100%;
  max-width: 30px;
  margin: auto;
  padding-left: 1px;
  padding-right: 1px;
  z-index: 1;
  color: vars.$color;
}
.fret-icon-round {
  height: 80% !important;
}
.fret-note-mark {
  border: 1px solid vars.$darkColor;
  background: vars.$highlightColor2;
  color: vars.$darkColor;
  border-radius: 50%;
  box-shadow: 1px 1px 4px vars.$darkColor;
}
.fret-note-highlight {
  border: 1px solid vars.$darkColor;
  background: vars.$highlightColor;
  color: vars.$textColor;
  border-radius: 50%;
  box-shadow: 1px 1px 4px vars.$darkColor;
}
.fret-strip-selector-option-selected {
  border: 1px solid black;
  background: vars.$highlightColor3;
  color: vars.$textColor;
  border-radius: 50%;
  box-shadow: 1px 1px 4px vars.$darkColor;
}
.fret-text {
  padding-top: 5px;
  width: 100%;
  height: 100%;
  font:
    16px "Roboto",
    sans-serif;
}
</style>
