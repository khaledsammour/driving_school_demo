// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlav-JbYFsrAW1iYLSEapo8m7P0UA_Ccc",
  authDomain: "formula-one-d1f9a.firebaseapp.com",
  projectId: "formula-one-d1f9a",
  storageBucket: "formula-one-d1f9a.appspot.com",
  messagingSenderId: "421936224330",
  appId: "1:421936224330:web:cee8364b1d81cbc2036eb3",
  measurementId: "G-YPDW4M5HDB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)