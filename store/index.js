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
        console.log(user)
        state.user.key = user.uid
        state.user.email = user.email
        state.user.photoURL = user.photoURL
        state.user.displayName = user.displayName
      },
      retrieveUser(state) {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            state.user.key = user.uid
            state.user.email = user.email
            state.user.photoURL = user.photoURL
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
