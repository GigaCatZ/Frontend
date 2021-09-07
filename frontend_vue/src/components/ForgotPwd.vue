<template>
  <v-dialog
    v-model="forgotPwd"
    :max-width="!this.$store.state.is_mobile ? '600px' : '500px'"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        v-on="on"
        :color="!$vuetify.theme.dark ? '#2a0094' : '#fdf7ff'"
        text
        dark
        @click="forgotPwd = true"
      >
        Forgot password
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Request a new password</span>
      </v-card-title>
      <v-alert v-model="pwdRequest_success" class="mx-8" type="success">
        {{ pwdRequest_text }}
      </v-alert>
      <v-alert v-model="pwdRequest_error" dismissible class="mx-8" type="error">
        {{ pwdRequest_text }}
      </v-alert>
      <v-card-text class="mt-5">
        <v-container>
          <v-text-field
            v-model="SKY_username"
            dense
            label="SKY Username"
            required
          ></v-text-field>
          <v-text-field
            v-model="email"
            dense
            label="E-mail"
            required
          ></v-text-field>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="forgotPwd = false"
          >Close
        </v-btn>
        <v-btn color="blue darken-1" text @click="send_request">
          Send request
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export default {
  name: "ForgotPwd",
  data() {
    return {
      SKY_username: "",
      email: "",
      forgotPwd: false,
      pwdRequest_text: "",
      pwdRequest_success: false,
      pwdRequest_error: false,
    };
  },

  methods: {
    async send_request() {
      let formData = new FormData();
      formData.append("sky_username", this.SKY_username);
      formData.append("email", this.email);
      const response = await axios
        .post("/api/new_password", formData)
        .catch((error) => {
          if (error.response) {
            console.warn("something went wrong");
          }
        });

      if (response.data.status) {
        this.pwdRequest_success = true;
        this.pwdRequest_text = response.data.message;
        this.SKY_username = "";
        this.email = "";
      } else {
        this.pwdRequest_error = true;
        this.pwdRequest_text = response.data.message;
      }
    },
  },
};
</script>
