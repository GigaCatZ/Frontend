<template v-model="$vuetify.theme.dark">
  <v-container>
    <!--page title-->
    <v-card
      class="mx-auto mt-10"
      max-width="600px"
      outlined
      :color="
        !$vuetify.theme.dark
          ? 'rgba(209, 196, 233,.28)'
          : 'rgba(77, 71, 87,.28)'
      "
    >
      <v-card-title class="justify-center ma-5">
        <h1 class="font-weight-light">Login Page</h1>
      </v-card-title>
      <v-divider
        class="mx-16 mb-7 divider-custom"
        :color="!$vuetify.theme.dark ? '#2a0094' : '#fdf7ff'"
      ></v-divider>
      <v-row>
        <v-col class="mx-16">
          <v-form ref="form" v-model="valid" lazy-validation class="mb-4">
            <v-alert v-model="login_alert" dismissible type="error">
              {{ login_alert_text }}
            </v-alert>
            <v-alert v-model="register_alert" dismissible type="success">
              {{ register_alert_text }}
            </v-alert>

            <h4 class="mb-4 font-weight-light">Example: u5581906</h4>

            <!--username field-->
            <v-text-field
              v-model="username"
              :rules="usernameRules"
              color="deep-purple lighten-2"
              clearable
              filled
              label="Enter Username"
              @keydown.enter="login"
              :class="!$vuetify.theme.dark ? 'lighter' : 'darker'"
            ></v-text-field>
            <v-spacer></v-spacer>

            <!--password field-->
            <v-text-field
              v-model="password"
              :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="show3 ? 'text' : 'password'"
              color="deep-purple lighten-2"
              clearable
              filled
              label="Enter Password"
              :class="!$vuetify.theme.dark ? 'lighter' : 'darker'"
              @keydown.enter="login"
              @click:append="show3 = !show3"
            ></v-text-field>
            <v-checkbox
              v-model="remember"
              :color="!$vuetify.theme.dark ? '#2a0094' : '#fdf7ff'"
              label="Stay Signed In"
            ></v-checkbox>
          </v-form>
          <v-row justify="space-around">
            <!--login button-->
            <v-btn
              :disabled="
                !valid || (this.password === '' && this.username === '')
              "
              color="#2a0094"
              class="white--text ma-2"
              block
              @click="login"
              >Login
            </v-btn>

            <!--register button w/ form-->
            <v-dialog
              v-model="form"
              :max-width="!this.$store.state.is_mobile ? '600px' : '75%'"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  color="#2a0094"
                  class="ma-2"
                  block
                  dark
                >
                  Register
                </v-btn>
              </template>
              <v-spacer></v-spacer>
              <v-card>
                <v-card-title class="justify-center">
                  <span class="text-h5 mt-2">Register</span>
                </v-card-title>
                <v-divider
                  class="mx-16 divider-custom ma-3"
                  :color="!$vuetify.theme.dark ? '#2a0094' : '#fdf7ff'"
                ></v-divider>
                <p />
                <div>
                  <v-alert
                    v-model="register_alert"
                    dismissible
                    type="error"
                    class="mx-10"
                  >
                    {{ register_alert_text }}
                  </v-alert>
                </div>
                <v-card-text>
                  <v-container>
                    <v-form ref="form" v-model="valid" lazy-validation>
                      <v-text-field
                        v-model="displayname"
                        :append-icon="
                          this.douserexist ? 'mdi-check-all' : 'mdi-xamarin'
                        "
                        :color="this.douserexist ? 'green' : 'red'"
                        :counter="20"
                        :rules="usernameRules"
                        label="Display Name"
                        hint="This field can be changed at any time in the future."
                        required
                        @input="userexist()"
                        :class="!$vuetify.theme.dark ? 'lighter' : 'darker'"
                      >
                      </v-text-field>

                      <v-text-field
                        v-model="studentID"
                        :rules="usernameRules"
                        color="deep-purple lighten-2"
                        label="Sky Username"
                        hint="This field is permanent (can not be changed after the account has been created)"
                        required
                        :class="!$vuetify.theme.dark ? 'lighter' : 'darker'"
                      ></v-text-field>

                      <v-text-field
                        v-model="password2"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="passwordRules"
                        :type="show1 ? 'text' : 'password'"
                        color="deep-purple lighten-2"
                        label="Password"
                        required
                        @click:append="show1 = !show1"
                        :class="!$vuetify.theme.dark ? 'lighter' : 'darker'"
                      ></v-text-field>

                      <v-text-field
                        v-model="passwordConfirm"
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="passwordRules.concat(passwordConfirmationRule)"
                        :type="show2 ? 'text' : 'password'"
                        color="deep-purple lighten-2"
                        label="Confirm password"
                        required
                        @click:append="show2 = !show2"
                        :class="!$vuetify.theme.dark ? 'lighter' : 'darker'"
                      ></v-text-field>

                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        color="deep-purple lighten-2"
                        label="Email"
                        hint="This field is permanent (can not be changed after the account has been created)"
                        required
                        :class="!$vuetify.theme.dark ? 'lighter' : 'darker'"
                      ></v-text-field>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn
                    :color="!$vuetify.theme.dark ? '#2a0094' : '#fdf7ff'"
                    text
                    @click="form = false"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    :color="!$vuetify.theme.dark ? '#2a0094' : '#fdf7ff'"
                    method="post"
                    text
                    @click="createuser"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="justify-space-around mb-7">
        <!-- forgot password button -->
        <ForgotPwd />
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
// import { mdiCheckAll } from "@mdi/js";
import ForgotPwd from "./ForgotPwd";
import store from "../store";

