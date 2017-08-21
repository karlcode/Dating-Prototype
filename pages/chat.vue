<template>
<v-layout column >
<span>{{initName}}</span>
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
      </form>
</v-layout>
</template>

<script>
  import Vue from 'vue'
  var VueFire = require('vuefire')
  Vue.use(VueFire)
  import * as firebase from "firebase";
  var config = {
    apiKey: "AIzaSyCdqIU_fTgJtMnAOhwkhA3qekjeoUynf3k",
    authDomain: "dating-prototype.firebaseapp.com",
    databaseURL: "https://dating-prototype.firebaseio.com",
    projectId: "dating-prototype",
    storageBucket: "dating-prototype.appspot.com",
    messagingSenderId: "34141672867"
  };
  firebase.initializeApp(config)
  export default {
    data: () => ({
      newUser: {
        name: '',
        message: ''
      },
      initName: ''
    }),
    firebase: {
    users: firebase.database().ref('users')
    },
    methods: {
       addUser: function () {
        var user = this.initName
        usersRef.push(this.newUser)
        this.newUser.name = ''
      },
      initName: function (){
        this.initName = ''
      }
    }
  }
</script>