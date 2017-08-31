<template>

<v-layout column >
<!--<span>{{initName}}</span>
      <form id="form" v-on:submit.prevent="initName">
      <input type="text" v-model.lazy="initName" placeholder="Your name">
      <input type="submit" value="Create Profile">
      </form>
      <li v-for="user in users" class="user" :key="user['.key']">
      <span>{{user.name}}</span>
      </li>
      <form id="form" v-on:submit.prevent="addUser">
      <input type="text" v-model="newUser.name" placeholder="Message">
      <input type="submit" value="Add Message">
      </form>-->
      

      <div>
      <li v-for="person in persons" class="user" :key="person['.key']">
      <span>{{person.message}} -- {{person}}</span>
        </li>
        </div>
        
      <input v-model="newMessage" @keyup.enter="addMessage" placeholder="Add message" />
    
      <v-text-field id="email" placeholder='Email'/>
      <v-text-field id="password" placeholder='Password'/>
      <v-btn @click="handleSignUp">Create Account</v-btn>
      <div v-if="this.user !== ''">
      <p><strong>{{user}}</strong></p>
      </div>
</v-layout>

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
                console.log(this.user)
            
            }
            else {
            firebase.auth().signInAnonymously().catch(console.error)
            this.user = null
        }
        }.bind(this))
    },
    methods: {

            handleSignUp() {
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
        addMessage (){
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