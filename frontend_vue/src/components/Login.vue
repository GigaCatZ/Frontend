<template v-model="$vuetify.theme.dark">
  <v-container>
    <!--page title-->
    <div class="text-center">
      <h1 class="font-weight-light">Login Page</h1>
    </div>
    <br />
    <!--login form-->
    <v-row>
      <v-col offset="3" cols="12" sm="6" md="6" align-self="center">
        <v-form ref="form" v-model="valid" lazy-validation>
          <!--username field-->
          <v-text-field
            :rules="usernameRules"
            v-model="displayname"
            label="Enter Username"
            filled
            clearable
            @keydown.enter="login"
          ></v-text-field>
          <v-spacer></v-spacer>
          <!--password field-->
          <v-text-field
            :rules="passwordRules"
            v-model="password"
            type="password"
            label="Enter Password"
            filled
            clearable
            @keydown.enter="login"
          ></v-text-field>
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
                <v-alert
                  type="error"
                  border=""
                  v-model="alert"
                  dismissible
                >{{alerttext}}</v-alert>
              </div>
              <v-card-title>
                <span class="text-h5">Register</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                      v-model="username2"
                      :counter="20"
                      :rules="usernameRules"
                      label="Username"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="studentID"
                      label="Sky Username"
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
Vue.use(VueAxios, axios);
export default {
  name: "Login",

  data: () => ({
    loading: false,
    valid: true,
    username: "",
    displayname: "",
    usernameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 20) || "Name must be less than 20 characters",
    ],
    studentID: "",
    password: "",
    password2: "",
    passwordConfirm: "",
    passwordRules: [(v) => !!v || "Password can not be empty"],
    alerttext: "",
    alert: false,
    form: false,
    show1: false,
    show2: false,
  }),

  methods: {
    async login() {
      let formData = new FormData();
      formData.append("sky_username", this.username);
      formData.append("password", this.password);
      const response = await axios
        .post("http://127.0.0.1:5000/api/login", formData)
        .catch((error) => {
          if (error.response) {
            console.warn("something went wrong");
          }
        });
      console.log(response.data);
      if (response.data.status == true) {
        this.$router.push("/");
      }
    },

    async createuser() {
      let formData = new FormData();
      formData.append("display_name", this.displayname);
      formData.append("sky_username", this.studentID);
      formData.append("password", this.passwordConfirm);
      const response = await axios
        .post("http://127.0.0.1:5000/api/register", formData)
        .catch((error) => {
          if (error.response) {
            console.warn("something went wrong");
          }
        });
      console.log(response.data);
      if (response.data.status == true) {
        this.$router.push("/login");
      } else {
        console.warn(response.data.message);
        this.alert = true;
        this.alerttext = response.data.message;
      }
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
