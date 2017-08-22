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
      <input v-model="newMessage" @keyup.enter="addMessage" placeholder="Add message" />
      <h1>YOLO</h1>
      
</v-layout>

</template>

<script>
  import Vue from 'vue'
  import firebase from "firebase";
  const firebaseApp = firebase.initializeApp({
                apiKey: "AIzaSyCdqIU_fTgJtMnAOhwkhA3qekjeoUynf3k",
                authDomain: "dating-prototype.firebaseapp.com",
                databaseURL: "https://dating-prototype.firebaseio.com",
                projectId: "dating-prototype",
                storageBucket: "dating-prototype.appspot.com",
                messagingSenderId: "34141672867"})

  const db = firebaseApp.database()
  const messagesRef = db.ref('messages')
  export default {
    data: () => ({
        newMessage: ''
    }),
    methods: {
        addMessage (){
            if (this.newMessage.trim()) {
            messagesRef.push({
            text: this.newMessage
          })
          this.newMessage = ''
        }
    }
  }
  }
</script>