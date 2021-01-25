import * as firebase from 'firebase';

import 'firebase/firestore';


try {
  firebase.initializeApp({
    apiKey: "AIzaSyCb55FC4b9PFkQIXkb1aiQGpUxNry2ifLI",
    authDomain: "bullet-journal-9b1d4.firebaseapp.com",
    projectId: "bullet-journal-9b1d4",
    storageBucket: "bullet-journal-9b1d4.appspot.com",
    messagingSenderId: "488530297009",
    appId: "1:488530297009:web:6152989432b1899aab2290",
    measurementId: "G-75FXE1JB3H"
  })
  } catch (err) {
  // we skip the “already exists” message which is
  // not an actual error when we’re hot-reloading
  if (!/already exists/.test(err.message)) {
  console.error( err.stack)
  }}
  const Firebase= firebase;


export default Firebase