<template>
  <v-container class="pa-3 ma-3">
    <StepView />
  </v-container>
</template>

<script>
import StepView from "../components/StepView";

export default {
  components: {
    StepView
  },
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>
