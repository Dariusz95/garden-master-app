import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";
import plant from "./plant";
import users from "./users";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},

  mutations: {},
  actions: {},
  modules: {
    auth,
    plant,
    users,
  },
});
