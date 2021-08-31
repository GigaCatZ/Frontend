<template v-model="$vuetify.theme.dark">
  <div>
    <v-container>
      <br />
      <v-card class="mx-auto" outlined max-width="800">
        <v-card-subtitle
          >Created By {{ this.thread_username }} •
          {{ this.thread_date }}</v-card-subtitle
        >
        <v-card-title class="text-h4" v-text="thread_title"></v-card-title>
        <v-card-text>
          <v-chip
            v-for="tag in thread_tags"
            :key="tag.title"
            v-text="tag"
            x-small
            class="mr-1"
          ></v-chip>
        </v-card-text>
        <v-card-text class="text-h4 ml-1">{{ thread_body }}</v-card-text>
        <v-card-actions>
          <v-btn class="ml-2 mt-3 mr-6" text>
            <v-icon class="mr-5" color="grey">mdi-thumb-up-outline</v-icon>
            <span v-text="thread_likes"></span>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="ml-2 mt-3 mr-6" text>
            <v-icon class="mr-1" color="grey">mdi-message-outline</v-icon>
            <span v-text="thread_likes"></span>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="ml-2 mt-3 mr-6" text>
            <v-icon class="mr-1" color="grey">mdi-alert-octagon</v-icon>
            <span>Report</span>
          </v-btn>
        </v-card-actions>
      </v-card>

      <br />
      <v-card class="overflow-y-auto mx-auto" outlined max-width="800">
        <v-row class="mx-6 mt-6" no-gutters>
          <v-col cols="11">
            <v-text-field label="Comment" outlined clearable></v-text-field>
          </v-col>
          <v-col cols="1">
            <v-btn text height="55" color="purple darken-3"
              ><v-icon large>mdi-send</v-icon></v-btn
            >
          </v-col>
        </v-row>
        <div class="mx-6" v-for="comment in root" :key="comment.yes">
          <v-card outlined>
            <div>
              <v-row class="mx-2 mt-2" dense>
                <element class="three">{{ comment.username }}</element>
              </v-row>
              <v-row class="mx-2 mb-2" dense>
                <element class="four">{{ comment.body }}</element>
              </v-row>
              <v-row class="mx-2 mb-2" dense
                ><v-icon small @click="test()">mdi-thumb-up-outline</v-icon>
                <v-icon small class="px-2">mdi-reply</v-icon>
                <v-icon small>mdi-alert-octagon</v-icon>
              </v-row>
            </div>
          </v-card>
          <div v-for="subcom in comment.subcomments" :key="subcom.yes">
            <div class="ml-10 my-5" outlined>
              <div>
                <v-row class="mx-2 mt-2" dense>
                  <element class="three">{{ subcom.username }}</element>
                </v-row>
                <v-row class="mx-2 mb-2" dense>
                  <element class="four">{{ subcom.body }}</element>
                </v-row>
                <v-icon small @click="test()" class="pl-2"
                  >mdi-thumb-up-outline</v-icon
                >
                <v-icon small class="px-2">mdi-reply</v-icon>
                <v-icon small>mdi-alert-octagon</v-icon>
              </div>
            </div>
          </div>
        </div>
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
    thread_likes: 0,
    thread_comments: 0,
    thread_id: "",
    thread_tags: [],
    thread_username: "",
    thread_date: "",
    thread_title: "This is a placeholder for thread title",
    thread_body:
      "This is a placeholder for body. This is a placeholder for body. This is a placeholder for body. This is a placeholder for body. This is a placeholder for body. This is a placeholder for body. This is a placeholder for body. This is a placeholder for body. This is a placeholder for body. This is a placeholder for body. This is a placeholder for body. This is a placeholder for body. ",
    root: [
      {
        body: "something",
        username: "bob123",
        subcomments: [
          {
            body: "This is a long comment This is a long comment This is a long comment This is a long comment",
            username: "bob69429",
          },
          { body: "placehold test something", username: "ventibestboi" },
        ],
      },
      {
        body: "something",
        username: "bob123",
        subcomments: [
          { body: "something", username: "bob69429" },
          { body: "placehold test something", username: "ventibestboi" },
        ],
      },
    ],
  }),

  methods: {
    test() {
      console.warn("yes");
    },

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
      console.log(response.data.comments);
      this.thread_id = response.data.thread_id;
      this.thread_title = response.data.title;
      this.thread_body = response.data.body;
      this.thread_username = response.data.author;
      this.thread_tags = response.data.tags;
      this.thread_date = response.data.timestamp;
      this.thread_status = response.data.status;
      this.thread_likes = response.data.likes;
      this.thread_comment_count = response.comment_count;
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

<style src="../css/Thread.css"></style>
