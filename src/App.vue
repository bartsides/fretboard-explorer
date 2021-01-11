<template>
  <div id="app">
    <div id="nav" class="align-middle">
      <Icon @clicked="home" />
      <router-link to="/">Fretboard Explorer</router-link> |
      <router-link to="/scale-finder">Scale Finder</router-link> |
      <router-link to="/chords">Chords</router-link> |
      <router-link to="/scale-chords">Scale Chords</router-link> |
      <router-link to="/modes">Modes</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
import Icon from "@/components/Icon.vue";
export default {
  components: { Icon },
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
