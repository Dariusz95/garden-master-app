import animal from "../../../../Adopt-animals-app/Frontend/src/store/animal";
import API_URL from "../../api";
import http from "../http";

const state = {
  plants: [],
};

const getters = {
  getPlants(state) {
    return state.plants;
  },
  filterPlants: (state) => (type, kind) => {
    let plants = state.plants;
    if (type !== "") {
      plants = plants.filter((plant) => plant.type === type);
    }
    if (kind != "") {
      plants = plants.filter((plant) => plant.kind === kind);
    }
    return plants;
  },
};

const mutations = {
  setPlants(state, plants) {
    state.plants = plants;
  },
};

const actions = {
  async fetchPlants(context, payload) {
    try {
      const response = await http.get(`${API_URL}/plant`, payload);
      context.commit("setPlants", response.data);
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
