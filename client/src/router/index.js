import Vue from "vue";
import VueRouter from "vue-router";
import home from "../components/home";
import plants from "../components/plants";
import plantDetails from "../components/plantDetails";
import fame from "../components/fame";
import addForm from "../components/addForm";
import login from "../components/login";
import register from "../components/register";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/plants",
    name: "plants",
    component: plants,
  },
  { path: "/plants/:id", name: "plantDetails", component: plantDetails },
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
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/register",
    name: "register",
    component: register,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
