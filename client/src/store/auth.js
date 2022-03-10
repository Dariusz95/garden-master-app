import API_URL from "../../api";
import jwt_decode from "jwt-decode";
import http from "../http";

const state = {
  accesToken: null,
  refreshToken: null,
  isAuthenticated: false,
  currentUser: {},
  errorLogin: "",
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
  getErrorLogin(state) {
    return state.errorLogin;
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
  setErrorLogin(state, error) {
    state.errorLogin = error;
  },
};

const actions = {
  async login(context, payload) {
    try {
      console.log(API_URL);
      const response = await http.post(`${API_URL}/login`, payload);
      context.commit("setAccessToken", response.data.accessToken);
      context.commit("setRefreshToken", response.data.refreshToken);
      context.commit("setAuthenticated", true);
      let user = await jwt_decode(response.data.accessToken);
      context.commit("setCurrentUser", user);
    } catch (err) {
      context.commit("setAccessToken", null);
      context.commit("setRefreshToken", null);
      context.commit("setAuthenticated", false);
      context.commit("setErrorLogin", err.response.data);
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
