<template>
  <v-container class="pa-3 ma-3">
    <h1 class="display-2 text-center" justify="center">Your Order</h1>
    <Order />
  </v-container>
</template>

<script>
import Order from "../components/Order";

export default {
  components: {
    Order
  },
  //when data is loaded, dark theme is used
  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>