<template>
  <div id="app">
    <div id="nav">
      <Icon @clicked="home" />
      <div class="d-flex justify-content-center align-items-center">
        <div class="d-flex" v-for="(route, i) in routes" :key="i">
          <div v-if="i !== 0" class="mx-1">|</div>
          <router-link :to="route.route">
            {{ route.name }}
          </router-link>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
import Icon from "@/components/Icon.vue";
export default {
  components: { Icon },
  data() {
    return {
      routes: [
        { name: "Fretboard Explorer", route: "/" },
        { name: "Scale Finder", route: "scale-finder" },
        { name: "Chords", route: "chords" },
        { name: "Scale Chords", route: "scale-chords" },
        { name: "Modes", route: "modes" },
        { name: "Tab Charter", route: "tab-charter" }
      ]
    };
  },
  methods: {
    home() {
      if (this.$route.path !== "/") this.$router.push("/");
    }
  }
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $textColor;
}

#nav {
  padding: 2px 30px 30px 30px;
  color: $darkColor;
  font-weight: bold;

  a {
    color: $textColor;

    &.router-link-exact-active {
      color: $highlightColor;
    }
  }
  a:hover {
    color: $highlightColor3;
  }
}
</style>
