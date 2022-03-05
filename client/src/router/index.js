import Vue from "vue";
import VueRouter from "vue-router";
import home from "../components/home";
import plants from "../components/plants";
import plantDetails from "../components/plantDetails";
import fame from "../components/fame";
import addForm from "../components/addForm";
import login from "../components/login";
import register from "../components/register";
import userProfile from "../components/user-profile";

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
    meta: { requiresAuth: true },
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
  {
    path: "/edit",
    name: "userProfile",
    component: userProfile,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = router.app.$store.getters.isAuthenticated;

  if (requiresAuth && !isAuthenticated) next({ name: "login" });
  // if (isAuthenticated) next({ name: "createAnimal" });
  else next();
});

export default router;
