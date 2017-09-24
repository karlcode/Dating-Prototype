<template>
<div class="chat">
<v-layout column >
      <v-flex xs12>
      <div>
      <div v-for="person in persons" class="user" :key="person['.key']">
      <span class="user_message">{{person}}</span>
        </div>
        </div>
        </v-flex>
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
import store from '../store';
  Vue.use(VueFire)

//If there is no firebase instance running, initialize the app
if (!firebase.apps.length) {
   firebase.initializeApp(config)
}

var db = firebase.database().ref('chats/')
  //const messagesRef = db.ref('messages')
  export default {
    store,
    data: () => ({
        newMessage: ''
    }),
    firebase: {
        persons: firebase.database().ref('chats/')
    },
    methods: {
        addMessage: function(){
            if (this.newMessage.trim()) {
            firebase.database().ref('chats/' + store.state.user.key ).push({
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