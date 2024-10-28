// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnSAACTZitrA_RHbBqFSpKfW-gDS7xH08",
  authDomain: "clearslate.io",
  projectId: "decanlys-clearslate",
  storageBucket: "decanlys-clearslate.appspot.com",
  messagingSenderId: "929131839437",
  appId: "1:929131839437:web:640118b4c565fc02684e84",
  measurementId: "G-48KMVX93CY",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// connectFirestoreEmulator(db, 'localhost', 5002);
// connectAuthEmulator(auth, "http://127.0.0.1:9099")

export const dbStorage = getStorage(app);
export default firebaseConfig;

// const analytics = getAnalytics(app);
