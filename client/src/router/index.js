import Vue from "vue";
import VueRouter from "vue-router";
import home from "../components/home";
import fame from "../components/fame";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/fame",
    name: "fame",
    component: fame,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
