import Vue from 'vue'  
import Vuex from 'vuex'
import * as firebase from 'firebase'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
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
    plugins: [
      createPersistedState({
        storage: {
          getItem: key => Cookies.get(key),
          setItem: (key, value) => Cookies.set(key, value),
          removeItem: key => Cookies.remove(key)
        }
      })
    ],
    getters: {
      getUser(state) {
        return state.user
      },
      getUserId(){
        return localStorage.getItem('firebase:email')
      }

    },
    mutations: {
      setUser(state, user){
        state.user.email = user
      },
      retrieveUser(state) {
        console.log(localStorage.getItem('firebase:email'))
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
