// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5bz5OUoo1G8gpOayZhY-c1LnFwkcmUS0",
  authDomain: "cyclecheck-93a40.firebaseapp.com",
  projectId: "cyclecheck-93a40",
  storageBucket: "cyclecheck-93a40.appspot.com",
  messagingSenderId: "339360240980",
  appId: "1:339360240980:web:680ea77162eb1c198c24c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app)

export {db, auth};
