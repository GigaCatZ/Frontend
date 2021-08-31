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
  data: () => ({
    id: "",
  }),
  methods: {
    string() {
      this.id = this.$route.path.substr(8);
    },
    test() {
      console.warn("yes");
    },
  },
  created() {
    this.test();
    this.string();
  },
};
</script>

<style src="../css/Help.css"></style>
