import Vue from 'vue'  
import Vuex from 'vuex'
Vue.use(Vuex)
const createStore = () => {
  return new Vuex.Store({
    state: {
      counter: 0
    },
    mutations: {
      increment (state) {
        state.counter++
      }
    }
  })
}

export default createStore