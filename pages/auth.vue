<template lang="html">
  <div id="firebaseui-auth-container">
  <v-layout column >
        
      <v-flex xs4 offset-xs4 v-if="this.user.email == null">
      <v-text-field id="email" placeholder='Email'/>
      <v-text-field id="password" placeholder='Password'/>
      <v-btn  @click.native="handleSignUp">Create Account</v-btn>
      <span> OR </span>
      <v-btn  @click.native="login">Login</v-btn>
      </v-flex>
      <v-flex xs2 offset-xs5 v-else>
      <v-btn  @click.native="signOut">Logout</v-btn>
      </v-flex>
      </v-layout>
  </div>

</template>
<script>
 import Vue from 'vue'
  import firebase from "firebase";
  import VueFire from 'vuefire';
  import {config} from '../plugins/firebase'
  Vue.use(VueFire)
  //If there is no firebase instance running, initialize the app
if (!firebase.apps.length) {
   firebase.initializeApp(config)
}

var db = firebase.database().ref('users/')
  //const messagesRef = db.ref('messages')
  export default {
    data: () => ({
        newMessage: '',
         user: {
             email: '',
             key: ''
         }
    }),
    firebase: {
        persons: db
    },
    beforeCreate(){
        firebase.auth().onAuthStateChanged(function(user) {
            if (user){
                this.user = {
                    email: user.email,
                    key: user.uid
                }
            }
            else {
            console.log("No user found")
            firebase.auth().signInAnonymously().catch(console.error)
            this.user = null
            }
        }.bind(this))
    },
    methods: {
            handleSignUp: function() {
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            if (email.length < 4) {
                alert('Please enter an email address.');
                return;
            }
            if (password.length < 4) {
                alert('Please enter a password.');
                return;
            }
            // Sign in with email and pass.
            // [START createwithemail]
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
                } else {
                alert(errorMessage);
                }
                console.log(error);
                // [END_EXCLUDE]
            });
            // [END createwithemail]
            email = ''
            password = ''
            },
            login: function () {
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode == 'auth/invalid-email') {
                alert('Invalid Email');
                } else {
                alert(errorMessage);
                }
            })
            .then(console.log("Redirect here or some shit")
            )
            },
            signOut: function() {
                console.log("signoutFunction")
                firebase.auth().signOut()
                .then((user)=>{
                     this.user.email = firebase.auth().currentUser;
                    console.log(this.user)
                    console.log("signOutThen")
                }    
                )
            },
        addMessage: function(){
            if (this.newMessage.trim()) {
            db.push({
            message: this.newMessage
          })
          this.newMessage = ''
        }
    }
    }
  }
</script>