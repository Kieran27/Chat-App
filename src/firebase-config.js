import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBYolhJHcVdNaZTOBEjdoDp0hl2F8AzzKc",
  authDomain: "chat-app-86653.firebaseapp.com",
  projectId: "chat-app-86653",
  storageBucket: "chat-app-86653.appspot.com",
  messagingSenderId: "470412164644",
  appId: "1:470412164644:web:4f48a4224a64176d1ca2b1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp)
export const db =  getFirestore(firebaseApp)
export const storage = getStorage(firebaseApp)
