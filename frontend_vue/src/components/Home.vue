<style></style>

<template v-model="$vuetify.theme.dark">
  <v-container class="mx-auto" max-width="300">
    <br />
    <v-row dense>
      <v-col>
        <v-carousel
          hide-delimiters
          cycle
          show-arrows-on-hover
          elevation="2"
          height="280px"
        >
          <v-carousel-item v-for="item in announcements" :key="item">
            <v-card outlined height="280px">
              <v-img :src="item.src" aspect-ratio="16/9" height="200"></v-img>
              <v-card-title v-text="item.title"></v-card-title>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </v-col>

      <v-col>
        <v-row dense>
          <v-col>
            <v-card height="136px" outlined :to="{ name: 'FAQ' }">
              <v-card-title class="text-h2">FAQs</v-card-title>
              <v-card-text class="text-h7"
                >Frequently Asked Questions</v-card-text
              >
            </v-card>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col>
            <v-card height="136px" outlined>
              <v-card-title class="text-h2">+</v-card-title>
              <v-card-text class="text-h7">Create A New Post</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <br />

    <v-card outlined>
      <v-card-title class="text-h4">Popular Tags</v-card-title>
      <div class="text-center">
        <v-chip
          v-for="item in popularTags"
          :key="item"
          v-text="item"
          class="ma-2"
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
              any
            ></v-select>
          </v-col>
          <v-col><h2>Threads</h2></v-col>
        </v-row>

        <v-row align="center" v-for="item in threads" :key="item">
          <v-col>
            <v-card outlined>
              <v-card-subtitle v-text="item.user"></v-card-subtitle>
              <v-card-title class="text-h3" v-text="item.title"></v-card-title>
              <v-card-text v-text="item.text"></v-card-text>
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
          title: "Announcement 1",
          src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        },
        {
          title: "Announcement 2",
          src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
        },
      ],
      popularTags: [
        "Tag 1",
        "Tag 2",
        "Tag 3",
        "Tag 4",
        "Tag 5",
        "Tag 6",
        "Tag 7",
        "Tag 8",
        "Tag 9",
        "Tag 10",
      ],
      ordering: ["RECENT", "POPULAR"],
      order: "RECENT",
      threads: [
        { title: "Title 1", text: "example text", user: "username" },
        { title: "Title 2", text: "example text", user: "username" },
        { title: "Title 3", text: "example text", user: "username" },
        { title: "Title 4", text: "example text", user: "username" },
        { title: "Title 5", text: "example text", user: "username" },
      ],
    };
  },

  created() {
    //this.getInfo();
  },

  methods: {
    async getInfo() {
      let formData = new FormData();
      formData.append("order", this.username);
      let result = await Vue.axios.post("/api/home", formData);
      this.popularTags = result.data.tags;
    },
  },
};
</script>
