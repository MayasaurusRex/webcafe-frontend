<template>
  <div>
    <h1></h1>
  <p>
    <ul>
      <div>
        <p></p>
        <p></p>
        <li class="display-1 text-center">Email: {{email}}</li>
        <li class="display-1 text-center">{{msg}}</li>
      </div>
    </ul>
  </p>
  <v-card
    class="elevation-16 mx-auto"
    width="300"
  >
    <v-card-title
      class="headline"
      primary-title
    >
      Rate Cafe Googoo
    </v-card-title>
    <v-card-text>
      If you enjoy Cafe Googoo, please take a few seconds to rate your experience. It really helps! 
      Disclaimer: Googoo is successful with or without your approval.

      <div class="text-center mt-12" >
        <v-rating
          v-model="rating"
          color="yellow darken-3"
          background-color="grey darken-1"
          empty-icon="$ratingFull"
          half-increments
          hover
        ></v-rating>
      </div>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="justify-space-between">
      <v-btn text>No Thanks</v-btn>
      <v-btn
        color="primary"
        text
      >
        Rate Now
      </v-btn>
    </v-card-actions>
  </v-card>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data(){
    return {
      email: 'cafegoogoo@gmail.com',
      msg: 'Get in touch with us!',
      rating: 4.5,
    }
  },
}
</script>
