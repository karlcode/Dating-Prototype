import Vue from 'vue'
import * as firebase from "firebase";

let config = {
    apiKey: "AIzaSyCdqIU_fTgJtMnAOhwkhA3qekjeoUynf3k",
    authDomain: "dating-prototype.firebaseapp.com",
    databaseURL: "https://dating-prototype.firebaseio.com",
    projectId: "dating-prototype",
    storageBucket: "dating-prototype.appspot.com",
    messagingSenderId: "34141672867"
}
firebase.initializeApp(config)