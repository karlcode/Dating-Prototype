<template>
<v-container grid-list-md text-xs-center>
<div class="chat">
<v-layout column >
      <v-flex xs12>
      <div>
      <div v-for="person in persons" class="user" :key="person['.key']">
      <div class="user_message"> 
      <div >{{person.message}}</div>
      <time >{{person.time}}</time>
      </div>
        </div>
        </div>
        </v-flex>
       <v-form v-model="newMessage" name="hello">
        <v-text-field
          class="bottom_input"
          @keyup.enter.native="addMessage" 
          v-model="newMessage"
          single-line
        ></v-text-field>
        </v-form>   
</v-layout>
</div>
</v-container>
</template>

<script>
  import Vue from 'vue'
  import firebase from "firebase";
  import VueFire from 'vuefire';
  import {config} from '~/plugins/firebase'
  import Auth from '../auth.vue'
  import store from '~/store';
  Vue.use(VueFire)

//If there is no firebase instance running, initialize the app
if (!firebase.apps.length) {
   firebase.initializeApp(config)
}
  export default {
    store,
    data: () => ({
        newMessage: '',
        chatID: []
    }),
    asyncData(context){
      console.log(context)
      return {chatID: context.params.chat}
    },
    firebase(){
      return  {
        persons: firebase.database().ref('messages/').child(this.chatID)
        }
    },
    //created () {
      //this.$bindAsObject('persons', firebase.database().ref('messages/' + this.chatID))
      //OR use $route.params.chat instead of this.chatID
      //this.$bindAsObject('persons', firebase.database().ref('messages/' + this.chatID))
    //},
    methods: {
        addMessage: function(){
            var date = new Date();
            var timestamp = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            if (this.newMessage.trim()) {
            //firebase.database().ref('chats/' + store.state.user.key ).push({message: this.newMessage})
            firebase.database().ref('messages/').child(this.chatID).push({
            message: this.newMessage,
            time: timestamp,
            sender: store.state.user.key
            })
            //child route should be a passed prop from parent component
            firebase.database().ref('user-chats/').child(store.state.user.key).child(this.chatID)
            .set({
            message: this.newMessage,
            last: timestamp,
            sender: store.state.user.key})
            this.newMessage = ''
        }
    }
    }
  }
</script>

<style>
.chat{
    background: beige;
    height: 100%;
}
.bottom_input{
    position: fixed;
    bottom: 50px;
    left: 0px;
    right: 0px;
    height: 50px;
    border: none;
    outline: none;
    padding-left: 55px;
    padding-right: 55px;
    font-weight: 400;
    background: #C6c6c6;
}
.user{
  display:inline-block;
  clear: both;
  display: block;
  background-color: #1998e6;
	margin-bottom: 2px;
	float: right;
	padding: 7px 13px;
	font-size: 12px;
	border-radius: 15px;
	line-height: 1.4;
}
.user + .user{
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.user:first-of-type {
  border-top-right-radius: 16px;
  border-bottom-right-radius: 5px;
}
.user:last-of-type {
  border-bottom-right-radius: 16px;
  border-top-right-radius: 5px;
}
.user_message{
    
}
</style>