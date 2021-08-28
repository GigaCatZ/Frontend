<style>
/* can be taken out if we dont want to use embedded fonts */
@import url("https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;600&display=swap");

h1.one {
  margin-left: 10px;
  margin-right: 10px;
  font-size: 35px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 600;
}

h1.two {
  margin-left: 10px;
  margin-right: 10px;
  font-size: 12px;
  color: grey;
  font-family: "Titillium Web", sans-serif;
  font-weight: 600;
}

p.one {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 8px;
  font-size: 20px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 300;
}

p.two {
  margin: 10px;
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
      <br />
      <v-card class="mx-auto" outlined>
        <br />
        <v-row class="mx-4">
          <v-col>
            <h1 class="two">Thread no. {{ this.thread_id }}</h1>
            <v-divider></v-divider>
            <br />
            <v-card outlined>
              <h1 class="one">{{ thread_title }}</h1>
            </v-card>
            <br />
            <v-card outlined>
              <p class="one">{{ thread_body }}</p>
            </v-card>
          </v-col>
        </v-row>
        <br />
      </v-card>
    </v-container>
    <v-container>
      <v-card class="mx-auto" outlined>
        <br />
        <v-row class="mx-4">
          <v-col>
            <v-card v-if="this.private.folders != null" class="mx-auto">
              <v-card v-for="folder in this.private.folders" :key="folder.yes">
                {{ folder.name }}
                <v-card v-for="check in folder.checks" :key="check.yes">
                  {{ check.name }}
                </v-card>
              </v-card>
            </v-card>
          </v-col>
        </v-row>
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
  name: "Thread",
  data: () => ({
    thread_status: true,
    thread_like: 0,
    thread_id: "",
    thread_tags: [],
    thread_username: "",
    thread_date: "",
    thread_title: "This is a placeholder for thread title",
    thread_body:
      "This is a placeholder for body. This is a placeholder for body. This is a placeholder for body. This is a placeholder for body. This is a placeholder for body. This is a placeholder for body. This is a placeholder for body. This is a placeholder for body. This is a placeholder for body. This is a placeholder for body. This is a placeholder for body. This is a placeholder for body. ",
    tree: {
      label: "root",
      nodes: [
        {
          label: "item1",
          nodes: [
            {
              label: "item1.1",
            },
            {
              label: "item1.2",
              nodes: [
                {
                  label: "item1.2.1",
                },
              ],
            },
          ],
        },
        {
          label: "item2",
        },
      ],
    },
  }),

  methods: {
    string() {
      this.thread_id = this.$route.path.substr(8);
    },

    async getalldata() {
      let formData = new FormData();
      formData.append("thread_id", this.thread_id);
      const response = await axios
        .post("/api/getthread", formData)
        .catch((error) => {
          if (error.response) {
            console.warn("something went wrong");
          }
        });
      console.log(response.data);
      this.thread_id = response.data.thread_id;
      this.thread_title = response.data.title;
      this.thread_body = response.data.body;
      this.thread_username = response.data.author;
      this.thread_tags = response.data.tags;
      this.thread_date = response.data.timestamp;
      this.thread_status = response.data.status;
      this.thread_like = response.data.like;
      this.thread_comments = response.data.comments;
      if (response.data.status == false) {
        this.$router.push("/");
      }
    },
  },

  created() {
    this.string();
    this.getalldata();
  },
};
</script>
