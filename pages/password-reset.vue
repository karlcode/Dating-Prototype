<template>
  <v-layout column >
    <v-flex xs12 text-xs-center>
      
      <div class="main_container">
      <h2>Reset Your Password Here</h2>
        <input v-model="emailInput"  placeholder="Email" />
      <v-btn primary round @click.native="passwordReset" >Send Password Reset Email</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  import firebase from "firebase";
  import {config} from '../plugins/firebase'

if (!firebase.apps.length) {
   firebase.initializeApp(config)
}
  export default {
    data(){
        return{
            emailInput: ''
        }
    },
    methods: {
        passwordReset: function(){
            firebase.auth().sendPasswordResetEmail(this.emailInput).then(function(){
                alert("Reset email sent")
            })
            .catch(function(error){
                alert('Error Code: ' +  error.code + '\n' +  error.message)
            })
        }
    }
    
  }
</script>