import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBCqyMZYMZ6LkYQEUD68Zj9sQ7CA0bbpwU",
  authDomain: "whatsapp-2-0-sonny-sangha.firebaseapp.com",
  projectId: "whatsapp-2-0-sonny-sangha",
  storageBucket: "whatsapp-2-0-sonny-sangha.appspot.com",
  messagingSenderId: "806723712091",
  appId: "1:806723712091:web:ee00030d1b2e781bb67b7e",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
