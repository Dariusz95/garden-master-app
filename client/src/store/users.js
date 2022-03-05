import API_URL from "../../api";
import http from "../http";

const state = {
  users: [],
};

const getters = {
  getUsers(state) {
    return state.users;
  },
  // getUserByID: (state) => (id) => {
  //   return state.users.find((user) => user.id === id);
  // },
};

const mutations = {
  setUsers(state, users) {
    state.users = users;
  },
};

const actions = {
  async fetchUsers(context, payload) {
    try {
      const response = await http.get(`${API_URL}/getusers`, payload);
      context.commit("setUsers", response.data);
    } catch (err) {
      console.log(err);
    }
  },
};
export default {
  state,
  getters,
  mutations,
  actions,
};
