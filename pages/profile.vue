<template>
<div class="profile">
    <img alt="profile pic" width="500" height="500"/>
    <h1>{{user.email}}</h1>
    
    <h2>Bio: {{this.bioText}}</h2>
    <h3>Age: {{this.age}}</h3>
    <h3>Looking for a {{this.preference}}</h3>
    <v-btn  @click.native="signOut">Logout</v-btn>
</div>
</template>

<script>

  export default {
    data: () => ({
        newMessage: '',
        bioText: 'This is my bio',
        age: 'N/A',
        preference: 'Sugar baby'
    }),
    methods: {
    },
    computed: {
        user(){
            return this.$store.state.user
        }
    },
  }
</script>