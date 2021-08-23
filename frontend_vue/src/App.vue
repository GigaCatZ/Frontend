<template>
  <v-app>
    <v-app-bar
      absolute
      app
      height="100"
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

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <div class="d-flex align-center">
        <v-img
          alt="MUIC Logo"
          class="shrink mx-auto"
          contain
          :src="require('./assets/MUIC_logo.png')"
          transition="scale-transition"
          max-height="200"
          max-width="200"
        />
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

      <v-btn icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer fixed app>
      <v-switch
        v-model="$vuetify.theme.dark"
        style="color: white"
        label="Dark Mode"
        persistent-hint
      ></v-switch>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    items: ["Tab 1", "Tab 2", "Tab 3", "Tab 4", "Tab 5"],
    searchInput: "",
  }),
};
</script>
