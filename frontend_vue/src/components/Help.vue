<template v-model="$vuetify.theme.dark">
  <div>
    <v-container>
      <!-- FAQ by mods -->
      <v-card class="mx-auto my-10" outlined>
        <v-row class="mx-4 my-4">
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
            <v-divider class="my-5"></v-divider>

            <!-- question 1 -->
            <v-row class="mx-2">
              <v-col>
                <h2 class="faq">How to create threads?</h2>
                <p :class="!$vuetify.theme.dark ? 'faq' : 'faqDark'">
                  By going to the forum page and clicking the 'Create A New
                  Thread' button that has a + sign. You will be redirected to
                  the create page where you will be able to create threads.
                </p>
                <p :class="!$vuetify.theme.dark ? 'faq2' : 'faq2Dark'">
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
                <p :class="!$vuetify.theme.dark ? 'faq' : 'faqDark'">
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
                  Why can't I like threads in the Forum and Search pages?
                </h2>
                <p :class="!$vuetify.theme.dark ? 'faq' : 'faqDark'">
                  It was our intention for users to view more details about each
                  thread before being able to like or comment on it. You may
                  click on 'Continue the Thread' to view the body and other
                  user's comments before deciding whether to like it.
                </p>
                <p :class="!$vuetify.theme.dark ? 'faq2' : 'faq2Dark'">
                  *Note that you are required to log in before you can like or
                  comment*
                </p>
                <v-divider></v-divider>
              </v-col>
            </v-row>

            <!-- question 4 -->
            <v-row class="mx-2">
              <v-col>
                <h2 class="faq">How do we contact the IC Courses Team?</h2>
                <p :class="!$vuetify.theme.dark ? 'faq' : 'faqDark'">
                  You may ping @ICCOURSES-TEAM in the
                  <b>#iccourses-help</b> text channel in MUIC CS Discord server.
                </p>
                <v-divider></v-divider>
              </v-col>
            </v-row>

            <!-- question 5 -->
            <v-row class="mx-2">
              <v-col>
                <h2 class="faq">
                  Can this web application add [insert feature here]?
                </h2>
                <p :class="!$vuetify.theme.dark ? 'faq' : 'faqDark'">
                  The main developers of this web application have just become
                  second and third year MUIC CS students this term. This web
                  application was developed with no budget and was done within
                  three weeks, so the free time of our team along with the
                  complexity of the new feature wlll need to be taken into
                  consideration before we decide to add it.
                </p>
                <p :class="!$vuetify.theme.dark ? 'faq2' : 'faq2Dark'">
                  *However, if you are willing to donate to us, it will be our
                  honor to listen to your request.*
                </p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<style src="../css/Help.css"></style>
