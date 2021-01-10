import Vue from "vue";
import VueRouter from "vue-router";
import FretboardExplorer from "../views/FretboardExplorer.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Fretboard Explorer",
    component: FretboardExplorer
  },
  {
    path: "/scale-finder",
    name: "Scale Finder",
    component: () => import("../views/ScaleFinder.vue")
  },
  {
    path: "/chords",
    name: "Chord Viewer",
    component: () => import("../views/ChordViewer.vue")
  },
  {
    path: "/scale-chords",
    name: "Scale Chords",
    component: () => import("../views/ScaleChords.vue")
  },
  {
    path: "/modes",
    name: "Modes",
    component: () => import("../views/Modes.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
