<template v-model="$vuetify.theme.dark">
  <v-card>
    {{ $route.params.search }}
  </v-card>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
export default {
  name: "Search",
  data: () => ({}),
  methods: {},
  created() {},
};
</script>

<style src="../css/Help.css"></style>
