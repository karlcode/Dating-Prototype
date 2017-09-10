<template>
<div class="profile">
    <h1>{{user.email}}</h1>
    <h1>{{user.key}}</h1>
</div>
</template>

<script>

  export default {
    data: () => ({
        newMessage: ''
    }),
    methods: {
    },
    computed: {
        user(){
            return this.$store.state.user
        }
    }
  }
</script>