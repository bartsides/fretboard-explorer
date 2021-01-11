<template>
  <div class="icon" @click="clicked">
    F E
  </div>
</template>
<script>
export default {
  methods: {
    clicked() {
      this.$emit("clicked");
    }
  }
};
</script>
<style lang="scss" scoped>
$xOffset: 4px;
$yOffset: 6px;
$blur: 0px;
.icon {
  color: $textColor;
  font-size: 80px;
  font-family: "Exo 2", sans-serif;
  text-shadow: $xOffset $yOffset $blur $highlightColor,
    $xOffset * 2 $yOffset * 2 $blur $highlightColor3,
    $xOffset * 3 $yOffset * 3 $blur $highlightColor2;
  margin-top: -20px;
  margin-bottom: 2px;
}
</style>
