<template>
<div class="profile">
    <v-avatar size="36px" tile><img :src="getUser.photoURL" alt="avatar"></v-avatar>
    <h1>{{getUser.displayName}}</h1>
    <h2>{{getUser.email}}</h2>
<v-card class="secondary elevation-0">
      <v-card-text>
        <v-subheader>About Me</v-subheader>
        <v-container fluid>
          <v-layout row>
            <v-flex xs12>
              <v-text-field
                box
                name="input-1"
                textarea
                dark
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>    <h3>Age: {{this.age}}</h3>
    <h3>Looking for a {{this.preference}}</h3>
    <v-btn error round @click.native="signOut">Logout</v-btn>
</div>
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
    methods: {
        signOut() {
                store.dispatch('logoutUser')
                this.$router.push({path: '/'})
            }
    },
    computed: {
        getUser(){
            return store.getters.getUser
        }
    },
  }
</script>