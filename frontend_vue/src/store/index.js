import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
    loading({ commit }, response) {
      commit("setLoadingScreen", response);
    },
    storedinfo({ commit }, response) {
      commit("setStatus", response.is_logged_in);
      commit("setUserName", response.display_name);
      commit("setSkyUserName", response.sky_username);
      commit("setModStatus", response.mod);
      commit("setMobileStatus", screen.width <= 760);
    },
    resetinfo({ commit }) {
      commit("setStatus", false);
      commit("setUserName", null);
      commit("setSkyUserName", null);
      commit("setModStatus", false);
    },
  },
  mutations: {
    setLoadingScreen(state, loading_status) {
      this.state.loading_screen = loading_status;
    },
    setModStatus(state, mod_status) {
      this.state.is_mod = mod_status;
    },
    setMobileStatus(state, mobile_status) {
      this.state.is_mobile = mobile_status;
    },
    setStatus(state, status) {
      this.state.status = status;
    },
    setUserName(state, login_displayname) {
      this.state.login_displayname = login_displayname;
    },
    setSkyUserName(state, login_skyusername) {
      this.state.login_skyusername = login_skyusername;
    },
  },
  state: {
    login_displayname: null,
    login_skyusername: null,
    status: false,
    is_mod: false,
    is_mobile: false,
    is_dark_mode: false,
    loading_screen: false,
  },
  modules: {},
});
