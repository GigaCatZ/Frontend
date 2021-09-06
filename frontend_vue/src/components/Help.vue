<template v-model="$vuetify.theme.dark">
  <div>
    <v-container>
      <br />
      <!-- FAQ by mods -->
      <v-card class="mx-auto" outlined>
        <br />
        <v-row class="mx-4">
          <v-col>
            <h1 class="faq">
              Help
              <v-icon
                size="38"
                :color="!$vuetify.theme.dark ? 'black' : 'white'"
                >mdi-help-circle</v-icon
              >
              <!-- <span class="smaller">by moderators and Ajarns</span> -->
            </h1>
            <v-divider></v-divider>

            <!-- question 1 -->
            <v-row class="mx-2">
              <v-col>
                <br />
                <h2 class="faq">How to create threads?</h2>
                <p class="faq">
                  By going to the forum page and clicking the 'Create A New
                  Thread' button that has a + sign. You will be redirected to
                  the create page where you will be able to create threads.
                </p>
                <p class="faq2">
                  *Note that you are required to log in before being able to
                  create a thread*
                </p>
                <v-divider></v-divider>
              </v-col>
            </v-row>

            <!-- question 2 -->
            <v-row class="mx-2">
              <v-col>
                <h2 class="faq">I am not receiving any emails.</h2>
                <p class="faq">
                  Emails sent from us might take a few minutes to be delivered.
                  If you still haven't received any emails, please check your
                  spam folder.
                </p>
                <v-divider></v-divider>
              </v-col>
            </v-row>

            <!-- question 3 -->
            <v-row class="mx-2">
              <v-col>
                <h2 class="faq">
                  Why can't I like threads in Home and Search pages?
                </h2>
                <p class="faq">
                  It was our intention for users to view more details about each
                  thread before being able to like or comment on it. You may
                  click on 'Continue the Thread' to view the body and other
                  user's comments before deciding whether to like it.
                </p>
                <p class="faq2">
                  *Note that you are required to log in before you can like or
                  comment*
                </p>
                <v-divider></v-divider>
              </v-col>
            </v-row>

            <v-row class="mx-2">
              <v-col>
                <h2 class="faq">How do we contact the IC Courses Team?</h2>
                <p class="faq">
                  You may ping @ICCOURSES-TEAM in the
                  <b>#iccourses-help</b> text channel in MUIC CS Discord server.
                </p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <br />
      </v-card>

      <br />
      <br />
    </v-container>
  </div>
</template>

<style src="../css/Help.css"></style>
