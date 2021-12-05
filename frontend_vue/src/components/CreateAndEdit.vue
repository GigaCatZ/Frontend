<template>
  <div>
    <v-container class="pt-0">
      <!-- FAQ by mods -->
      <v-card class="mx-auto" outlined max-width="1000">
        <v-row class="mx-1 mt-4">
          <v-col>
            <h1 v-if="this.thread_id === null" class="one">
              Create a new thread
            </h1>
            <h1 v-else class="one">Edit thread</h1>
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
                :disabled="this.thread_id !== null"
                counter
                maxlength="120"
                :rules="[() => !!title || 'This field is required']"
                color="deep-purple lighten-2"
                :class="!$vuetify.theme.dark ? 'lighter' : 'darker'"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="mx-4">
            <v-col>
              <v-textarea
                v-model="text"
                label="Body"
                outlined
                color="deep-purple lighten-2"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row class="mx-4">
            <v-col>
              <h2 class="one">Tags</h2>
            </v-col>
          </v-row>

          <v-row class="mx-4">
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
                    @click:close="remove(item)"
                    >{{ item }}
                  </v-chip>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
          <v-card-actions class="justify-end ma-4">
            <v-btn @click="this.cancel" class="mx-2">cancel</v-btn>
            <v-btn :disabled="!valid" @click="sendData">post</v-btn>
          </v-card-actions>
        </v-form>
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
Vue.use(VueAxios, axios);
export default {
  name: "CreateAndEdit",
  data: () => ({
    errormsg: "",
    valid: false,
    searchInput: null,
    text: "",
    title: "",
    tags: [],
    error: false,
  }),
  props: [
    "thread_title",
    "thread_tags",
    "thread_body",
    "is_valid",
    "thread_id",
    "selectlist",
  ],
  methods: {
    remove(item) {
      let idx = this.tags.indexOf(item);
      this.tags.splice(idx, 1);
      this.tags = [...this.tags];
    },
    cancel() {
      if (this.thread_id === null) {
        this.$router.push({ name: "Home" });
      } else {
        this.$router.push({ name: "Thread", params: { id: this.thread_id } });
      }
    },
    async sendData() {
      await this.$emit("sendData");
    },
    async getInfo() {
      await this.$emit("getInfo");
    },
  },
  created() {
    this.title = this.thread_title;
    this.text = this.thread_body;
    this.tags = this.thread_tags;
    this.valid = this.is_valid;
  },
  watch: {
    title: function () {
      if (!(this.title === undefined)) {
        this.$emit("changeTitle", {
          title: this.title,
          valid: this.valid,
        });
      }
    },
    text: function () {
      if (!(this.text === undefined)) {
        this.$emit("changeText", this.text);
      }
    },
    tags: function () {
      if (!(this.tags === undefined)) {
        this.$emit("changeTags", this.tags);
      }
    },
  },
};
</script>

<style src="../css/Create.css"></style>
