import axios from "axios";
import store from "./store";
// import { store } from "./store";

console.log(store.getters.getAccessToken);
const http = axios.create({});
http.interceptors.request.use(function (config) {
  let accessToken = store.getters.getAccessToken;
  config.headers["Authorization"] = `Bearer+ ${accessToken}`;
  return config;
});

export default http;
