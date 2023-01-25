import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueWorker from "vue-worker";
import { fp } from "./plugins/fingerpose";
import handpose from "@tensorflow-models/handpose";
const createjs = window.createjs;

Vue.config.productionTip = false;
Vue.use(VueWorker);
Vue.prototype.createjs = createjs;

new Vue({
  router,
  store,
  vuetify,
  fp,
  handpose,
  render: (h) => h(App),
}).$mount("#app");
