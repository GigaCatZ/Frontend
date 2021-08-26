<template>
  <v-app>
    <v-app-bar
      absolute
      app
      height="80"
      dense
      color="#9575CD"
      dark
      fade-img-on-scroll
      :src="require('./assets/MUIC_building.jpg')"
    >
      <!-- Fade color -->
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <div class="d-flex align-center">
        <v-row align="center" justify="space-around">
          <v-btn plain :to="{ name: 'Home' }">
            <h1>IC Courses</h1>
          </v-btn>
        </v-row>
      </div>

      <v-spacer></v-spacer>

      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="searchInput"
          label="Search here"
          class="mx-auto"
          clearable
          prepend-icon="mdi-magnify"
        ></v-text-field>
      </v-col>

      <v-menu bottom min-width="200px" open-on-hover offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-avatar size="48">
              <v-icon>mdi-account</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="text-h5 mb-1">USERNAME</div>
              <v-list-item-subtitle>Status: Offline</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar size="60" color="grey">
              <v-icon dark> mdi-account </v-icon>
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions justify="space-around">
            <v-btn text :to="{ name: 'Login' }"> Log in </v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute app>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-avatar color="#2a0094" size="40">
              <span class="white--text text-h5">IC</span>
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>IC Courses</v-list-item-title>
          </v-list-item-content>
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
        </v-list-item-group>
      </v-list>

      <v-footer>
        <v-switch
          v-model="$vuetify.theme.dark"
          style="color: white"
          label="Dark Mode"
          persistent-hint
        ></v-switch>
      </v-footer>
    </v-navigation-drawer>

    <v-main>
      <router-view />
    </v-main>

    <v-btn
      v-scroll="onScroll"
      v-show="scrolled"
      fab
      dark
      fixed
      bottom
      right
      color="#2a0094"
      @click="toTop"
    >
      <v-icon>mdi-chevron-up</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: false,
    items: [
      { title: "Forum", icon: "mdi-view-dashboard", link: "/" },
      { title: "FAQs", icon: "mdi-forum", link: "/faq" },
      { title: "Help", icon: "mdi-help-circle-outline", link: "/help" },
    ],
    searchInput: "",
    scrolled: false,
  }),

  created() {
    document.title = "IC Courses";
  },

  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.scrolled = top > 20;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
};
</script>
