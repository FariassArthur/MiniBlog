// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJLOlKtBZ8z0XDDnEiCSttl1sf0bJ0e50",
  authDomain: "miniblog-ea4f3.firebaseapp.com",
  projectId: "miniblog-ea4f3",
  storageBucket: "miniblog-ea4f3.appspot.com",
  messagingSenderId: "508182544383",
  appId: "1:508182544383:web:bfaaf7c9317861bf1b71ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//my-code
import { getFirestore } from 'firebase/firestore';

const db = getFirestore(app);

export { db };