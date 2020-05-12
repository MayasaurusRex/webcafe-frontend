<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="7" md="5" lg="4" xl="3">
            <LoginCard />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import LoginCard from "../components/LoginCard";
export default {
  components: {
    LoginCard,
  },
  props: {
    source: String,
  },
};
</script>
