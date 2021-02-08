<template>
  <div id="app">
    <div id="nav">
      <vue-slider
        id="volume-slider"
        v-model="volume"
        :min="-24"
        :max="0"
        :width="100"
        tooltip="none"
      />
      <template v-if="smallMenu">
        <div class="side-menu">
          <template v-if="collapsed">
            <font-awesome-icon
              class="menu-icon mt-2 mx-2"
              icon="caret-square-down"
              @click="collapsed = !collapsed"
            ></font-awesome-icon>
          </template>
          <template v-else>
            <div class="side-menu-open">
              <font-awesome-icon
                class="menu-icon menu-icon-open mt-2 mx-2"
                icon="caret-square-up"
                @click="collapsed = !collapsed"
              ></font-awesome-icon>
              <div
                class="side-menu-item ml-3 my-3"
                v-for="route in routes"
                :key="route.name"
              >
                <router-link :to="route.route" @click.native="collapsed = true">
                  {{ route.name }}
                </router-link>
              </div>
            </div>
            <div class="menu-icon-filler mb-2" />
          </template>
        </div>
      </template>
      <template v-else>
        <Icon @clicked="home" />
        <div class="d-flex justify-content-center align-items-center mb-3">
          <div class="d-flex" v-for="(route, i) in routes" :key="route.name">
            <div v-if="i !== 0" class="mx-1">|</div>
            <router-link :to="route.route">
              {{ route.name }}
            </router-link>
          </div>
        </div>
      </template>
    </div>
    <router-view />
  </div>
</template>
<script>
import Icon from "@/components/Icon.vue";
import SoundService from "./services/SoundService";
import VueSlider from "vue-slider-component";
export default {
  components: { Icon, VueSlider },
  data() {
    return {
      volume: -12,
      collapsed: true,
      windowWidth: window.innerWidth,
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
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    }
  },
  computed: {
    smallMenu() {
      return this.windowWidth < 768;
    }
  },
  watch: {
    volume: {
      immediate: true,
      handler(val) {
        SoundService.setVolume(val);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize);
    });
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

#volume-slider {
  position: absolute;
  top: 26px;
  right: 10px;
}

#nav {
  position: relative;
  color: $darkColor;
  font-weight: bold;
  text-align: start;

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
@media (min-width: 768px) {
  #nav {
    text-align: center;
  }
}

.menu-icon {
  min-width: 35px !important;
  width: 35px;
  height: 35px;
}
.menu-icon:hover {
  color: $highlightColor;
}
.menu-icon-open {
  color: $highlightColor;
}
.menu-icon-open:hover {
  color: $highlightColor2;
}
.menu-icon-filler {
  min-width: 35px;
  min-height: 35px;
}

.side-menu {
  height: 48px;
}
.side-menu-open {
  position: fixed;
  z-index: 99;
  height: 100%;
  width: 220px;
  background: $color;
  border-right: 3px solid $highlightColor;
  box-shadow: 1px 0px 16px $darkColor;
}
.side-menu-item {
  color: $textColor;
}
</style>
