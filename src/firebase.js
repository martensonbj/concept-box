const firebase = require("firebase/app");
                 require("firebase/auth");
                 require("firebase/database");

const config = {
   apiKey: "AIzaSyCIwVBIHDXxv7_8fomg5KShc5VpOHBoZAs",
   authDomain: "concept-box.firebaseapp.com",
   databaseURL: "https://concept-box.firebaseio.com",
   projectId: "concept-box",
   storageBucket: "concept-box.appspot.com",
   messagingSenderId: "204589940171"
 };

firebase.initializeApp(config);

const database = firebase.database();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;

let currentUser = null;

export const signIn = (email, password) => {
  return auth.signInWithEmailAndPassword(email, password)
}

export const signOut = auth.signOut().then(() => {
  // Sign-out successful.
}).catch(function(error) {
  // An error happened.
});

auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
  }
});
