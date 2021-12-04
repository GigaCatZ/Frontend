<template>
  <v-container>
    <v-card-title class="text-h4 pt-0" v-text="thread_title"></v-card-title>
    <v-card-text>
      <v-chip
        v-for="tag in thread_tags"
        :key="tag.title"
        v-text="tag"
        small
        class="ma-1"
        color="rgba(103, 58, 183,.28)"
        @click="search(tag)"
      ></v-chip>
    </v-card-text>
    <v-card-text
      style="white-space: pre-wrap; font-weight: 300"
      class="text-h6 ml-1 mb-0 pb-0"
    >
      <Editor mode="viewer" v-model="thread_body" />
    </v-card-text>
  </v-container>
</template>

<script>
import { Editor } from "vuetify-markdown-editor";
import "vuetify-markdown-editor/dist/vuetify-markdown-editor.css";
export default {
  name: "ThreadContent",
  components: { Editor },
  props: ["thread_body", "thread_tags", "thread_title"],
};
</script>

<style scoped></style>
