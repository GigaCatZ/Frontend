<template>
  <v-dialog v-model="addtags" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-card
        v-bind="attrs"
        v-on="on"
        height="300px"
        outlined
        @click="addtags = true"
      >
        <v-card-title>
          <h3>Add tags</h3>
        </v-card-title>
        <v-card-subtitle>
          <p>Add more tags because we still don't have enough</p>
        </v-card-subtitle>
      </v-card>
    </template>

    <v-card>
      <v-card-title>
        <span class="text-h5">Add a new tag</span>
      </v-card-title>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "AddTags",
};
</script>

<style scoped></style>
