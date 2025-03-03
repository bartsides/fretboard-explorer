import { createRouter, createWebHistory } from "vue-router";
import Chords from "./pages/Chords.vue";
import FretboardExplorer from "./pages/FretboardExplorer.vue";
import Modes from "./pages/Modes.vue";
import ScaleFinder from "./pages/ScaleFinder.vue";
import TabCharter from "./pages/TabCharter.vue";

const routes = [
  {
    path: "",
    name: "Fretboard Explorer",
    component: FretboardExplorer,
  },
  {
    path: "/scale-finder",
    name: "Scale Finder",
    component: ScaleFinder,
  },
  {
    path: "/chords",
    name: "Chords",
    component: Chords,
  },
  {
    path: "/modes",
    name: "Modes",
    component: Modes,
  },
  {
    path: "/tab-charter",
    name: "Tab Charter",
    component: TabCharter,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
