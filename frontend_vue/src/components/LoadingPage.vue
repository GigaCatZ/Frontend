<template>
  <v-dialog
    v-model="this.$store.state.loading_screen"
    hide-overlay
    persistent
    width="300"
  >
    <v-card
      dark
      class="my-auto"
      :color="!$vuetify.theme.dark ? '#926cab' : 'rgba(77, 71, 87)'"
    >
      <v-card-title class="justify-center">
        <h5 class="dark-theme">Please Stand By</h5>
      </v-card-title>
      <v-card-text class="justify-center">
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "LoadingPage",
};
</script>
