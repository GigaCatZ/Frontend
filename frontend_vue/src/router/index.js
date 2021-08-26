import Vue from "vue";
import VueRouter from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

// import all pages here
import Home from "../components/Home";
import Login from "../components/Login";
import FAQ from "../components/FAQ";
import Help from "../components/Help";
import Create from "../components/Create";

// Protocol to avoid redirection duplication
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/faq",
    name: "FAQ",
    component: FAQ,
  },
  {
    path: "/help",
    name: "Help",
    component: Help,
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
  },
];

const router = new VueRouter({ mode: "history", routes: routes });

router.beforeEach(async (to, from, next) => {
  const response = await axios
    .get("http://127.0.0.1:5000/api/whoami")
    .catch((error) => {
      if (error.response) {
        console.warn("something went wrong");
      }
    });
  console.log(response.data);
  next();
});

export default router;
