import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vSelect from "vue-select";

import "vue-select/dist/vue-select.css";
import "bootstrap/dist/css/bootstrap.css";
import "@/assets/styles/main.scss";
import "vue-slider-component/theme/antd.css";

Vue.config.productionTip = false;
Vue.component("v-select", vSelect);

// Font Awesome setup
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBullhorn,
  faCaretSquareDown,
  faCaretSquareUp,
  faChevronLeft,
  faChevronRight,
  faSave,
  faSync,
  faFolderOpen
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(
  faBullhorn,
  faCaretSquareDown,
  faCaretSquareUp,
  faChevronLeft,
  faChevronRight,
  faSave,
  faSync,
  faFolderOpen
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
