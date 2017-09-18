<template>
<div class="profile">
    <img :src="user.photoURL" alt="profile pic" width="100" height="100"/>
    <h1>{{user.email}}</h1>
    
    <h2>Bio: {{this.bioText}}</h2>
    <h3>Age: {{this.age}}</h3>
    <h3>Looking for a {{this.preference}}</h3>
    <p>DisplayName: {{user.displayName}}</p>
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
        user(){
            return this.$store.state.user
        }
    },
  }
</script>