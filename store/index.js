import Vue from 'vue'  
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      user: "Hey im the user"
    },
    mutations: {
      increment (state) {
        state.user = "extreme"
      }
    }
})
