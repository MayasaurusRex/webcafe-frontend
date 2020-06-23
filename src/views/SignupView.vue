<!-- <template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col justify = "center" , class = "center">
            <Signup/>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template> -->

<template>
  <v-container class="pa-3 ma-3">
    <h1 class="display-2 text-center" justify="center">Sign Up</h1>
    <Signup />
  </v-container>
</template>


<script>
import Signup from "../components/Signup";
export default {
  components: {
    Signup
  }
};
</script> 

