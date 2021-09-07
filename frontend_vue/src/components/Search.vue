<template v-model="$vuetify.theme.dark">
  <v-container class="mx-auto">
    <br />
    <v-card outlined class="mx-auto mb-2">
      <v-row align="center">
        <v-col cols="8" class="ml-5">
          <v-autocomplete
            v-model="keywords"
            :items="selectlist"
            v-if="filter === 'TAG'"
            color="deep-purple lighten-2"
            item-color="deep-purple lighten-3"
            hide-details
            single-line
            dense
            outlined
            clearable
            @input="search"
            ><template v-slot:selection
              ><v-chip small color="rgba(103, 58, 183,.28)">{{
                keywords
              }}</v-chip></template
            ></v-autocomplete
          >
          <v-text-field
            v-model="keywords"
            v-else
            hide-details
            label="Search keywords"
            flat
            solo
            clearable
            prepend-icon="mdi-magnify"
            @keydown.enter="search"
          >
          </v-text-field>
        </v-col>
        <v-col col="4" class="mx-5 my-2">
          <v-select
            :items="filtering"
            v-model="filter"
            prefix="FILTER BY:"
            color="deep-purple lighten-2"
            item-color="deep-purple lighten-3"
            hide-details
            single-line
            dense
            outlined
          ></v-select>
        </v-col>
      </v-row>
    </v-card>
    <v-card
      v-if="threads.length === 0"
      flat
      class="d-flex align-center justify-center text-center mx-auto"
      height="500"
    >
      <v-card-text>NO RESULTS</v-card-text>
    </v-card>
    <v-card outlined v-else class="overflow-y-auto mx-auto" height="600">
      <v-container fluid>
        <v-row align="center" v-for="t in threads" :key="t.no">
          <v-col>
            <v-card
              outlined
              class="mt-2 mx-2"
              @click="$router.push('/thread/' + t.thread_id)"
            >
              <v-card-subtitle
                >Created By {{ t.display_name }} • {{ t.date }}</v-card-subtitle
              >
              <v-card-title
                style="font-size: x-large"
                v-text="t.title"
              ></v-card-title>
              <v-card-text>
                <v-chip
                  v-for="tag in t.tags"
                  :key="tag.title"
                  v-text="tag"
                  small
                  color="rgba(103, 58, 183,.28)"
                  class="ma-1"
                ></v-chip>
              </v-card-text>
              <v-card-actions>
                <v-icon class="ml-5 mt-3 mr-3" color="grey"
                  >mdi-thumb-up-outline</v-icon
                >
                <span v-text="t.likes" class="mt-3"></span>
                <v-spacer></v-spacer>
                <v-icon class="ml-5 mt-3 mr-3" color="grey"
                  >mdi-message-outline</v-icon
                >
                <span v-text="t.comment_count" class="mt-3"></span>
                <v-spacer></v-spacer>
                <v-btn
                  :to="{ path: '/thread/' + t.thread_id }"
                  class="ml-2 mt-3"
                  text
                  v-if="!mobile"
                >
                  Continue the thread
                  <v-icon left> mdi-arrow-right</v-icon>
                </v-btn>
                <v-btn
                  :to="{ path: '/thread/' + t.thread_id }"
                  class="ml-2 mt-3"
                  text
                  v-else
                >
                  Continue
                  <v-icon left> mdi-arrow-right</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
export default {
  name: "Search",
  data: () => ({
    mobile: false,
    keywords: "",
    filtering: ["TITLE", "TAG", "AUTHOR"],
    filter: "",
    threads: [],
    selectlist: [],
  }),
  methods: {
    getKeywords() {
      this.keywords = this.$route.params.keywords;
      this.filter = this.$route.query.filter;
      if (this.keywords === undefined) {
        this.keywords = "";
      }
      if (this.filter === undefined) {
        this.filter = "";
      } else {
        this.filter = this.filter.toUpperCase();
      }
    },
    async browse() {
      let formData = new FormData();
      formData.append("search_input", this.keywords);
      formData.append("type_search", this.filter.toLowerCase());
      const response = await axios
        .post("/api/search", formData)
        .catch((error) => {
          if (error.response) {
            console.warn("something went wrong");
          }
        });
      this.threads = response.data.search_result;
      this.mobile = this.$store.state.is_mobile;
    },
    search() {
      this.$router.push(
        "/search/" + this.keywords + "?filter=" + this.filter.toLowerCase()
      );
    },
    async extractlist() {
      const response = await axios.get("/api/create_thread").catch((error) => {
        if (error.response) {
          console.warn("something went wrong");
        }
      });
      this.selectlist = response.data.courses;
    },
  },

  watch: {
    $route() {
      this.browse();
    },
    filter() {
      this.search();
    },
  },

  created() {
    this.extractlist();
    this.getKeywords();
    this.browse();
  },
};
</script>

<style src="../css/Help.css"></style>
