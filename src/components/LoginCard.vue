<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Log In</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="username"
          label="Username"
          prepend-icon="person"
          type="text"
        ></v-text-field>

        <v-text-field
          v-model="pass"
          id="password"
          label="Password"
          prepend-icon="lock"
          type="password"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn v-on:click="signup" color="primary">
        <v-icon left>mdi-lead-pencil</v-icon>Sign Up
      </v-btn>
      <v-btn v-on:click="submit" color="primary">
        <v-icon left>mdi-check</v-icon>Sign In
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import router from "/Users/mhegde/Documents/Summer2020/VueProjects/cafegoogoo/src/router";
export default {
  data() {
    return {
      pass: "",
      username: "",
      role: "",
    };
  },

  methods: {

    //submits form with get method to check authoorization for user
    submit() {
      //headers sent to backend 
      let enc = "Basic " + btoa(this.username + ":" + this.pass);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", enc);
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      //fetch method to backend auth
      fetch("http://localhost:8080/menu/all", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          //if authorized, loads menu items into stored value
          this.$store.commit("addItems", JSON.parse(result));
          //calls for menu options to be loaded/stored, pushes user to home page
          this.loadOptions()
          router.push("/home")
        })
        //call to determine the role of the user
        .then(this.findUserRole())
        .catch((error) => {
          console.log("error", error);
        });
    },

    //loads menu options and submits to store
    loadOptions() {
      const urlall = "http://localhost:8080/option/all";
      //fetch method to load menu options
      fetch(urlall, {
      })
        .then((response) => response.text())
        .then((result) => {
          //commit menu options to store
          this.$store.commit("addOptions", JSON.parse(result));
          this.ops = this.$store.state.ops;
        })
        .catch((err) => console.log(err));
    },

    //determines user role
    findUserRole() {
      //url header
      const urlLogin =
        "http://localhost:8080/role?username=" +
        this.username +
        "&password=" +
        this.pass; 
      //fetch method to get user role
      fetch(urlLogin, {
        headers: {},
      })
        .then((response) => response.text())
        .then((result) => {
          //calls method to handle the role which is returned
          this.handleRole(result)
        })
        .catch((error) => console.log("error", error));
    },

    //handles and stores user role and id
    handleRole(role) {
      //determines the role (r) and userId of the user
      const slice = role.indexOf(',')
      const r = role.substring(0,slice)
      const userId = role.substring(slice+1)
      console.log("role: ",r)
      console.log("id: ",userId)
      //if the user does not exist, 'bad credentials' is displayed
      if(role == "anon") {
      if(confirm("Bad Credentials. Try Again?")){
          this.clear()
      } else(this.clear())
      }
      //commits the role and userId to the store
      this.$store.commit('handleRole', r)
      this.$store.commit('handleId', userId)
  },

  //clears the sign in form
  clear(){
    this.pass = ''
    this.username = ''
  },

  //pushes user to the signup page
  signup() {
    router.push("/signup")
  }

  },
  
  
};
</script>
