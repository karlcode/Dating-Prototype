import Vue from 'vue'  
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      user: {
        email: '',
        key: ''
      }
    },
    mutations: {
      increment (state, payload) {
        state.user.email = payload.email
        state.user.key = payload.key
      }
    }
})
