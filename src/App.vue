<script setup lang="ts">
import { darkTheme, GlobalThemeOverrides, NConfigProvider } from "naive-ui";
import { computed, nextTick, onMounted, provide, reactive, ref } from "vue";
import Nav from "./components/Nav.vue";
import { DefaultSettings, Settings, settingsSymbol } from "./settings/Settings";

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: "#007acc",
    primaryColorHover: "#c5702b",
  },
  Menu: {
    itemTextColor: "#ffffff",
    itemTextColorActiveHorizontal: "#ffffff",
    itemTextColorActiveHoverHorizontal: "#c5702b",
  },
  Card: {
    color: "#333333",
  },
};

const state = reactive<{ windowWidth: number }>({
  windowWidth: window.innerWidth,
});

const settings = ref<Settings>(DefaultSettings);
provide(settingsSymbol, settings);

function settingsChanged(value: Settings) {
  settings.value = value;
}

const onResize = () => (state.windowWidth = window.innerWidth);
const small = computed(() => state.windowWidth < 768);
onMounted(() => {
  nextTick(() => {
    window.removeEventListener("resize", onResize);
    window.addEventListener("resize", onResize);
  });
});
</script>

<template>
  <n-config-provider :theme="darkTheme" :themeOverrides="themeOverrides">
    <Nav :small="small" @settingsChanged="settingsChanged" />
    <router-view />
  </n-config-provider>
</template>

<style lang="scss" scoped>
#nav {
  position: relative;
  color: vars.$darkColor;
  font-weight: bold;
  width: 100%;
  margin-bottom: 24px;

  a {
    color: vars.$textColor;
    &.router-link-exact-active {
      color: vars.$highlightColor;
    }
  }
  a:hover {
    color: vars.$highlightColor3;
  }
}
</style>
