import Vue from 'vue'  
import Vuex from 'vuex'
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
    mutations: {
      increment (state, payload) {
        state.user.email = payload.email
        state.user.key = payload.key
        state.user.photoURL = payload.photoURL,
        state.user.displayName = payload.displayName
      }
    }
})
