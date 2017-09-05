import Vue from 'vue'  
import Vuex from 'vuex'
Vue.use(Vuex)
const createStore = () => {
  return new Vuex.Store({
    state: {
      counter: 0,
      asdasf: 1
    },
    mutations: {
      increment (state) {
        state.counter++
      }
    }
  })
}

export default createStore