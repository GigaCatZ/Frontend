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
              Frequently Asked Questions
              <span class="smaller"> by moderators and Ajarns</span>
            </h1>
            <v-divider></v-divider>

            <br />

            <!-- Where the actual questions are -->
            <v-row v-for="(q, index) in ajarnQ" :key="q.question" class="mx-2">
              <v-col>
                <h2 class="faq">
                  {{ q.question }}
                  <span class="smaller">{{ q.body }}</span>
                </h2>
                <p v-for="ans in q.answer" :key="ans" class="faq">
                  {{ ans }}
                </p>
                <v-divider v-if="index != ajarnQ.length - 1"></v-divider>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <br />
      </v-card>

      <br />
      <br />

      <!-- FAQ by dupes -->
      <v-card class="mx-auto" outlined>
        <br />
        <v-row class="mx-4">
          <v-col>
            <h1 class="faq">
              Frequently Asked Questions
              <span class="smaller"> by number of duplicates </span>
            </h1>
            <v-divider></v-divider>

            <br />

            <!-- Actual questions -->
            <v-row
              v-for="(question, index) in topQ"
              :key="question.title"
              class="mx-2"
            >
              <v-col>
                <h2 class="faq">
                  {{ question.title }}
                </h2>
                <p class="faq">
                  {{ question.body }}
                </p>
                <h3 class="faq">Answer</h3>
                <p class="faq">
                  {{ question.answer }}
                </p>
                <v-divider v-if="index != topQ.length - 1"></v-divider>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <br />
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(VueAxios, axios);

export default {
  name: "FAQ",
  data() {
    return {
      ajarnQ: [
        {
          question: "Can class X be opened in the upcoming trimester?",
          answer: [
            "Depends. MUIC requires that a course has 7 people for a section to be opened. If the course has low demand (i.e. Computer Architecture), you'd need to have at least 6 other people interested in taking the class.",
            "Also, there are some difficulties (good ones, according to Aj.Kritya) in many faculty member's schedules. So, it could be quite difficult to have an Ajarn teach multiple courses in a single trimester due to their other commitments.",
          ],
        },
        {
          question: "Where do we register for our classes?",
          answer: [
            "For Trimester 1 of Academic Year 2021-2022, course registration and tuition payment will take place on SKY. However, we will soon be switching over to SKY+ in Trimester 2.",
          ],
        },
        {
          question:
            "How can I get more information about courses or contact the Ajarns?",
          answer: [
            "Please be sure to join the official MUIC Computer Science Discord server to stay up to date with class information and/or contact your Ajarns.",
          ],
        },
      ],
      topQ: [],
    };
  },

  created() {
    this.getTopQ();
  },

  methods: {
    async getTopQ() {
      let result = await Vue.axios.get("/api/faq");
      this.topQ = result.data.response;
      console.log(result.response);
    },
  },
};
</script>

<style src="../css/FAQ.css"></style>
