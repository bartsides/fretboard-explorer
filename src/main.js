import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vSelect from "vue-select";

import "vue-select/dist/vue-select.css";
import "bootstrap/dist/css/bootstrap.css";
import "@/assets/styles/main.scss";

Vue.config.productionTip = false;
Vue.component("v-select", vSelect);

// Font Awesome setup
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSync,
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faSync, faChevronLeft, faChevronRight);
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
