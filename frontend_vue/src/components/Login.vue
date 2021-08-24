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
            :rules="userNameRules"
            v-model="username"
            label="Enter Username"
            filled
            clearable
            @keydown.enter="sendUserInfo"
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
            @keydown.enter="sendUserInfo"
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
            @click="sendUserInfo"
            >Login</v-btn
          >
          <!--register button w/ form-->
          <v-dialog v-model="form" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="#2a0094" dark v-bind="attrs" v-on="on">
                Register
              </v-btn>
            </template>
            <v-spacer></v-spacer>
            <v-card>
              <v-card-title>
                <span class="text-h5">User Profile</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="username"
                        label="Username*"
                        required
                        hint="cannot contain any special characters"
                        persistent-hint
                        clearable
                        @keydown.enter="createUser"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="password"
                        label="Password*"
                        type="password"
                        required
                        clearable
                        @keydown.enter="createUser"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
                <small>*indicates required field</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="form = false">
                  Close
                </v-btn>
                <v-btn color="blue darken-1" text @click="createUser">
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

export default {
  name: "Login",

  data: () => ({
    loading: false,
    valid: true,
    username: "",
    userNameRules: [(v) => !!v || "Username can not be empty"],
    password: "",
    passwordRules: [(v) => !!v || "Password can not be empty"],
    form: false,
  }),

  methods: {
    async sendUserInfo() {
      this.loading = true;
      // check again if username and password are not empty
      if (this.$refs.form.validate()) {
        console.log("login successfully");
      }
      this.loading = false;
    },
    async createUser() {
      if (this.$refs.form.validate()) {
        console.log("register successfully");
        this.form = false;
      }
    },
  },
};
</script>
