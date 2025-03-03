<script setup lang="ts">
// import Fretboard from "../components/Fretboard.vue";
</script>

<template>
  <h1>Scale Finder</h1>
  <div class="fretboard-container wide-card">
    <!-- <Fretboard /> -->
  </div>
</template>

<style lang="scss" scoped>
$maxWidth: 1100px;
.fretboard-container {
  display: flex;
  place-content: center;
  max-width: $maxWidth;
  margin-left: auto;
  margin-right: auto;
}
</style>
