<template>
  <v-container v-if="this.title !== ''" class="mt-10 mx-auto">
    <v-tabs class="mx-auto px-3" v-model="tab" style="max-width: 1024px">
      <v-tabs-slider color="deep-purple lighten-2"></v-tabs-slider>
      <v-tab v-for="item in items" :key="item" style="color: mediumpurple">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item"> </v-tab-item>
    </v-tabs-items>
    <CreateAndEdit
      class="mt-0 pt-0"
      v-if="tab === 0"
      :thread_title="title"
      :thread_body="text"
      :thread_tags="tags"
      :is_valid="valid"
      :selectlist="selectlist"
      :thread_id="this.$route.params.id"
      @changeTitle="changeTitle($event)"
      @changeText="changeText($event)"
      @changeTags="changeTags($event)"
      @sendData="sendData()"
      @getInfo="getInfo()"
    ></CreateAndEdit>
    <template v-else>
      <div>
        <v-container class="pt-0">
          <v-card
            elevation="0" class="mx-auto" outlined max-width="1000">
            <v-card
              v-if="title.length + text.length + tags.length > 0"
              outlined
              elevation="1"
              class="mx-auto mt-8"
              style="background: #ffffff08"
              max-width="800"
            >
              <ThreadContent
                class="mx-auto mt-6"
                style="max-width: 1024px"
                :thread_title="title"
                :thread_body="text"
                :thread_tags="tags"
              ></ThreadContent>
            </v-card>
            <v-card class="mx-auto" elevation="0" max-width="1000">
              <v-card-actions v-if="tab === 1" class="justify-end ma-4">
                <v-btn @click="$router.push({ name: 'Home' })" class="mx-2"
                >cancel</v-btn
                >
                <v-btn :disabled="!valid" @click="sendData">post</v-btn>
              </v-card-actions>
            </v-card>
          </v-card>
        </v-container>
      </div>
    </template>
  </v-container>
</template>

<script>
import ThreadContent from "./ThreadContent";
import store from "../store";
import axios from "axios";
import CreateAndEdit from "./CreateAndEdit";
export default {
  name: "Edit",
  components: { CreateAndEdit, ThreadContent },
  data: () => ({
    items: ["Edit", "Preview"],
    tab: "Edit",
    title: "",
    text: "",
    tags: [],
    selectlist: [],
    valid: false,
  }),
  methods: {
    changeTitle({ title, valid }) {
      this.title = title;
      this.valid = valid;
    },
    changeText(text) {
      this.text = text;
    },
    changeTags(tags) {
      this.tags = tags;
    },
    async getInfo() {
      await store.dispatch("loading", true);
      const response = await axios
        .get("/api/edit_thread?thread_id=" + this.$route.params.id)
        .catch((error) => {
          if (error.response) {
            console.warn("something went wrong");
          }
        });
      this.thread_id = this.$route.params.id;
      this.title = response.data.title;
      this.text = response.data.body;
      this.selectlist = response.data.courses;
      this.tags = response.data.selected_tags;
      await store.dispatch("loading", false);
    },
    async sendData() {
      await store.dispatch("loading", true);
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
      if (response.data.status) {
        await store.dispatch("loading", false);
        await this.$router.push("/thread/" + response.data.thread_id);
      } else {
        await store.dispatch("loading", false);
        this.error = true;
        this.errormsg = response.data.message;
        console.warn(response.data.status);
      }
    },
  },
  created() {
    this.getInfo();
  },
};
</script>

<style scoped></style>

