import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import tags from "./modules/tags";
import getters from "./getters";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    tags
  },
  getters
});

export default store;
