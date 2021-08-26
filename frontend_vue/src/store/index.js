import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { login_username: "", login_skyusername: "", status: false },
  mutations: {
    setStatus(state, status) {
      this.state.status = status;
    },
    setUserName(state, username) {
      this.state.username = username;
    },
  },
  actions: {},
  modules: {},
});
