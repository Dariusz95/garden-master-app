import Vue from "vue";
import VueRouter from "vue-router";
import home from "../components/home";
import fame from "../components/fame";
import addForm from "../components/addForm";

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
  {
    path: "/add",
    name: "addForm",
    component: addForm,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
