import API_URL from "../../api";
import axios from "axios";
import jwt_decode from "jwt-decode";

const state = {
  accesToken: null,
  refreshToken: null,
  isAuthenticated: false,
  currentUser: {},
};

const getters = {
  getAccessToken(state) {
    return state.accesToken;
  },
  getRefreshToken(state) {
    return state.refreshToken;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
  getCurrentUser(state) {
    return state.currentUser;
  },
};

const mutations = {
  setAccessToken(state, accessToken) {
    state.accesToken = accessToken;
  },
  setRefreshToken(state, refreshToken) {
    state.refreshToken = refreshToken;
  },
  setAuthenticated(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  },
  setErrorLogin(state, err) {
    state.errorLogin = err;
  },
  setCurrentUser(state, user) {
    state.currentUser = user;
  },
};

const actions = {
  async login(context, payload) {
    try {
      console.log(API_URL);
      const response = await axios.post(`${API_URL}/login`, payload);
      context.commit("setAccessToken", response.data.accessToken);
      context.commit("setRefreshToken", response.data.refreshToken);
      context.commit("setAuthenticated", true);
      let user = await jwt_decode(response.data.accessToken);
      context.commit("setCurrentUser", user);
    } catch (err) {
      context.commit("setAccessToken", null);
      context.commit("setRefreshToken", null);
      context.commit("setAuthenticated", false);
    }
  },
  async logout(context) {
    context.commit("setAccessToken", null);
    context.commit("setRefreshToken", null);
    context.commit("setAuthenticated", false);
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
