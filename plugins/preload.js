import Vue from 'vue'
import store from '../store';
import firebase from "firebase";
import {config} from '../plugins/firebase'
if (!firebase.apps.length) {
    firebase.initializeApp(config)
 }

/*if (process.BROWSER_BUILD) {
    const authUser = Object.keys(localStorage)
    const user = authUser ? localStorage.getItem('firebase:email') : undefined;
    console.log(localStorage)
}*/
store.dispatch('retrieveUser')


