<style>
h2 {
  font-size: 40px;
  margin-top: 100px;
  text-align: center;
}

.center {
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>

<template v-model="$vuetify.theme.dark">
  <v-container class="lighten-5">
    <v-row no-gutters>
      <v-col order="1">
        <v-card
          @click.stop="pass"
          class="mt-12 mx-auto rounded-lg"
          elevation="5"
          height="200"
          max-width="300"
        >
          <h2 class="center">FAQs</h2>
        </v-card>
      </v-col>

      <v-col order="2">
        <v-card
          @click.stop="pass"
          class="mt-12 mx-auto rounded-lg"
          elevation="5"
          height="200"
          max-width="300"
        >
          <h2 class="center">Course Demands</h2>
        </v-card>
      </v-col>

      <v-col order="3">
        <v-card
          @click.stop="pass"
          class="mt-12 mx-auto rounded-lg"
          elevation="5"
          height="200"
          max-width="300"
        >
          <h2 class="center" style="font-size: 40px">Rate my Plan</h2>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Home",
};
</script>
