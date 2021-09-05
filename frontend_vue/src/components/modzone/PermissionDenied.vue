<template>
  <v-container>
    <br />
    <br />
    <v-card class="mx-auto" max-width="400" max-height="400" outlined>
      <v-card-title class="justify-center">
        <v-img
          :src="require('../../assets/icc_logo_border.png')"
          class="mx-auto"
          max-height="85"
          max-width="80"
          alt="IC Courses logo"
        ></v-img>
      </v-card-title>
      <v-card-subtitle class="ma-2">
        <h1 class="text-center">Access Denied</h1>
        <p />
        <p class="text-center">
          If you have any questions, please contact other moderators
        </p>
      </v-card-subtitle>
      <v-card-actions class="justify-center">
        <v-btn text :to="'/modzone/main'">Try again</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "PermissionDenied",
};
</script>

<style scoped></style>