Vue.use(VueAxios, axios);
export default {
  name: "Login",

  components: {
    ForgotPwd,
  },

  data: () => ({
    //Login Data//
    username: "",
    password: "",
    show3: false,
    remember: false,
    //Register Data//
    displayname: "",
    studentID: "",
    password2: "",
    passwordConfirm: "",
    show1: false,
    show2: false,
    email: "",
    douserexist: true,
    //Alert-Login Data//
    login_alert_text: "",
    login_alert: false,
    //whoami Data//
    user: "",
    status: "",
    //Alert-Register Data//
    register_alert_text: "",
    register_alert: false,
    //Random Data//
    loading: false,
    valid: true,
    form: false,
    usernameRules: [
      (v) => !!v || "Username is required",
      (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
    ],
    passwordRules: [(v) => !!v || "Password can not be empty"],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
  }),
  watch: {
    login_alert: function () {
      if (this.login_alert) {
        setTimeout(() => {
          this.login_alert = false;
        }, 4500);
      }
    },
    register_alert: function () {
      if (this.register_alert) {
        setTimeout(() => {
          this.register_alert = false;
        }, 4500);
      }
    },
  },
  methods: {
    // sleep(ms) {
    //   return new Promise(resolve => setTimeout(resolve, ms));
    // },
    async login() {
      await store.dispatch("loading", true);
      let formData = new FormData();
      formData.append("sky_username", this.username);
      formData.append("password", this.password);
      formData.append("remember", this.remember);
      const response = await axios
        .post("/api/login", formData)
        .catch((error) => {
          if (error.response) {
            console.warn("something went wrong");
          }
        });
      if (response.data.status) {
        await store.dispatch("loading", false);
        await this.$router.push("/");
      } else {
        await store.dispatch("loading", false);
        this.login_alert = true;
        this.login_alert_text = response.data.message;
      }
    },

    async createuser() {
      await store.dispatch("loading", true);
      let formData = new FormData();
      formData.append("display_name", this.displayname);
      formData.append("sky_username", this.studentID);
      formData.append("password", this.passwordConfirm);
      formData.append("email", this.email);
      const response = await axios
        .post("/api/register", formData)
        .catch((error) => {
          if (error.response) {
            console.warn("something went wrong");
          }
        });
      await store.dispatch("loading", false);
      if (response.data.status) {
        this.form = false;
        this.register_alert = true;
        this.register_alert_text = response.data.message;
      } else {
        this.register_alert = true;
        this.register_alert_text = response.data.message;
      }
    },

    async userexist() {
      let formData = new FormData();
      formData.append("display_name", this.displayname);
      const response = await axios
        .post("/api/checkuser", formData)
        .catch((error) => {
          if (error.response) {
            console.warn("something went wrong");
          }
        });
      this.douserexist = response.data.status;
    },
  },
  computed: {
    passwordConfirmationRule() {
      return () =>
        this.password2 === this.passwordConfirm || "Password must match";
    },
  },
};
</script>

<style src="../css/Login.css"></style>
