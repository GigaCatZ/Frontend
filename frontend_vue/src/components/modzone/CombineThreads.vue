<template>
  <v-dialog v-model="combthread" max-width="600px">
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
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "CombineThreads",
};
</script>

<style scoped></style>
