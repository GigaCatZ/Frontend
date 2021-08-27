<style>
/* can be taken out if we dont want to use embedded fonts */
@import url("https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;600&display=swap");

h1.faq {
  font-size: 40px;
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
      <br />
      <!-- FAQ by mods -->
      <v-card class="mx-auto" outlined>
        <br />
        <v-row class="mx-4">
          <v-col>
            <h1 class="faq">
              Help
              <!-- <span class="smaller">by moderators and Ajarns</span> -->
            </h1>
            <v-divider></v-divider>

            <!-- question 1 -->
            <v-row>
              <v-col>
                <br />
                <h2 class="faq">How to create threads?</h2>
                <p class="faq">
                  By going to the front page and clicking the 'Create a thread'
                  button. You will be redirected to the create page where you
                  will be able to create threads. Note that you will be required
                  to login before being able to create a thread.
                </p>
                <p class="faq2">
                  *Note that you will be required to login into the website
                  before being able to create a thread*
                </p>
              </v-col>
            </v-row>

            <!-- question 2 -->
            <v-row>
              <v-col>
                <h2 class="faq">Where do we register for our classes?</h2>
                <p class="faq">
                  For Trimester 1 of Academic Year 2021-2022, course
                  registration, tuition payment, and add/drop will take place on
                  <a
                    href="http://sky.muic.mahidol.ac.th/?data%5Btype%5D%5B%5D=login"
                    target="_blank"
                    >SKY
                  </a>
                  However, we will soon be switching over to SKY+ in Trimester
                  2.
                </p>
              </v-col>
            </v-row>

            <!-- question 3 -->
            <v-row>
              <v-col>
                <h2 class="faq">
                  How can I get more information about courses or contact the
                  Ajarns?
                </h2>
                <p class="faq">
                  Please be sure to join the official MUIC Computer Science
                  Discord server to stay up to date with class information
                  and/or contact your Ajarns. You can do so by clicking
                  <a href="https://youtu.be/dQw4w9WgXcQ" target="_blank">here</a
                  >.
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
