import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBNLqBJjS869z3dhCg7iKUeLxluw9LEJUI",
    authDomain: "vue-blog-system-d16f7.firebaseapp.com",
    projectId: "vue-blog-system-d16f7",
    storageBucket: "vue-blog-system-d16f7.appspot.com",
    messagingSenderId: "957997817266",
    appId: "1:957997817266:web:7ada1dc28da90c4ab518ab"
  };
// init setup
firebase.initializeApp(firebaseConfig)
//db setup
const db = firebase.firestore()
const auth = firebase.auth()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { db, timestamp, auth }