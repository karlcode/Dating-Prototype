<template>
  <v-app light toolbar footer>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      right
      v-model="drawer"
      :disable-route-watcher="true"
    >
      <v-list>
        <v-list-tile 
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed>
      
      
      <v-toolbar-title>Seeking Daddy</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
      <v-btn flat v-if="!getUser.email" to="/auth">Sign In</v-btn>
      <v-btn flat v-else to="/profile"> <v-avatar><img :src="getUser.photoURL" alt="avatar"></v-avatar>{{getUser.email}}</v-btn>
      </v-toolbar-items>
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>
    <main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </main>
    
    <v-footer :fixed="fixed">
    <v-layout row wrap></v-layout>
      <span>&copy; 2017</span>
      
    </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        items: [
          { icon: 'apps', title: 'Home', to: '/' },
          { icon: 'info_outline', title: 'Login', to: '/auth' },
          { icon: 'bubble_chart', title: 'Convo', to: '/conversation' },
          { icon: 'info_outline', title: 'About', to: '/about' }

        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Dating Season'
      }
    },
    computed: {
        getUser(){
            return this.$store.getters.getUser
        },
        getUserId(){
            return this.$store.getters.getUserId
        },
    }
  }
</script>