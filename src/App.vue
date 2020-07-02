<template>
  <v-app id="inspire">
    <v-navigation-drawer
    color="blue-grey darken-1"
      v-if="this.$route.name != 'Login'"
      v-model="drawer"
      app
      clipped
    > 
      <v-list dense>
        <v-list-item
          link
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-item-action>
            <v-icon class="white--text">
              {{ link.icon }}
            </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      color="blue-grey lighten-1"
      v-if="this.$route.name != 'Login'"
      app
      clipped-left
      clipped-right
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> 
      <v-toolbar-title>
        <span>Cafe</span>
        <span class="font-weight-light"> Googoo</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn @click="logout">
        logout
        <v-icon> mdi-logout </v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view> </router-view>
    </v-content>

    <v-footer app color="blue-grey darken-3">
      <span class="text--darken-2 white--text"
        >&copy; Cafe Googoo 2020</span
      >
    </v-footer>
  </v-app>
</template>

<script>
// import Login from "@/components/Login";
import router from "/Users/mhegde/Documents/Summer2020/VueProjects/cafegoogoo/src/router";
export default {
  // components: {
  //   Login,
  // },
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
    links: [
      { icon: "home", text: "Cafe Googoo", route: "/home" },
      //{ icon: "mdi-account", text: "Sign Up", route: "/signup" },
      //{ icon: "mdi-login", text: "Log In", route: "/login" },
      { icon: "mdi-food-fork-drink", text: "Menu", route: "/menu" },
      { icon: "mdi-book-open", text: "Order", route: "/order" },
      { icon: "mdi-card-account-mail", text: "Contact Googoo", route: "/contact" },
    ],
  }),
  created() {
    this.$vuetify.theme.dark = true;
  },
  methods: {
    logout() {
    this.$store.state.items = [],
    this.$store.state.ops= [],
    this.$store.state.role= '',
    this.$store.state.canOrder= false,
    this.$store.state.canEdit= false,
    this.$store.state.id= '',
    this.$store.state.orderId= '',
    this.$store.state.orderSuccess= 'false'
    router.push('/')
    }
  }
};
</script>