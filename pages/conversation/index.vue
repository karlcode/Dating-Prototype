<template>
  <v-layout row >
     
      <v-flex>
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
            <v-card v-on:click="newChat(user)">
              
              <v-card-media
                :src="user.photoURL"
                height="350px"
                
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
        
      </v-flex>
    </v-layout>
</template>

<script>
  import Vue from 'vue'
  import firebase from "firebase";
  import VueFire from 'vuefire';
  import {config} from '~/plugins/firebase'
  import store from '~/store';
  Vue.use(VueFire)
  if (!firebase.apps.length) {
   firebase.initializeApp(config)
  }
  export default {
    data: () => ({
      cards: [],
      dropdown_filter: ['Age (Young to Old)', 'Age (Old to Young)', 'Popular'],
    }),
    methods: {
      newChat: (user)=>{
        var myUser = store.state.user.key
        var otherUser = user['.key']
        var roomName = myUser<otherUser ? myUser+'_'+otherUser : otherUser+'_'+myUser;
        console.log(roomName)
        // send request invite
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        // list all chatroomIds that a userId is part of
        firebase.database().ref('user-chats/').child(myUser).child(roomName).set({created: time})
      }
    },
    firebase: {
        users: firebase.database().ref('user/')
    }
  }
</script>