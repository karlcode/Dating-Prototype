import Vue from 'vue'
import store from '../store';
import firebase from "firebase";
import {config} from '../plugins/firebase'
if (!firebase.apps.length) {
    firebase.initializeApp(config)
 }
 export default function (context) {
    console.log(context)
  }
if (process.BROWSER_BUILD) {
    const authUser = Object.keys(window.localStorage)
    const json = window.localStorage
    const user = authUser ? localStorage.getItem('firebase:email') : undefined;
    console.log(authUser)
    console.log(json)
    console.log(store.state.user)
    //store.dispatch('retrieveUser', user)
    store.commit('setUser', user)
    console.log(user)
}



