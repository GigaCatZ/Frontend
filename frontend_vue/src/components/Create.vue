<style>
/* can be taken out if we dont want to use embedded fonts */
@import url("https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;600&display=swap");

h1.one {
  font-size: 30px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 600;
}

h2.one {
  margin-left: 0;
  font-size: 22px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 600;
}

p.faq {
  font-size: 20px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 300;
}

p.faq2 {
  font-size: 15px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 300;
}

span.smaller {
  font-size: 75%;
  font-weight: normal;
}
</style>

<template v-model="$vuetify.theme.dark">
  <div>
    <v-container>
      <!-- FAQ by mods -->
      <v-card class="mx-auto" outlined max-width="1000">
        <br />
        <v-row class="mx-4">
          <v-col>
            <h1 class="one">Create a post</h1>
            <v-btn @click="sendData">send</v-btn>
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <br />

        <v-row class="mx-4">
          <v-col>
            <v-text-field
              v-model="title"
              label="Title"
              outlined
              counter="30"
            ></v-text-field>
          </v-col>
        </v-row>
        <br />
        <v-row class="mx-4">
          <v-col>
            <v-textarea
              v-model="text"
              label="Body"
              outlined
              counter="300"
            ></v-textarea>
          </v-col>
        </v-row>
        <v-row class="mx-4">
          <v-col>
            <h2 class="one">Add a tag</h2>
            <v-divider></v-divider>
          </v-col>
        </v-row>

        <v-row class="mx-4">
          <v-col>
            <v-autocomplete
              v-model="tags"
              :items="selectlist"
              chips
              clearable
              deletable-chips
              multiple
              solo
            ></v-autocomplete>
          </v-col>
        </v-row>
        <br />
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
export default {
  name: "Create",
  data: () => ({
    title: "",
    text: "",
    tags: "",
    selectlist: [],
    errormsg: "",
    // error: false,
  }),

  methods: {
    async sendData() {
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("text", this.text);
      formData.append("tags", this.tags);
      formData.append("username", this.$store.state.login_skyusername);
      const response = await axios
        .post("/api/create_thread", formData)
        .catch((error) => {
          if (error.response) {
            console.warn("something went wrong");
          }
        });
      console.log(response.data);
      if (response.data.status == true) {
        this.$router.push("/thread/" + response.data.thread_id);
      } else {
        this.error = true;
        this.errormsg = response.data.message;
        console.warn(response.data.status);
      }
    },
    async extractlist() {
      const response = await axios.get("/api/create_thread").catch((error) => {
        if (error.response) {
          console.warn("something went wrong");
        }
      });
      console.log(response);
      this.selectlist = response.data.courses;
    },
  },
  async created() {
    this.extractlist();
  },
};
</script>
