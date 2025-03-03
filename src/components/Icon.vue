<script setup lang="ts">
defineProps<{ small: boolean }>();
</script>
<template>
  <router-link
    class="icon unselectable"
    :class="{ 'big-icon': !small }"
    to="/fretboard-explorer"
  >
    {{ small ? "FE" : "Fretboard Explorer" }}
  </router-link>
</template>
<style lang="scss" scoped>
$xOffset: 2px;
$yOffset: 3px;
$blur: 0.5px;

.icon {
  color: vars.$textColor !important;
  font-size: 32px;
  font-family: "Exo 2", sans-serif;
  text-shadow:
    $xOffset $yOffset $blur vars.$highlightColor3,
    $xOffset * 2 $yOffset * 2 $blur vars.$highlightColor;
  margin-top: -10px;
  padding-left: 10px;
  text-decoration-color: vars.$textColor;
  text-decoration-line: none;
  text-align: start;
}
.big-icon {
  min-width: 311px;
}
</style>
