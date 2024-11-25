import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore , enableIndexedDbPersistence } from "@firebase/firestore";
import "firebase/storage";
// Corrected storageBucket URL
const firebaseConfig = {
  apiKey: "AIzaSyDlav-JbYFsrAW1iYLSEapo8m7P0UA_Ccc",
  authDomain: "formula-one-d1f9a.firebaseapp.com",
  projectId: "formula-one-d1f9a",
  storageBucket: "formula-one-d1f9a.firebasestorage.app", // Fixed this URL
  messagingSenderId: "421936224330",
  appId: "1:421936224330:web:cee8364b1d81cbc2036eb3",
  measurementId: "G-YPDW4M5HDB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Enable Firestore offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    console.error(
      "Multiple tabs open, persistence can only be enabled in one tab at a time."
    );
  } else if (err.code === "unimplemented") {
    console.error(
      "The current browser does not support all of the features required to enable persistence."
    );
  }
});
