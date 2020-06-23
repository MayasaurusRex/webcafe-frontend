<template>
  <v-container class="pa-3 ma-3">
    <h1 class="display-2 text-center" justify="center">Welcome to Cafe Googoo!</h1>
      <div class="img-container">
          <img justify="center" class="center" :src="require('../assets/smolgoogoo.png')" aspect-ratio="3" />
      </div>
  <Welcome />
  </v-container>
</template>

<script>
import Welcome from "../components/Welcome";

export default {
  components: {
    Welcome
  },
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>

<style>
.img-container {
        text-align: center;
      }
</style>
