<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Fretboard Explorer</router-link> |
      <router-link to="/chords">Chord Viewer</router-link> |
      <router-link to="/scale-chords">Scale Chords</router-link> |
      <router-link to="/modes">Modes</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $textColor;
}

#nav {
  padding: 30px;
  color: $darkColor;
  font-weight: bold;

  a {
    color: $textColor;

    &.router-link-exact-active {
      color: $highlightColor;
    }
  }
}
</style>
