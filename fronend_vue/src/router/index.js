import Vue from "vue";
import VueRouter from "vue-router";

// import all pages here
import HelloWorld from "../components/HelloWorld";
import Test from "../components/test";

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
  {
    path: "/test",
    name: "Test",
    component: Test,
  },
];

const router = new VueRouter({ mode: "history", routes: routes });

router.beforeEach(async (to, from, next) => {
  // add something here
  console.log("pass");
  next();
});

export default router;
