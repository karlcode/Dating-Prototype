<template>
 <v-card>
    <v-toolbar class="white--text pink" dark>
      <v-toolbar-title>Inbox</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list two-line>
      <template v-for="(chat, index) in chats">
        <v-list-tile avatar ripple v-bind:key="index" router nuxt href="/chat">
          <v-list-tile-content>
            <v-list-tile-title>{{ chat.user}}</v-list-tile-title>
            <v-list-tile-sub-title>{{ chat.user }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-list-tile-action-text>{{ chat.last}}</v-list-tile-action-text>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider v-if="index + 1 < chats.length"></v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script>
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
    firebase: {
        chats: firebase.database().ref('chats/')
    }
  }
</script>
<style>

</style>