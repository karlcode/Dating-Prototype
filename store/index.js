import Vue from 'vue'  
import Vuex from 'vuex'
import * as firebase from 'firebase'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      user: {
        email: '',
        key: '',
        photoURL: '',
        displayName: ''
      }
    },
    getters: {
      getUser(state) {
        return state.user
      }

    },
    mutations: {
      setUser(state, user){
        state.user.email = user
      },
      retrieveUser(state) {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            state.user.key = user.uid
            state.user.email = user.email
            state.user.photoURL = "https://graph.facebook.com/" + user.providerData[0].uid + "/picture?height=500"
            state.user.displayName = user.displayName
          } else {
            state.user.key = null
            state.user.email = null
            state.user.photoURL = null
            state.user.displayName = null
          }
        })
      },
      logoutUser(state){
          firebase.auth().signOut()
          .then((user)=>{
              alert('signed out')
            })
          // have to somehow figure out reset state state.user = null
      }
    },
    actions: {
      setUser ({commit}, user){
        commit('setUser', user)
      },
      retrieveUser ({commit}){
        commit('retrieveUser')
      },
      logoutUser ({commit}){
        commit('logoutUser')
      },
    }
})
