<template>
  <v-container class="pa-3 ma-3">
    <h1 class="display-2 text-center" justify="center">Contact Googoo</h1>
    <Contact />
  </v-container>
</template>

<script>
import Contact from "../components/Contact";

export default {
  components: {
    Contact
  },
  //when data is loaded, dark theme is used
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>