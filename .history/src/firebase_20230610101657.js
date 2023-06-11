import 'firebase/firestore';
import "firebase/auth"

import firebase from 'firebase/app';
const app = firebase.initializeApp({
    apiKey: "AIzaSyDUYKn6vGOKdjmqakLQxaPY67alcD0Vsd8",
    authDomain: "mathmaking-f547c.firebaseapp.com",
    projectId:  "mathmaking-f547c",
    storageBucket: "mathmaking-f547c.appspot.com",
    messagingSenderId: "939151747045",
    appId: "1:939151747045:web:788ff28e0c364e37fab10c"
})
export const auth = app.auth()
export var db = firebase.firestore();
