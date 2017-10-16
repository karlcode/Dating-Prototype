<template>
<v-container grid-list-md text-xs-center>
<div class="chat">
<v-layout column >
      <v-flex xs12>
      <div v-for="message in messages" :key="message['.key']">
          <div v-if="match(message.sender)">
            <div class="user" >
              <div class="user_message"> 
                <div >{{message.message}}</div>
                <time >{{message.time}}</time>
              </div>
            </div> 
          </div>
          <div v-else>
            <div class="client" >
              <div class="client_message"> 
                <div >{{message.message}}</div>
                <time >{{message.time}}</time>
              </div>
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
        messages: firebase.database().ref('messages/').child(this.chatID)
        }
    },
    //created () {
      //this.$bindAsObject('persons', firebase.database().ref('messages/' + this.chatID))
      //OR use $route.params.chat instead of this.chatID
      //this.$bindAsObject('persons', firebase.database().ref('messages/' + this.chatID))
    //},
    methods: {
        match: function(name){
          return name == store.state.user.key
        },
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
            .update({
            message: this.newMessage,
            last: timestamp})
            this.newMessage = ''
        }
    }
    }
  }
</script>

<style>
.chat{
  background: #f7f7f7;
  height: 100%;
}
.bottom_input{
  bottom: 0px;
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
.client{
  display:inline-block;
  clear: both;
  display: block;
  background-color: #ffffff;
	margin-bottom: 2px;
	float: left;
	padding: 7px 13px;
	font-size: 12px;
	border-radius: 15px;
	line-height: 1.4;
}

.client + .client{
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}
.client:first-of-type {
  border-top-right-radius: 16px;
  border-bottom-right-radius: 5px;
}
.client:last-of-type {
  border-bottom-right-radius: 16px;
  border-top-right-radius: 5px;
}
.client_message{
    
}
</style>