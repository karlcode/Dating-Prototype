<template>
  <v-layout column >
      <li v-for="user in users" class="user" :key="user['.key']">
      <span>{{user.name}}</span>
      </li>
      <form id="form" v-on:submit.prevent="addUser">
      <input type="text" v-model="newUser.name" placeholder="Message">
      <input type="submit" value="Add Message">
      </form>
      <span>{{initName}}</span>
      <form id="form" v-on:submit.prevent="initName">
      <input type="text" v-model.lazy="initName" placeholder="Your name">
      <input type="submit" value="Create Profile">
      </form>
      <v-flex xs10 offset-xs1>
      <v-layout row>
      <v-flex xs9 >
      <h2 class="text-xs-left">Daddies</h2>
       </v-flex>
      <v-flex xs3>
      <v-select class="text-xs-right" v-bind:items="dropdown_filter" label="Filter" segmented></v-select>
       </v-flex>
       </v-layout>
   
        
     
        <v-container fluid grid-list-md class="grey lighten-4">
        <v-layout row wrap>
          <v-flex
            v-bind="{ [`xs${card.flex}`]: true }"
            v-for="card in cards"
            :key="card.title"
            
          >
          
            <v-card >
              <a :href=" card.src ">
              <v-card-media
                :src="card.src"
                height="200px"
              >
              </v-card-media>
              </a>
              <v-card-title primary-title>
              <div>
                <span class="headline" v-text="card.title"></span>
              </div>
              <v-card-actions class="white">
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>favorite</v-icon>
                </v-btn>
                <span v-text="'Age: ' + card.age"></span>
              </v-card-actions>
              </v-card-title>
            
            </v-card>
          
          </v-flex>
          
        </v-layout>
      </v-container>
      </v-flex>
    </v-layout>
</template>

<script>
  import Vue from 'vue'
  const axios = require('axios')
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
      cards: [],
      dropdown_filter: ['Age (Young to Old)', 'Age (Old to Young)', 'Popular'],
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
    },
    mounted() {
      axios.get('https://randomuser.me/api/?results=50&gender=male')
      .then(response =>  {
        var result = response.data.results
        console.log(result)
        for(var i=0;i<result.length;i++){
          this.cards.push({
            title: result[i].name.first.charAt(0).toUpperCase()+result[i].name.first.slice(1)  + " " + result[i].name.last.charAt(0).toUpperCase()+result[i].name.last.slice(1) ,
            src: result[i].picture.large,
            age: Math.floor((Math.random() * 90) + 20),
            flex: 4
          }  
          )
        }
      })
    }
  }
</script>