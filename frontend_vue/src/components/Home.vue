<style></style>

<template v-model="$vuetify.theme.dark">
  <v-container class="mx-auto" max-width="300">
    <br />
    <v-row dense>
      <v-col>
        <v-carousel hide-delimiters cycle elevation="2" height="280px">
          <v-carousel-item v-for="index in announcements" :key="index.title">
            <v-card outlined height="280px">
              <v-img :src="index.src" aspect-ratio="16/9" height="200"></v-img>
              <v-card-title v-text="index.title"></v-card-title>
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
          v-for="tag in popularTags"
          :key="tag"
          v-text="tag"
          class="ma-2"
        ></v-chip>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
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
      "Tag1",
      "Tag2",
      "Tag3",
      "Tag4",
      "Tag5",
      "Tag6",
      "Tag7",
      "Tag8",
      "Tag9",
      "Tag10",
    ],
  }),
};
</script>
