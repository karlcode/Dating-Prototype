<template>
<v-container grid-list-md text-xs-center>
<v-layout row >
<v-flex xs12 sm4 >
    
</v-flex>
<v-flex xs12 sm6>
    <v-text-field>Edit your profile</v-text-field>
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