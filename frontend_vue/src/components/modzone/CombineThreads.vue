<template>
  <v-dialog v-model="combthread" fullscreen scrollable>
    <template v-slot:activator="{ on, attrs }">
      <v-card
        v-bind="attrs"
        v-on="on"
        height="300px"
        outlined
        @click="combthread = true"
      >
        <v-card-title>
          <h3>Combine threads</h3>
        </v-card-title>
        <v-card-subtitle>
          <p>StackOverflow users will understand why we need this</p>
        </v-card-subtitle>
      </v-card>
    </template>

    <v-card>
      <v-card-title>
        <span class="text-h5">Combine threads</span>
      </v-card-title>
      <v-divider></v-divider>

      <v-container>
        <v-card v-for="t in thread_list" :key="t" class="pa-6" flat outlined>
          <v-layout row>
            <v-flex lg1 outlined>
              <h5>Thread ID</h5>
              <p>{{ t.thread_id }}</p>
            </v-flex>
            <v-flex lg6>
              <h5>Title</h5>
              <p>{{ t.title }}</p>
            </v-flex>
            <v-flex lg2>
              <h5>Posted by</h5>
              <p>{{ t.display_name }}</p>
            </v-flex>
            <v-flex lg1>
              <h5>Likes</h5>
              <p>{{ t.likes }}</p>
            </v-flex>
            <v-flex lg1>
              <h5>Comments</h5>
              <p>{{ t.comment_count }}</p>
            </v-flex>
            <v-flex lg1>
              <v-btn>MORE</v-btn>
            </v-flex>
          </v-layout>
        </v-card>
      </v-container>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="combthread = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export default {
  name: "CombineThreads",
  data() {
    return {
      combthread: false,
      user_list: [
        {
          sky_username: "u6380496",
          display_name: "Nawat",
          mod: false,
        },
        {
          sky_username: "u6380666",
          display_name: "Who?",
          mod: true,
        },
      ],
      thread_list: [
        {
          thread_id: 3,
          title: "Title #1",
          likes: 3,
          display_name: "Nawat",
          tags: "ICCS101",
          comment_count: 0,
          dupe: [],
        },
        {
          thread_id: 4,
          title: "Title #2",
          likes: 3,
          display_name: "Who?",
          tags: "ICCS101",
          comment_count: 3,
          dupe: [],
        },
      ],
    };
  },
  methods: {
    async whoami() {
      const response = await axios.get("/api/modzone");
      this.user_list = response.data.users;
    },
  },
};
</script>

<style scoped></style>
