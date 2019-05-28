import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import vueMarkEditor from "vue-marked-editor";
import "vue-marked-editor/lib/vue-marked-editor.css";

Vue.use(vueMarkEditor);

import "./assets/style/index.scss";
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  watch: {
    $route(to) {
      let path = to.path;
      store.dispatch("CurrentPath", path);
    }
  }
}).$mount("#app");
