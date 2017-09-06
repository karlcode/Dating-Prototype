<template>
<div class="chat">
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
      <v-flex xs12>
      <div v-if="this.user !== ''">
      <p><strong>User logged in as {{user}}</strong></p>
      </div>
      <div>
      <div v-for="person in persons" class="user" :key="person['.key']">
      <span class="user_message">{{person}}</span>
        </div>
        </div>
        </v-flex>
        <span>{{this.$store.state}}</span>
      <input v-model="newMessage" class="bottom_input" @keyup.enter="addMessage" placeholder="Add message" />
          
</v-layout>
</div>
</template>

<script>
  import Vue from 'vue'
  import firebase from "firebase";
  import VueFire from 'vuefire';
  import {config} from '../plugins/firebase'
import Auth from './auth.vue'
import Vuex from 'vuex' 
import store from '../store'   
Vue.use(Vuex)
  Vue.use(VueFire)

//If there is no firebase instance running, initialize the app
if (!firebase.apps.length) {
   firebase.initializeApp(config)
}

var db = firebase.database().ref('users/')
  //const messagesRef = db.ref('messages')
  export default {
    store,
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
    mounted(){
    console.log(this.$store)
    },
    methods: {
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

<style>
.chat{
    background: orange;
    height: 100%;
}
.bottom_input{
    
    position: fixed;
    bottom: 50px;
    left: 0px;
    right: 0px;
    width: 100%;
    height: 50px;
    z-index: 99;
    background: aqua;
    border: none;
    outline: none;
    padding-left: 55px;
    padding-right: 55px;
    color: #666;
    font-weight: 400;
}
.user{
   display: block;
    background-color: #1998e6;
	margin-bottom: 2px;
	float: right;
	padding: 7px 13px;
	font-size: 12px;
	border-radius: 15px;
	line-height: 1.4;
}
.user_message{
    
}
</style>