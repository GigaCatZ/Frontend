<template>
  <v-card-text style="white-space: pre-wrap; font-weight: 300" class="text-h6 ml-1 mb-0 pb-0">
    <Editor mode="viewer" v-model="thread_body" />
  </v-card-text>
</template>

<script>
import { Editor } from "vuetify-markdown-editor";
import "vuetify-markdown-editor/dist/vuetify-markdown-editor.css";
export default {
  name: "ThreadBody",
  components: { Editor },
  props: [ "thread_body" ],
};
</script>

<style scoped></style>
