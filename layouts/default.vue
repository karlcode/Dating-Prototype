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
          router
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
      
      
      <v-toolbar-title><router-link to="/">Seeking Daddy</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>

      <v-btn flat v-if="this.$store.state == null">Sign In</v-btn>
      <v-btn flat v-else>{{this.$store.state}}</v-btn>
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
          { icon: 'bubble_chart', title: 'Dad Finder', to: '/inspire' },
          { icon: 'info_outline', title: 'About', to: '/about' },
          { icon: 'info_outline', title: 'Chat', to: '/chat' }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Dating Season'
      }
    }
  }
</script>