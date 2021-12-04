<template v-model="$vuetify.theme.dark">
  <div>
    <v-container>
      <!-- FAQ by mods -->
      <v-card class="mx-auto mt-10" outlined max-width="1000">
        <v-row class="mx-4 mt-4">
          <v-col>
            <h1 class="one">Edit thread</h1>
            <v-divider class="my-5"></v-divider>
          </v-col>
        </v-row>

        <v-row class="mx-4">
          <v-col>
            <v-text-field
              v-model="title"
              label="Title"
              outlined
              disabled
              :class="!$vuetify.theme.dark ? 'lighter' : 'darker'"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-tabs v-model="tab" align-with-title>
          <v-tabs-slider color="deep-purple lighten-2"></v-tabs-slider>
          <v-tab
            v-for="item in items"
            :key="item"
            style="color: mediumpurple"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item
            v-for="item in items"
            :key="item"
          >
          </v-tab-item>
        </v-tabs-items>
        <v-row class="mx-4">
          <v-col>
            <v-textarea
              v-if="tab === 0"
              v-model="text"
              label="Body"
              outlined
              color="deep-purple lighten-2"
            ></v-textarea>
            <ThreadBody :thread_body="text" v-else></ThreadBody>
          </v-col>
        </v-row>
        <v-row class="mx-4" v-if="tab === 0">
          <v-col>
            <h2 class="one">Tags</h2>
            <v-divider></v-divider>
          </v-col>
        </v-row>

        <v-row class="mx-4" v-if="tab === 0">
          <v-col>
            <v-autocomplete
              v-model="tags"
              :items="selectlist"
              color="deep-purple lighten-2"
              label="None"
              outlined
              hide-selected
              single-line
              clearable
              deletable-chips
              multiple
              small-chips
              :search-input.sync="searchInput"
              @change="searchInput = ''"
            >
              <template #selection="{ item }">
                <v-chip
                  color="rgba(103, 58, 183,.28)"
                  small
                  close
                  @click:close="remove(item.id)"
                >
                  {{ item }}
                </v-chip>
              </template>
            </v-autocomplete>
          </v-col>
        </v-row>
        <v-card-actions class="ma-4 justify-end">
          <v-btn
            @click="$router.push({ name: 'Thread', params: { id: thread_id } })"
            class="mx-2"
            >cancel</v-btn
          >
          <v-btn @click="sendData">save</v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar v-model="error" color="error" :vertical="true">
        {{ errormsg }}

        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="error = false"> Close </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "../store";
import ThreadBody from "./ThreadContent";
Vue.use(VueAxios, axios);
export default {
  name: "Edit",
  components: { ThreadBody },
  data: () => ({
    thread_id: "",
    title: "",
    text: "",
    tags: [],
    selectlist: [],
    errormsg: "",
    error: false,
    searchInput: null,
    items: ["Edit", "Preview"],
    tab: "Edit",
  }),

  methods: {
    remove(id) {
      let idx = this.tags.indexOf(id);
      this.tags.splice(idx, 1);
      this.tags = [...this.tags];
    },
    async sendData() {
      await store.dispatch("loading", true);
      let formData = new FormData();
      formData.append("thread_id", this.thread_id);
      formData.append("text", this.text);
      formData.append("tags", this.tags);
      formData.append("sky_username", this.$store.state.login_skyusername);
      const response = await axios
        .post("/api/edit_thread", formData)
        .catch((error) => {
          if (error.response) {
            console.warn("something went wrong");
          }
        });
      if (response.data.status) {
        await store.dispatch("loading", false);
        await this.$router.push("/thread/" + this.thread_id);
      } else {
        await store.dispatch("loading", false);
        this.errormsg = response.data.message;
        this.error = true;
        console.warn(response.data.status);
      }
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
  },
  async created() {
    await this.getInfo();
  },
};
</script>

<style src="../css/Create.css"></style>
