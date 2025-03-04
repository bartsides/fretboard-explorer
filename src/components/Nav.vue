<script setup lang="ts">
import {
  MenuOption,
  NButton,
  NCollapseTransition,
  NIcon,
  NMenu,
  NSelect,
} from "naive-ui";
import { h, onMounted, reactive, ref, watchEffect } from "vue";
import { RouterLink } from "vue-router";
import { getOption } from "../services/HelperService";
import {
  DefaultSettings,
  DisplayOption,
  DisplayOptions,
  Settings,
} from "../settings/Settings";
import { Tunings } from "../theory/Tunings";
import Icon from "./Icon.vue";

interface NavRoute {
  name: string;
  route: string;
}

const emit = defineEmits<{
  (e: "settingsChanged", settings: Settings): void;
}>();

const { small } = defineProps<{ small: boolean }>();
const state = reactive<{ small: boolean }>({ small: small });
watchEffect(() => (state.small = small));

const showOptions = ref(true);
const tuning = ref(DefaultSettings.tuning);
const display = ref<DisplayOption>(DefaultSettings.display);
const frets = ref(DefaultSettings.frets);

const tuningOptions = ref(Tunings.map((t) => getOption(t.name)));
const fretOptions = ref([12, 15, 22, 24].map((f) => getOption(f.toString())));
const displayOptions = ref(DisplayOptions.map(getOption));

const routes: NavRoute[] = [
  { name: "Fretboard Explorer", route: "/fretboard-explorer" },
  //{ name: "Scale Finder", route: "scale-finder" },
  //{ name: "Chords", route: "chords" },
  { name: "Modes", route: "/fretboard-explorer/modes" },
  //{ name: "Tab Charter", route: "tab-charter" },
];
const options: MenuOption[] = routes.map((route) => {
  return {
    key: route.route,
    label: () => h(RouterLink, { to: route.route }, () => route.name),
  };
});

function toggleSettings() {
  showOptions.value = !showOptions.value;
}

function getSettings(): Settings {
  let tuningValue = tuning.value;
  return {
    tuning: tuningValue,
    display: display.value,
    frets: frets.value,
  };
}

function emitSettings() {
  emit("settingsChanged", getSettings());
}
function tuningSelected(value: string) {
  tuning.value = Tunings.find((t) => t.name === value)!;
  emitSettings();
}
function displaySelected(value: DisplayOption) {
  display.value = value;
  emitSettings();
}
function fretsSelected(value: string) {
  frets.value = Number(value);
  emitSettings();
}

onMounted(() => emitSettings());
</script>
<template>
  <div id="nav">
    <Icon :small="small" />
    <n-menu class="nav-menu" mode="horizontal" :options="options" responsive />
    <n-button
      class="settings-button"
      quaternary
      :type="showOptions ? 'primary' : 'tertiary'"
      @click="toggleSettings()"
    >
      <n-icon size="32">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 512 512"
          enable-background="new 0 0 512 512"
          xml:space="preserve"
        >
          <g>
            <path
              d="M413.967,276.8c1.06-6.235,1.06-13.518,1.06-20.8s-1.06-13.518-1.06-20.8l44.667-34.318
		c4.26-3.118,5.319-8.317,2.13-13.518L418.215,115.6c-2.129-4.164-8.507-6.235-12.767-4.164l-53.186,20.801
		c-10.638-8.318-23.394-15.601-36.16-20.801l-7.448-55.117c-1.06-4.154-5.319-8.318-10.638-8.318h-85.098
		c-5.318,0-9.577,4.164-10.637,8.318l-8.508,55.117c-12.767,5.2-24.464,12.482-36.171,20.801l-53.186-20.801
		c-5.319-2.071-10.638,0-12.767,4.164l-42.549,71.765c-2.119,4.153-1.061,10.399,2.129,13.518L96.97,235.2
		c0,7.282-1.06,13.518-1.06,20.8s1.06,13.518,1.06,20.8l-44.668,34.318c-4.26,3.118-5.318,8.317-2.13,13.518L92.721,396.4
		c2.13,4.164,8.508,6.235,12.767,4.164l53.187-20.801c10.637,8.318,23.394,15.601,36.16,20.801l8.508,55.117
		c1.069,5.2,5.318,8.318,10.637,8.318h85.098c5.319,0,9.578-4.164,10.638-8.318l8.518-55.117c12.757-5.2,24.464-12.482,36.16-20.801
		l53.187,20.801c5.318,2.071,10.637,0,12.767-4.164l42.549-71.765c2.129-4.153,1.06-10.399-2.13-13.518L413.967,276.8z
		 M255.468,328.8c-41.489,0-74.46-32.235-74.46-72.8s32.971-72.8,74.46-72.8s74.461,32.235,74.461,72.8S296.957,328.8,255.468,328.8
		z"
            ></path>
          </g>
        </svg>
      </n-icon>
    </n-button>
  </div>
  <n-collapse-transition :show="showOptions" class="options">
    <div class="options-drawer">
      <div class="fretboard-option">
        Tuning
        <n-select
          :value="tuning.name"
          :options="tuningOptions"
          @update:value="tuningSelected"
        />
      </div>
      <div class="fretboard-option">
        Display
        <n-select
          :value="display"
          :options="displayOptions"
          @update:value="displaySelected"
        />
      </div>
      <div class="fretboard-option">
        Frets
        <n-select
          :value="frets"
          :options="fretOptions"
          @update:value="fretsSelected"
        />
      </div>
    </div>
  </n-collapse-transition>
</template>
<style lang="scss" scoped>
#nav {
  display: flex;
  width: 100%;
  background-color: vars.$darkColor;
  justify-content: start;
  align-content: center;
}
.settings-button {
  height: 42px;
  font-size: 36px;
}
.options {
  display: flex;
  place-content: center;
}
$optionsBorder: 1px solid vars.$darkColor;
$optionsBorderRadius: 3px;
.options-drawer {
  display: flex;
  place-content: center;
  border-left: $optionsBorder;
  border-right: $optionsBorder;
  border-bottom: $optionsBorder;
  border-bottom-left-radius: $optionsBorderRadius;
  border-bottom-right-radius: $optionsBorderRadius;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 2em;

  .fretboard-option {
    margin-left: 15px;
    margin-right: 15px;
  }
}
</style>
