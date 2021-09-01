<template v-model="$vuetify.theme.dark">
  <v-container>
    <br />
    <v-card class="mx-auto mb-2">
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="mb-1">
            <h1 class="font-text">Change Information</h1>
          </v-list-item-title>
          <p />
          <v-divider class="divider"></v-divider>
          <br />
          <v-list-item-subtitle
            >Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle
          >
        </v-list-item-content>
        <v-list-item-avatar size="60" color="grey" class="justify-center">
          <v-icon dark> mdi-account </v-icon>
        </v-list-item-avatar>
      </v-list-item>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "ChangePassword",
  data: () => ({
    test: true,
  }),
  methods: {},
};
</script>

<style src="src/css/ChangeInformation.css"></style>
