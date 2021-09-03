<template>
  <v-dialog v-model="modpassword" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-card
        v-bind="attrs"
        v-on="on"
        height="300px"
        outlined
        @click="modpassword = true"
      >
        <v-card-title>
          <h3>Change password</h3>
        </v-card-title>
        <v-card-subtitle>
          <p>
            Help out forgetful people who forgot their password because we are
            very nice people
          </p>
        </v-card-subtitle>
      </v-card>
    </template>

    <v-card>
      <v-card-title>
        <span class="text-h5">Change a user's password</span>
      </v-card-title>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "ModPassword",
};
</script>

<style scoped></style>
