import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import ToDo from "../views/ToDo.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { transitionName: "slide-l", title: "ToDo" }
  },
  {
    path: "/:id",
    component: ToDo,
    meta: { transitionName: "slide-r", title: "Note" }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
