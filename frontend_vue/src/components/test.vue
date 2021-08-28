<template>
  <div class="vue-app">
    <root v-bind:folder="root"></root>
  </div>
</template>

<script>
import Root from "./comment/Root.vue";

export default {
  name: "app",
  data: function () {
    return {
      root: {
        text: "Root Folder",
        leaf: false,
        expanded: true,
        children: [
          {
            text: "Sub Folder 1",
            leaf: false,
            expanded: false,
            children: [
              {
                text: "Sub Sub Folder 1",
                leaf: false,
                expanded: false,
                children: [
                  {
                    text: "SomeFile1.js",
                    leaf: true,
                  },
                ],
              },
              {
                text: "Sub Sub Folder 2",
                leaf: false,
                expanded: false,
                children: [],
              },
              {
                text: "SomeFile.txt",
                leaf: true,
              },
            ],
          },
        ],
      },
    };
  },
  components: {
    Root,
  },
};
</script>
