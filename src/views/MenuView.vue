<template>
  <v-container class="pa-3 ma-3">
    <Menu />
  </v-container>
</template>

<script>
import Menu from "../components/Menu";

export default {
  components: {
    Menu
  },
  //when data is loaded, dark theme is used
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>
