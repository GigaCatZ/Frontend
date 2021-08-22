import Vue from "vue";
import VueRouter from "vue-router";

// import all pages here
import HelloWorld from "../components/HelloWorld";

// Protocol to avoid redirection duplication
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

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
