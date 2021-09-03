<template>
  <v-dialog v-model="manmod" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-card
        v-bind="attrs"
        v-on="on"
        height="300px"
        outlined
        @click="manmood = true"
      >
        <v-card-title>
          <h3>Manage moderators</h3>
        </v-card-title>
        <v-card-subtitle>
          <p>
            "In case we wanna cancel someone from being a mod lol" - Pornkamol
          </p>
        </v-card-subtitle>
      </v-card>
    </template>

    <v-card>
      <v-card-title>
        <span class="text-h5">Manage moderators</span>
      </v-card-title>
      <v-card-subtitle>
        <p>Please do not abuse this system thanks</p>
      </v-card-subtitle>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "MakeMod",
};
</script>

<style scoped></style>
