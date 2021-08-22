import Vue from "vue";
import VueRouter from "vue-router";

// import all pages here
import HelloWorld from "../components/HelloWorld";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Hello",
    component: HelloWorld,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
