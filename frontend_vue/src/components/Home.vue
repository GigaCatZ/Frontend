<style></style>

<template v-model="$vuetify.theme.dark">
  <v-container class="mx-auto" max-width="300">
    <br />
    <v-row dense>
      <v-col>
        <v-dialog v-model="zoomedImage" @click="zoomedImage = null">
          <v-card>
            <v-img :src="this.image" contain></v-img>
          </v-card>
        </v-dialog>
        <v-carousel
          hide-delimiters
          cycle
          show-arrows-on-hover
          elevation="2"
          height="280px"
        >
          <v-carousel-item v-for="a in announcements" :key="a.title">
            <v-card outlined height="280px">
              <v-img
                :src="a.src"
                aspect-ratio="16/9"
                height="210"
                contain
                @click="zoom(a.src)"
              ></v-img>
              <v-card-title><h3 class="home">{{ a.title }}</h3></v-card-title>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </v-col>

      <v-col>
        <v-row dense>
          <v-col>
            <v-card height="136px" outlined :to="{ name: 'FAQ' }">
              <v-card-title><h1 class="home">FAQs</h1></v-card-title>
              <v-card-text><p class="home">Frequently Asked Questions</p></v-card-text
              >
            </v-card>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col>
            <v-card height="136px" outlined :to="{ name: 'Create' }">
              <v-card-title><h1 class="home">+</h1></v-card-title>
              <v-card-text><p class="home">Create A New Post</p></v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <br />

    <v-card outlined>
      <v-card-title><h2 class="home">Popular Tags</h2></v-card-title>
      <div class="text-center">
        <v-chip
          v-for="tag in popularTags"
          :key="tag.title"
          v-text="tag"
          class="ma-2"
          small
        ></v-chip>
      </div>
    </v-card>

    <br />

    <v-card outlined>
      <v-container fluid>
        <v-row align="center">
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              :items="ordering"
              v-model="order"
              label="order"
              prefix="MOST"
              hide-details
              single-line
              outlined
              full-width
            ></v-select>
          </v-col>
          <v-col><h2 class="home">Threads</h2></v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card outlined class="overflow-y-auto mx-auto" height="500">
      <v-container fluid>
        <v-row align="center" v-for="t in threads" :key="t.no">
          <v-col>
            <v-card outlined>
              <v-card-subtitle
                >Created By {{ t.display_name }} • {{ t.date }}</v-card-subtitle
              >
              <v-card-title class="text-h3" v-text="t.title"></v-card-title>
              <v-card-text>
                <v-chip
                  v-for="tag in t.tags"
                  :key="tag.title"
                  v-text="tag"
                  small
                  class="ma-1"
                ></v-chip>
              </v-card-text>
              <v-card-actions>
                <v-icon class="ml-5 mt-3 mr-3" color="grey"
                  >mdi-thumb-up-outline</v-icon
                >
                <span v-text="t.likes" class="mt-3"></span>
                <v-spacer></v-spacer>
                <v-icon class="ml-5 mt-3 mr-3" color="grey"
                  >mdi-message-outline</v-icon
                >
                <span v-text="t.comment_count" class="mt-3"></span>
                <v-spacer></v-spacer>
                <v-btn
                  class="ml-2 mt-3"
                  text
                  :to="{ path: '/thread/' + t.thread_id }"
                >
                  Continue the thread<v-icon left> mdi-arrow-right </v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import Vue from "vue";

export default {
  name: "Home",
  data() {
    return {
      announcements: [
        {
          title: "Registration Day 1",
          src: require("../assets/regis1.jpg"),
        },
        {
          title: "Registration Day 2",
          src: require("../assets/regis2.jpg"),
        },
        {
          title: "Registration Day 3",
          src: require("../assets/regis3.jpg"),
        },
        {
          title: "Registration Day 4",
          src: require("../assets/regis4.jpg"),
        },
      ],
      popularTags: [],
      ordering: ["RECENT", "POPULAR", "LIKES"],
      order: "RECENT",
      threads: [],
      zoomedImage: false,
      image: "",
    };
  },

  created() {
    this.getInfo();
  },

  watch: {
    order: function () {
      this.getInfo();
    },
  },

  methods: {
    async getInfo() {
      let formData = new FormData();
      formData.append("order", this.order);
      let result = await Vue.axios.post("/api/home", formData);
      this.popularTags = result.data.tags;
      this.threads = result.data.threads;
      console.log(this.threads);
      console.log(result.data);
    },
    zoom(src) {
      this.zoomedImage = true;
      this.image = src;
    },
  },
};
</script>

<style src="../css/Home.css"></style>
