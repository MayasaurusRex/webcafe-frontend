<template>
  <div>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="username"
              :rules="nameRules"
              :counter="50"
              label="Username"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="password"
              type="password"
              :rules="passRules"
              label="Password"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="phone"
              :rules="phoneRules"
              :counter="10"
              label="Phone #"
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <div class="text-xs-center">
          <v-btn class="mr-4" @click="clear">clear</v-btn>
          <v-btn class="mr-4" @click="addCust">submit</v-btn>
          <div v-if="visible">
            <v-btn class="mr-4" @click="show">show cust</v-btn>
          </div>
        </div>
      </v-container>
    </v-form>

    <div v-if="visible">
      <v-card>
        <v-card-title>
          Customers
          <v-spacer></v-spacer>
        </v-card-title>
        <v-data-table :headers="headers" :items="users"></v-data-table>
      </v-card>
    </div>
  </div>
</template>

<script>
import router from "../router";
export default {
  name: "Signup",
  
  //when page is loaded, role is designated
  created() {
    this.visible = this.$store.state.role == "ROLE_ADMIN"
  },

  //data to be returned/used
  data() {
    return {
      valid: false,
      username: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 50 || "Name must be less than 50 characters",
      ],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      phone: "",
      phoneRules: [
        (v) => !!v || "Phone is required",
        (v) => v.length == 10 || "Phone must be exactly 10 digits",
      ],
      password: "",
      passRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 5 || "Passord must be grater than 5 characters",
      ],
      users: [],
      visible: false,
      headers: [
        {
          text: "Username",
          align: "start",
          sortable: true,
          value: "username",
        },
        { text: "Email", value: "email" },
        { text: "Phone", value: "phone" },
        { text: "Password", value: "password" },
        { text: "Role", value: "role" },
      ],
    };
  },

  methods: {

    //add customer to database
    addCust() {
      if (this.$data.valid) {
        const urladd = "http://localhost:8080/users/add"; // site that doesn’t send Access-Control-*
        const data = new URLSearchParams();
        //add customer params to body data
        data.append("username", this.username);
        data.append("password", this.password);
        data.append("email", this.email);
        data.append("phone", this.phone);
        //fetch post method to add customer
        fetch(urladd, {
          method: "post",
          body: data,
        })
          .then((response) => {
            console.log(response);
            //push customer to login screen
            router.push("/")
          })
          .catch(() =>
            console.log(
              "Can’t access " + urladd + " response. Blocked by browser?"
            )
          );
      }
    },

    //get customers from database to display
    show() {
      //DISPLAY CUST
      const urlall = "http://localhost:8080/users/all";
      //fetch method to get users
      fetch(urlall, {
        headers: {},
      })
        .then((response) => response.json())
        .then((data) => (this.users = data))
        .catch((err) => console.log(err));
    },

    //clears the form
    clear() {
      this.username = "";
      this.email = "";
      this.phone = "";
      this.password = "";
    },
  },
};
</script>
