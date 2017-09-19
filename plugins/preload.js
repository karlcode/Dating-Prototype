import Vue from 'vue'
import store from '../store';
import firebase from "firebase";
import {config} from '../plugins/firebase'
if (!firebase.apps.length) {
    firebase.initializeApp(config)
 }
 
store.dispatch('retrieveUser')

