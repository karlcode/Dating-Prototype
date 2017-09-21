import Vue from 'vue'
import store from '../store';
import firebase from "firebase";
import {config} from '../plugins/firebase'
if (!firebase.apps.length) {
    firebase.initializeApp(config)
 }

if (process.BROWSER_BUILD) {
const authUser = Object.keys(window.localStorage)
 .filter(item => item.startsWith('firebase:authUser'))[0]
 const user = authUser ? JSON.parse(localStorage.getItem(authUser)) : undefined;
console.log(user)
    store.dispatch('retrieveUser', user)
 
   

}



