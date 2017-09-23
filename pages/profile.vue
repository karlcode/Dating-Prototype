<template>
<div class="profile">
    <v-avatar size="36px" tile><img :src="getUser.photoURL" alt="avatar"></v-avatar>
    <h1>{{getUser.displayName}}</h1>
    <h2>{{getUser.email}}</h2>
    <h2>About Me: {{this.bioText}}</h2>
    <h3>Age: {{this.age}}</h3>
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
        bioText: 'This is my bio',
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