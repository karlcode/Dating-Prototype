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
      
      <h1>YOLO</h1>
      <li v-for="user in users" class="user" :key="user['.key']">
      <span>{{user.message}} -- {{user}}</span>
    </li>
      <input v-model="newMessage" @keyup.enter="addMessage" placeholder="Add message" />
      
</v-layout>

</template>

<script>
  import Vue from 'vue'
  import firebase from "firebase";
  import VueFire from 'vuefire';

    // explicit installation required in module environments
  Vue.use(VueFire)
  let config = {
        apiKey: "AIzaSyCdqIU_fTgJtMnAOhwkhA3qekjeoUynf3k",
        authDomain: "dating-prototype.firebaseapp.com",
        databaseURL: "https://dating-prototype.firebaseio.com",
        projectId: "dating-prototype",
        storageBucket: "dating-prototype.appspot.com",
        messagingSenderId: "34141672867"
}
if (!firebase.apps.length) {
    firebase.initializeApp(config)
}
var db = firebase.database().ref('users/sadas')
  //const messagesRef = db.ref('messages')
  export default {
    data: () => ({
        newMessage: ''
    }),
    firebase: {
        users: db
    },
    methods: {
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