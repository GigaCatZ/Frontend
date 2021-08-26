<style scoped>
hr.title-solid {
  border-top: 2px solid #909090;
}
span.smaller {
  font-size: 75%;
  font-weight: normal;
}
</style>

<template v-model="$vuetify.theme.dark">
  <v-container>
    <!-- FAQ by mods -->
    <div class="text-left">
      <h1 class="font-weight-bold">
        Frequently Asked Questions
        <span class="smaller">by moderators and Ajarns</span>
      </h1>
      <hr class="title-solid" />
      <!-- question 1 -->
      <br />
      <h2 class="font-weight-bold">
        Can class X be open in the upcoming trimester?
      </h2>
      <p>
        Depends. MUIC requires that a course has 7 people for a section to be
        opened. If the course has low demand (i.e. Computer Architecture), you'd
        need to have at least 6 other people interested in taking the class.
      </p>
      <p>
        Also, there are some difficulties (good ones, according to Aj.Kritya) in
        many faculty member's schedules. So, it could be quite difficult to have
        an Ajarn teach multiple courses in a single trimester due to their other
        commitments.
      </p>
      <br />

      <div>
        <h2>Where do we register for our classes?</h2>
        <p>
          For Trimester 1 of Academic Year 2021-2022, course registration,
          tuition payment, and add/drop will take place on
          <a
            href="http://sky.muic.mahidol.ac.th/?data%5Btype%5D%5B%5D=login"
            target="_blank"
            >SKY
          </a>
          However, we will soon be switching over to SKY+ in Trimester 2.
        </p>
      </div>
    </div>

    <!-- FAQ by dupes -->
    <br />
    <div class="text-left">
      <h1 class="font-weight-bold">
        Frequently Asked Questions
        <span class="smaller"> by number of duplicates </span>
      </h1>
      <hr class="title-solid" />
    </div>
  </v-container>
</template>

<script>
export default {
  name: "FAQ",
};
</script>
