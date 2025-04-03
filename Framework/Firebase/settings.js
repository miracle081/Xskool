
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBDduGj_ywK3Pg4IQOoQsEz-t3RByrThok",
    authDomain: "xskool.firebaseapp.com",
    projectId: "xskool",
    storageBucket: "xskool.firebasestorage.app",
    messagingSenderId: "1003701065878",
    appId: "1:1003701065878:web:9847a92b61fd5926760ab7"
};

// Initialize Firebas
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
