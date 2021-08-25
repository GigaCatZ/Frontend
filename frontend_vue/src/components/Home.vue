<style></style>

<template v-model="$vuetify.theme.dark">
  <v-container class="mx-auto" max-width="300">
    <v-row dense>
      <v-col>
        <v-card height="280px">
          <v-img
            :src="'https://cdn.vuetifyjs.com/images/cards/plane.jpg'"
            aspect-ratio="16/9"
            height="200"
          ></v-img>
          <v-card-title v-text="announcement"></v-card-title>
        </v-card>
      </v-col>

      <v-col>
        <v-row dense>
          <v-col>
            <v-card height="136px" :to="{ name: 'FAQ' }">
              <v-card-title class="text-h2">FAQs</v-card-title>
              <v-card-text class="text-h7"
                >Frequently Asked Questions</v-card-text
              >
            </v-card>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col>
            <v-card height="136px">
              <v-card-title class="text-h2">+</v-card-title>
              <v-card-text class="text-h7">Create A New Post</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    announcement: "Announcement test",
  }),
};
</script>
