<template>
<v-container grid-list-md text-xs-center>
<v-layout row >
<v-flex xs12 sm4 >
    <img :src="getUser.photoURL" width="250px" alt="avatar">
    <p>{{getUser.displayName}}</p>
    <p>Age: {{this.age}}</p>
    <p>{{getUser.email}}</p>
</v-flex>
<v-flex xs12 sm6>
    <v-text-field
              name="input-7-3"
              label="About me"
              :value="this.bioText"
              multi-line
    ></v-text-field>
    <p>Occupation</p>
    <p>Looking for a {{this.preference}}</p>
    
    </v-flex>
   
</v-layout>
</v-container>
</template>

<script>
import store from '../store';
  export default {
    store,
    data: () => ({
        newMessage: '',
        bioText: 'The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through.',
        age: 'N/A',
        preference: 'Sugar baby'
    }),
    computed: {
        getUser(){
            return store.getters.getUser
        }
    },
  }
</script>