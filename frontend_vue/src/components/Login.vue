<template v-model="$vuetify.theme.dark">
  <v-container>
    <br />
    <!--page title-->
    <div class="text-center">
      <h1 class="font-weight-light">Login Page</h1>
    </div>
    <br />
    <!--login form-->
    <v-row>
      <v-col offset="3" cols="12" sm="6" md="6" align-self="center">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-alert type="error" v-model="login_alert" dismissible>
            {{ login_alert_text }}</v-alert
          >
          <v-alert type="success" v-model="register_alert" dismissible>
            {{ register_alert_text }}</v-alert
          >
          <!--username field-->
          <v-text-field
            :rules="usernameRules"
            v-model="username"
            label="Enter Username"
            filled
            clearable
            @keydown.enter="login"
          ></v-text-field>
          <v-spacer></v-spacer>
          <!--password field-->
          <v-text-field
            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show3 ? 'text' : 'password'"
            :rules="passwordRules"
            v-model="password"
            label="Enter Password"
            filled
            clearable
            @keydown.enter="login"
            @click:append="show3 = !show3"
          ></v-text-field>
          <v-checkbox
            color="#1a0086"
            v-model="remember"
            label="Stay Signed In"
          ></v-checkbox>
        </v-form>
        <br />
        <v-row cols="12" sm="6" md="4" justify="space-around">
          <!--login button-->
          <v-btn
            :loading="loading"
            :disabled="!valid"
            color="#2a0094"
            dark
            elevation="5"
            @click="login"
            >Login</v-btn
          >
          <!--register button w/ form-->
          <v-dialog v-model="form" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="#2a0094" dark v-bind="attrs" v-on="on">
                Register
              </v-btn>
            </template>
            <v-spacer></v-spacer>
            <v-card>
              <div>
                <v-alert type="error" v-model="register_alert" dismissible>
                  {{ register_alert_text }}</v-alert
                >
              </div>
              <v-card-title>
                <span class="text-h5">Register</span>
              </v-card-title>
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
                      required
                      @input="userexist()"
                    >
                    </v-text-field>

                    <v-text-field
                      v-model="studentID"
                      label="Sky Username"
                      :rules="usernameRules"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="password2"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show1 ? 'text' : 'password'"
                      :rules="passwordRules"
                      label="Password"
                      required
                      @click:append="show1 = !show1"
                    ></v-text-field>

                    <v-text-field
                      v-model="passwordConfirm"
                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show2 ? 'text' : 'password'"
                      :rules="passwordRules.concat(passwordConfirmationRule)"
                      label="Confirm password"
                      required
                      @click:append="show2 = !show2"
                    ></v-text-field>
                  </v-form>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="form = false">
                  Close
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="createuser"
                  method="post"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
// import { mdiCheckAll } from "@mdi/js";

Vue.use(VueAxios, axios);
export default {
  name: "Login",

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
  }),

  methods: {
    async login() {
      let formData = new FormData();
      formData.append("sky_username", this.username);
      formData.append("password", this.password);
      formData.append("remember", this.remember);
      // if (this.remember == false) {
      //   formData.append("remember", 0);
      // } else {
      //   formData.append("remember", 1);
      // }
      const response = await axios
        .post("/api/login", formData)
        .catch((error) => {
          if (error.response) {
            console.warn("something went wrong");
          }
        });
      console.log(response.data);
      if (response.data.status == true) {
        this.$router.push("/");
      } else {
        console.warn(response.data.message);
        this.login_alert = true;
        this.login_alert_text = response.data.message;
      }
    },

    async createuser() {
      let formData = new FormData();
      formData.append("display_name", this.displayname);
      formData.append("sky_username", this.studentID);
      formData.append("password", this.passwordConfirm);
      const response = await axios
        .post("/api/register", formData)
        .catch((error) => {
          if (error.response) {
            console.warn("something went wrong");
          }
        });
      console.log(response.data);
      if (response.data.status == true) {
        this.form = false;
        this.register_alert = true;
        this.register_alert_text = response.data.message;
      } else {
        console.warn(response.data.message);
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
      console.log(response.data.message);
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
