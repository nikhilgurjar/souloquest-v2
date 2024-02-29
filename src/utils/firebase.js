// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  // Your COnfig Goes Here
  apiKey: "AIzaSyDl-gDHw0LAfSiLraH9ZEwHdba0jlgFZkI",
  authDomain: "fir-node-fa9c0.firebaseapp.com",
  projectId: "fir-node-fa9c0",
  storageBucket: "fir-node-fa9c0.appspot.com",
  messagingSenderId: "425339655028",
  appId: "1:425339655028:web:bd1965f67e0527f1ee1221",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
