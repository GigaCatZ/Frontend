<style>
/* can be taken out if we dont want to use embedded fonts */
@import url("https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;600&display=swap");

h1.faq {
  font-size: 30px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 600;
}

h2.faq {
  margin-left: 0;
  font-size: 30px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 600;
}

p.faq {
  font-size: 20px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 300;
}

p.faq2 {
  font-size: 15px;
  font-family: "Titillium Web", sans-serif;
  font-weight: 300;
}

span.smaller {
  font-size: 75%;
  font-weight: normal;
}
</style>

<template v-model="$vuetify.theme.dark">
  <div>
    <v-container>
      <!-- FAQ by mods -->
      <v-card class="mx-auto" outlined>
        <br />
        <v-row class="mx-4">
          <v-col>
            <h1 class="faq">Create a post</h1>
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <br />

        <v-row class="mx-4">
          <v-col>
            <v-card>Yes</v-card>
          </v-col>
        </v-row>
        <br />
      </v-card>
    </v-container>
  </div>
</template>

<script></script>
