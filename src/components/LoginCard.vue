<template>
  <v-card class="elevation-12">
    <v-toolbar color="primary" dark flat>
      <v-toolbar-title>Log In</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="email"
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
      pass: "123456",
      email: "admin",
      role: "",
    };
  },

  methods: {
    submit() {
      let enc = "Basic " + btoa(this.email + ":" + this.pass);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", enc);
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      fetch("http://localhost:8080/menu/all", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          //console.log("after signin: " + result);
          this.$store.commit("addItems", JSON.parse(result));
          this.showop()
          router.push("/home")
        })
        .then(this.findUserRole())
        .catch((error) => {
          console.log("error", error);
        });
    },

    showop() {
      //DISPLAY CUST
      const urlall = "http://localhost:8080/option/all";
      fetch(urlall, {
        //headers: {
        //},
      })
        .then((response) => response.text())
        .then((result) => {
          //console.log("ops: " + result);
          this.$store.commit("addOptions", JSON.parse(result));
          this.ops = this.$store.state.ops;
        })
        .catch((err) => console.log(err));
    },

    findUserRole() {
      const urlLogin =
        "http://localhost:8080/role?username=" +
        this.email +
        "&password=" +
        this.pass; // site that doesn’t send Access-Control-*
      fetch(urlLogin, {
        headers: {},
        //body: body,
      })
        .then((response) => response.text())
        .then((result) => {
          this.handleRole(result)
        })
        .catch((error) => console.log("error", error));
    },

    handleRole(role) {
      
      const slice = role.indexOf(',')
      const r = role.substring(0,slice)
      const n = role.substring(slice+1)
      console.log("role: ",r)
      console.log("id: ",n)
      if(role == "anon") {
      if(confirm("Bad Credentials. Try Again?")){
          this.clear()
      } else(router.push("/home"))
      }
      this.$store.commit('handleRole', r)
      this.$store.commit('handleId', n)
  },

  clear(){
    this.pass = ''
    this.email = ''
  },

  signup() {
    router.push("/signup")
  }

  },
  
  
};
</script>
