<script setup lang="ts">
import { MenuOption, NMenu } from "naive-ui";
import { h, reactive, watchEffect } from "vue";
import { RouterLink } from "vue-router";
import Icon from "./Icon.vue";

interface NavRoute {
  name: string;
  route: string;
}

const { small } = defineProps<{ small: boolean }>();
const state = reactive<{ small: boolean }>({ small: small });
watchEffect(() => (state.small = small));

// TODO: Move back to repo and commit
// TODO: Deploy to github pages

const routes: NavRoute[] = [
  { name: "Fretboard Explorer", route: "/" },
  //{ name: "Scale Finder", route: "scale-finder" },
  //{ name: "Chords", route: "chords" },
  { name: "Modes", route: "modes" },
  //{ name: "Tab Charter", route: "tab-charter" },
];
const options: MenuOption[] = routes.map((route) => {
  return {
    key: route.route,
    label: () => h(RouterLink, { to: route.route }, () => route.name),
  };
});
</script>
<template>
  <div id="nav">
    <Icon :small="small" />
    <n-menu class="nav-menu" mode="horizontal" :options="options" responsive />
  </div>
</template>
<style lang="scss" scoped>
#nav {
  display: flex;
  width: 100%;
  background-color: vars.$darkColor;
  justify-content: start;
  align-content: center;
}
</style>
