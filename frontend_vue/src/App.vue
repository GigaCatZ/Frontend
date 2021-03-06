<template>
  <v-app>
    <v-app-bar
      fixed
      height="80"
      dense
      color="#502b80"
      dark
      :src="require('./assets/MUIC_building.jpg')"
    >
      <!-- Fade color -->
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          :gradient="
            !$vuetify.theme.dark
              ? 'to top right, rgba(58, 0, 133,.7), rgba(25,32,72,.7)'
              : 'to top right, rgba(10,10,20,.7), rgba(25,32,72,.7)'
          "
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-btn
        v-if="!this.$store.state.is_mobile"
        plain
        fab
        icon
        x-large
        :to="{ name: 'Home' }"
      >
        <v-img
          :src="require('./assets/icc_logo_border.png')"
          height="65"
          width="60"
          contain
        />
      </v-btn>
      <v-btn v-else plain fab :to="{ name: 'Home' }">
        <v-img
          :src="require('./assets/icc_logo_border.png')"
          height="40"
          width="35"
          contain
        />
      </v-btn>

      <v-btn
        plain
        :to="{ name: 'Home' }"
        x-small
        v-if="this.$store.state.is_mobile"
      >
        <h1 class="white--text font-weight-bold">IC Courses</h1>
      </v-btn>
      <v-btn plain :to="{ name: 'Home' }" v-else>
        <h1 class="white--text font-weight-bold">IC Courses</h1>
      </v-btn>

      <v-spacer></v-spacer>

      <v-col
        v-if="this.$route.name !== 'Search' && !this.$store.state.is_mobile"
        cols="12"
        sm="6"
        md="4"
      >
        <v-text-field
          v-model="searchInput"
          label="Search here"
          class="mx-auto"
          clearable
          :color="!$vuetify.theme.dark ? '#ddbee8' : '#beb4c2'"
          prepend-icon="mdi-magnify"
          @keydown.enter="searchbar()"
          :class="'darker'"
        ></v-text-field>
      </v-col>

      <v-tooltip bottom nudge-left="20" v-if="this.$store.state.is_mobile">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon :to="'/search'" v-bind="attrs" v-on="on">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
        <span>Search</span>
      </v-tooltip>

      <v-menu bottom min-width="200px" open-on-hover offset-y right offset-x>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-avatar size="48">
              <v-icon>mdi-account</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card class="mx-auto" max-width="275" min-width="260" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div v-if="!this.$store.state.status" class="text-h5 mb-1">
                Not logged in
              </div>
              <div v-else class="text-h5 mb-1">
                {{ this.$store.state.login_displayname }}
              </div>
              <v-list-item-subtitle v-if="!this.$store.state.status"
                >Status: Offline
              </v-list-item-subtitle>
              <v-list-item-subtitle v-else
                >Status: Online
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar size="60" color="grey">
              <v-icon dark> mdi-account </v-icon>
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions justify="space-around">
            <v-btn
              v-if="!this.$store.state.status"
              :color="!$vuetify.theme.dark ? '#2a0094' : '#fdf7ff'"
              text
              :to="{ name: 'Login' }"
            >
              Log in
            </v-btn>
            <v-btn v-else text @click="logout"> Logout </v-btn>
            <v-btn
              v-if="this.$store.state.status"
              text
              :to="{ name: 'ChangeInformation' }"
            >
              Edit Account</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-menu>

      <v-tooltip bottom nudge-left="20">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon @click="switchTheme" v-bind="attrs" v-on="on">
            <v-icon>mdi-brightness-4</v-icon>
          </v-btn>
        </template>
        <span>Light / Dark Mode</span>
      </v-tooltip>
    </v-app-bar>

    <br /><br /><br />

    <v-navigation-drawer v-model="drawer" fixed>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-avatar size="40">
              <v-img :src="require('./assets/icc_logo_border.png')" contain />
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>IC Courses</v-list-item-title>
          </v-list-item-content>

          <v-btn icon @click.stop="drawer = !drawer">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group color="#9f7cf7">
          <v-list-item v-for="item in items" :key="item.title" :to="item.link">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="this.$store.state.is_mod" :to="'/modzone/main'">
            <v-list-item-icon>
              <v-icon v-text="'mdi-account-hard-hat'"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="'Moderator zone'"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view />
      <Loading />
    </v-main>

    <v-btn
      v-scroll="onScroll"
      v-show="scrolled"
      fab
      dark
      fixed
      bottom
      right
      color="purple darken-3"
      @click="toTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
import Vue from "vue";
import router from "./router";
import Loading from "./components/LoadingPage";

export default {
  name: "App",

  components: {
    Loading,
  },

  data: () => ({
    drawer: false,
    items: [
      { title: "Forum", icon: "mdi-view-dashboard", link: "/" },
      { title: "Search", icon: "mdi-magnify", link: "/search" },
      { title: "FAQs", icon: "mdi-forum", link: "/faq" },
      { title: "Help", icon: "mdi-help-circle-outline", link: "/help" },
    ],
    searchInput: "",
    scrolled: false,
  }),

  created() {
    document.title = "IC Courses";
  },

  mounted() {
    const theme = localStorage.getItem("is_dark_mode");
    if (theme) {
      this.$vuetify.theme.dark = theme === "true";
    }
  },

  methods: {
    searchbar() {
      console.warn(this.searchInput);
      this.$router.push("/search/" + this.searchInput + "?filter=title");
      this.searchInput = "";
    },
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.scrolled = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
    async logout() {
      let result = await Vue.axios.get("/api/logout");
      if (result.data.status) {
        await this.$store.dispatch("resetinfo");
        await router.push({ name: "Home" });
      }
    },
    switchTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("is_dark_mode", this.$vuetify.theme.dark.toString());
    },
  },
};
</script>

<style src="./css/Login.css"></style>
