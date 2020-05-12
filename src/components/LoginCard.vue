<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Login</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field label="Email" name="email" prepend-icon="person" type="text"></v-text-field>

        <v-text-field
          id="password"
          label="Password"
          name="password"
          prepend-icon="lock"
          type="password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn v-on:click="loginButtonPressed" color="primary">
        <v-icon left>mdi-check</v-icon>Sign In
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import router from "../router";
export default {
  data() {
    return {
      user: "",
      pass: ""
    };
  },
  methods: {
    performLogin: function() {
      let user = this.user;
      let pass = this.pass;
      //TODO: Auth a user
      if (user && pass) {
        return true;
      } else {
        return false;
      }
    },
    loginButtonPressed: function() {
      if (this.performLogin) {
        router.push("home");
      }
    }
  }
};
</script>
