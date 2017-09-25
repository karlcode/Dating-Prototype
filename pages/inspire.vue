<template>
  <v-layout column >
     
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
            v-for="user in users"
            :key="user.key"
            xs4
          >
            <v-card >
              <a :href=" user.photoURL ">
              <v-card-media
                :src="user.photoURL"
                height="200px"
              >
              </v-card-media>
              </a>
              <v-card-title primary-title>
              <div>
                <span class="headline" v-text="user.displayName"></span>
              </div>
              <v-card-actions class="white">
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>favorite</v-icon>
                </v-btn>
              </v-card-actions>
              </v-card-title>
            
            </v-card>
          
          </v-flex>
          
        </v-layout>
      </v-container>
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
  const axios = require('axios')
   import Vue from 'vue'
  import firebase from "firebase";
  import VueFire from 'vuefire';
  import {config} from '../plugins/firebase'
  import store from '../store';
  Vue.use(VueFire)
  if (!firebase.apps.length) {
   firebase.initializeApp(config)
}
  export default {
    data: () => ({
      cards: [],
      dropdown_filter: ['Age (Young to Old)', 'Age (Old to Young)', 'Popular'],
    }),
    firebase: {
        users: firebase.database().ref('user/')
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