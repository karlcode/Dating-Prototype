<template lang="html">
  <div id="firebaseui-auth-container">
  <v-layout column >
        
      <v-flex xs4 offset-xs4 v-if="!getUser.email">
      <v-text-field autofocus id="email" placeholder='Email'/>
      <v-text-field id="password" placeholder='Password'/>
      <v-btn round @click.native="handleSignUp">Create Account</v-btn>
      <span> OR </span>
      <v-btn primary round @click.native="login">Login</v-btn>
      <v-btn info round @click.native="loginWithFacebook">Facebook Login</v-btn>
      <v-btn round @click.native="passwordReset">Forgot My Password</v-btn>
      </v-flex>
      <v-flex xs2 offset-xs5 v-else>
      <v-btn error round @click.native="signOut">Logout</v-btn>
      
      </v-flex>
      
      </v-layout>
  </div>

</template>
<script>
 import Vue from 'vue'
  import firebase from "firebase";
  import VueFire from 'vuefire';
  import {config} from '../plugins/firebase'
  import store from '../store';
  Vue.use(VueFire)
  //If there is no firebase instance running, initialize the app
if (!firebase.apps.length) {
   firebase.initializeApp(config)
}

var db = firebase.database().ref('users/')
  //const messagesRef = db.ref('messages')
  export default {
    store,
    firebase: {
        persons: db
    },
    computed: {
        getUser(){
            return store.getters.getUser
        }
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
            .then(function(result){
            firebase.database().ref('user/').child(result.uid).set({
            email: result.email,
            photoURL: result.photoURL,
            displayName: result.displayName,
            })
            })
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
            .then(this.$router.push({path: '/inspire'}))
            },
            loginWithFacebook: function(){
                var provider = new firebase.auth.FacebookAuthProvider();
                firebase.auth().signInWithPopup(provider).then(function(result) {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                console.log(result)
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                // ...
                //Localstorage on login for storing UID
                console.log(user.providerData[0].uid)
                
                firebase.database().ref('user/').child(result.user.uid).set({
                email: result.user.email,
                photoURL: "https://graph.facebook.com/" + user.providerData[0].uid + "/picture?height=500",
                displayName: result.user.displayName,
                })
                }).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                
                var errorMessage = error.message;
                
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                if(errorCode){
                    alert(errorMessage)
                }
                })
            },
            passwordReset: function(){
               this.$router.push('/password-reset')
            },
            signOut() {
                store.dispatch('logoutUser')
            }
    }
  }
</script>