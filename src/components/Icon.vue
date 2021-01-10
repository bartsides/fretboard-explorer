<template>
  <div class="icon">
    FE
  </div>
</template>
<style lang="scss" scoped>
$offset: 5px;
$blur: 0px;
.icon {
  color: $textColor;
  font-size: 80px;
  font-family: "Exo 2", sans-serif;
  text-shadow: -$offset 0 $blur $highlightColor,
    $offset 0 $blur $highlightColor3, $offset * 2 0 $blur $highlightColor2;
  margin-top: -20px;
  margin-bottom: -16px;
}
</style>
