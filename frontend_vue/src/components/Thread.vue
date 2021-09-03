<template v-model="$vuetify.theme.dark">
  <div>
    <v-container>
      <br />
      <v-card class="mx-auto" outlined max-width="800">
        <v-dialog
          type="error"
          dense
          outlined
          class="mx-4 mt-4"
          v-model="log_in_alert"
          dismissible
          max-width="400"
          ><v-card
            ><h1 style="text-align: center" class="pa-6">
              Please log in to like/comment/reply
            </h1></v-card
          >
        </v-dialog>
        <v-card-subtitle
          >Created By {{ this.thread_username }} • {{ this.thread_date }}
          <v-btn
            text
            absolute
            right
            @click="deletethread()"
            v-if="this.thread_username == this.$store.state.login_displayname"
          >
            <v-icon color="grey">mdi-trash-can-outline</v-icon></v-btn
          >
        </v-card-subtitle>
        <v-card-title class="text-h4 pt-0" v-text="thread_title"></v-card-title>
        <v-card-text>
          <v-chip
            v-for="tag in thread_tags"
            :key="tag.title"
            v-text="tag"
            small
            class="mr-1"
          ></v-chip>
        </v-card-text>
        <v-card-text class="text-h5 ml-1">{{ thread_body }}</v-card-text>
        <v-card-actions>
          <v-btn class="ml-2 mt-3 mr-6" text @click="likethread()">
            <v-icon class="mr-5" color="grey" v-if="thread_is_liked == true"
              >mdi-thumb-up</v-icon
            >
            <v-icon class="mr-5" color="grey" v-else
              >mdi-thumb-up-outline</v-icon
            >
            <span v-text="thread_likes"></span>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="ml-2 mt-3 mr-6" text>
            <v-icon class="mr-5" color="grey">mdi-message-outline</v-icon>
            <span v-text="thread_comment_count"></span>
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
            <v-text-field
              label="Please log in to comment"
              outlined
              clearable
              disabled
              v-if="this.$store.state.status == false"
            ></v-text-field>
            <v-text-field
              v-else
              label="Comment"
              outlined
              clearable
              v-model="comment_thread"
            ></v-text-field>
          </v-col>
          <v-col cols="1">
            <v-btn
              v-if="this.$store.state.status == false"
              text
              height="55"
              disabled
              ><v-icon large>mdi-send</v-icon></v-btn
            >
            <v-btn
              v-else
              text
              height="55"
              color="purple darken-3"
              @click="addcomment()"
              ><v-icon large>mdi-send</v-icon></v-btn
            >
          </v-col>
        </v-row>
        <div
          class="mx-6 mb-2"
          v-for="comment in thread_comments"
          :key="comment.yes"
        >
          <v-card outlined>
            <v-card-subtitle v-text="comment.sender"></v-card-subtitle>
            <v-card-text class="ml-1">{{ comment.body }}</v-card-text>
            <v-card-actions>
              <v-btn
                small
                class="ml-2 mr-6"
                text
                @click="likecomment(comment.comment_id)"
              >
                <v-icon
                  small
                  class="mr-5"
                  color="grey"
                  v-if="comment.is_liked == true"
                  >mdi-thumb-up</v-icon
                ><v-icon small class="mr-5" color="grey" v-else
                  >mdi-thumb-up-outline</v-icon
                >
                <span v-text="comment.likes"></span>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                small
                class="ml-2 mr-6"
                text
                @click="comment.reply = !comment.reply"
              >
                <v-icon small class="mr-5" color="grey">mdi-reply</v-icon>
                <span>Reply</span>
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn small class="ml-2 mr-6" text>
                <v-icon small class="mr-1" color="grey"
                  >mdi-alert-octagon</v-icon
                >
                <span>Report</span>
              </v-btn>
            </v-card-actions>
            <v-row class="mx-6 mt-6" no-gutters v-if="comment.reply == true">
              <v-col cols="11">
                <v-text-field
                  v-if="checkstatus() == false"
                  label="Please log in to comment"
                  outlined
                  clearable
                  dense
                  disabled
                  v-model="comment_reply"
                ></v-text-field>
                <v-text-field
                  v-else
                  label="Comment"
                  outlined
                  clearable
                  dense
                  v-model="comment_reply"
                ></v-text-field>
              </v-col>
              <v-col cols="1">
                <v-btn
                  v-if="checkstatus() == false"
                  text
                  height="41"
                  color="purple darken-3"
                  disabled
                  ><v-icon large>mdi-send</v-icon></v-btn
                ><v-btn
                  v-else
                  text
                  height="41"
                  color="purple darken-3"
                  @click="addreply(comment.comment_id, comment.sender)"
                  ><v-icon large>mdi-send</v-icon></v-btn
                >
              </v-col>
            </v-row>
          </v-card>
          <div v-for="subcom in comment.replies" :key="subcom.yes">
            <div class="ml-10">
              <v-card-subtitle v-text="subcom.sender"></v-card-subtitle>
              <v-card-text class="ml-1">{{ subcom.body }}</v-card-text>
              <v-card-actions>
                <v-btn
                  small
                  class="ml-2 mr-6"
                  text
                  @click="likecomment(subcom.comment_id)"
                >
                  <v-icon
                    small
                    class="mr-5"
                    color="grey"
                    v-if="subcom.is_liked == true"
                    >mdi-thumb-up</v-icon
                  ><v-icon small class="mr-5" color="grey" v-else
                    >mdi-thumb-up-outline</v-icon
                  >
                  <span v-text="subcom.likes"></span>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  small
                  class="ml-2 mr-6"
                  text
                  @click="subcom.reply = !subcom.reply"
                >
                  <v-icon small class="mr-5" color="grey">mdi-reply</v-icon>
                  <span>Reply</span>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn small class="ml-2 mr-6" text>
                  <v-icon small class="mr-1" color="grey"
                    >mdi-alert-octagon</v-icon
                  >
                  <span>Report</span>
                </v-btn>
              </v-card-actions>
              <v-row class="mx-6 mt-6" no-gutters v-if="subcom.reply == true">
                <v-col cols="11">
                  <v-text-field
                    v-if="checkstatus() == false"
                    label="Please log in to comment"
                    disabled
                    outlined
                    clearable
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-else
                    label="Comment"
                    outlined
                    clearable
                    dense
                    v-model="comment_reply"
                  ></v-text-field>
                </v-col>
                <v-col cols="1">
                  <v-btn
                    v-if="checkstatus() == false"
                    text
                    height="41"
                    color="purple darken-3"
                    disabled
                    ><v-icon large>mdi-send</v-icon></v-btn
                  >
                  <v-btn
                    v-else
                    text
                    height="41"
                    color="purple darken-3"
                    @click="addreply(subcom.comment_id, subcom.sender)"
                    ><v-icon large>mdi-send</v-icon></v-btn
                  >
                </v-col>
              </v-row>
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
    thread_is_liked: false,
    thread_comment_count: 0,
    thread_id: "",
    thread_tags: [],
    thread_username: "",
    thread_date: "",
    thread_title: "",
    thread_body: "",
    comment_thread: "",
    comment_reply: "",
    thread_comments: [],
    log_in_alert: false,
  }),

  methods: {
    checkstatus() {
      if (this.$store.state.status == true) {
        return true;
      } else {
        return false;
      }
    },

    async getalldata() {
      let formData = new FormData();
      formData.append("thread_id", this.$route.params.id);
      formData.append("sky_username", this.$store.state.login_skyusername);
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
      this.thread_comments = response.data.comments;
      this.thread_comment_count = response.data.comments.length;
      this.thread_is_liked = response.data.is_liked;
      if (response.data.status == false) {
        await this.$router.push("/");
      }
      this.comment_thread = "";
      this.comment_reply = "";
    },

    async addcomment() {
      let formData = new FormData();
      formData.append("thread_id", this.thread_id);
      formData.append("username", this.$store.state.login_skyusername);
      formData.append("comment_body", this.comment_thread);
      // formData.append("comment_id", this.comment_id);
      const response = await axios
        .post("/api/new_comment", formData)
        .catch((error) => {
          if (error.response) {
            console.warn("something went wrong");
          }
        });
      console.log(response.data.comments);
      if (response.data.status == false) {
        console.warn("Failed to send comment");
      } else {
        await this.getalldata();
      }
    },

    async addreply(stored_id, stored_username) {
      let formData = new FormData();
      formData.append("thread_id", this.thread_id);
      formData.append("username", this.$store.state.login_skyusername);
      formData.append(
        "comment_body",
        `@${stored_username} ${this.comment_reply}`
      );
      formData.append("parent_id", stored_id);
      const response = await axios
        .post("/api/new_comment", formData)
        .catch((error) => {
          if (error.response) {
            console.warn("something went wrong");
          }
        });
      console.log(response.data);
      if (response.data.status == false) {
        console.warn("Failed to send comment");
      } else {
        await this.$router.push("/");
      }
    },

    async likethread() {
      let formData = new FormData();
      formData.append("thread_id", this.thread_id);
      formData.append("username", this.$store.state.login_skyusername);
      const response = await axios
        .post("/api/like_thread", formData)
        .catch((error) => {
          if (error.response) {
            console.warn("something went wrong");
          }
        });
      console.log(response.data);
      if (response.data.status == false) {
        console.warn("Failed to send comment");
        this.log_in_alert = true;
      } else {
        await this.getalldata();
      }
    },

    async likecomment(comment_id) {
      let formData = new FormData();
      formData.append("comment_id", comment_id);
      formData.append("username", this.$store.state.login_skyusername);
      const response = await axios
        .post("/api/like_comment", formData)
        .catch((error) => {
          if (error.response) {
            console.warn("something went wrong");
          }
        });
      console.log(response.data);
      if (response.data.status == false) {
        console.warn("Failed to send comment");
        this.log_in_alert = true;
      } else {
        await this.getalldata();
      }
    },

    async deletethread() {
      let formData = new FormData();
      formData.append("thread_id", this.thread_id);
      formData.append("sky_username", this.$store.state.login_skyusername);
      const response = await axios
        .post("/api/deletethread", formData)
        .catch((error) => {
          if (error.response) {
            console.warn("something went wrong");
          }
        });
      console.log(response.data);
      if (response.data.status == false) {
        console.warn("Failed to send comment");
      } else {
        await this.$router.push("/");
      }
    },
  },

  created() {
    this.getalldata();
  },
};
</script>

<style src="../css/Thread.css"></style>
