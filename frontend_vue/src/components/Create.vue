<template v-model="$vuetify.theme.dark">
  <div>
    <v-container>
      <!-- FAQ by mods -->
      <v-card class="mx-auto mt-10" outlined max-width="1000">
        <v-row class="mx-4 mt-4">
          <v-col>
            <h1 class="one">Create a new thread</h1>
            <v-divider class="my-5"></v-divider>
          </v-col>
        </v-row>
        <v-form v-model="valid">
          <v-row class="mx-4">
            <v-col>
              <v-text-field
                v-model="title"
                label="Title"
                outlined
                counter
                maxlength="120"
                :rules="[() => !!title || 'This field is required']"
                color="deep-purple lighten-2"
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
              <v-divider class="my-5"></v-divider>
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
                    >{{ item }}
                  </v-chip>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
          <v-card-actions class="justify-end ma-4">
            <v-btn @click="$router.push({ name: 'Home' })" class="mx-2"
              >cancel</v-btn
            >
            <v-btn :disabled="!valid" @click="sendData">post</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "../store";
import ThreadBody from "./ThreadBody";
Vue.use(VueAxios, axios);
export default {
  name: "Create",
  components: { ThreadBody },
  data: () => ({
    title: "",
    text: "",
    tags: "",
    selectlist: [],
    errormsg: "",
    valid: false,
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
    async extractlist() {
      await store.dispatch("loading", true);
      const response = await axios.get("/api/create_thread").catch((error) => {
        if (error.response) {
          console.warn("something went wrong");
        }
      });
      this.selectlist = response.data.courses;
      await store.dispatch("loading", false);
    },
  },
  async created() {
    await this.extractlist();
  },
};
</script>

<style src="../css/Create.css"></style>
