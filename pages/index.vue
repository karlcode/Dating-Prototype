<template>
  <v-layout column >
    <v-flex xs10 offset-xs1 text-xs-center>
      
      <div class="main_container">
      <h2>Find your next Sugar Daddy</h2>
  
      <v-btn primary round router nuxt to="/inspire">See all the Dads</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>

  import firebase from 'firebase'
  import {config} from '../plugins/firebase'
  export default {
    created: () => {

      firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.$nuxt.$router.push('/success')
      } else {
        this.$nuxt.$router.push('/auth')
      }
     });
    }
  }
</script>
<style scoped>
.main_container{
  padding-top: 200px;
}
</style>

