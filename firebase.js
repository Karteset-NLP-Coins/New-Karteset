import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7ZDDcY-J4I-6X-tJcU5p9YDJkuCEndzQ",
  authDomain: "karteset-9ca45.firebaseapp.com",
  projectId: "karteset-9ca45",
  storageBucket: "karteset-9ca45.appspot.com",
  messagingSenderId: "808889264354",
  appId: "1:808889264354:android:ec00d4a68107b3f29296bb",
};
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
export { db, auth };
