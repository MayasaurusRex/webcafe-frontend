import Vue from "vue";
import VueRouter from "vue-router";
import SignupView from "../views/SignupView.vue";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import MenuView from "../views/MenuView.vue";
import OrderView from "../views/OrderView.vue";
import ContactView from "../views/ContactView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/signup",
    name: "Signup",
    component: SignupView,
  },
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/menu",
    name: "Menu",
    component: MenuView,
  },
  {
    path: "/order",
    name: "Order",
    component: OrderView,
  },
  {
    path: "/contact",
    name: "Contact",
    component: ContactView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
