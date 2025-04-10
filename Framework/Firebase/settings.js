
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore, initializeFirestore, } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyC-fwUy9KmKs4l3vOMMOtMWvMs6LBmrYz4",
    authDomain: "note-b7625.firebaseapp.com",
    projectId: "note-b7625",
    storageBucket: "note-b7625.appspot.com",
    messagingSenderId: "955552726801",
    appId: "1:955552726801:web:e639b9fe16993654ebd6b0"
};

// Initialize Firebas
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
// export const db = initializeFirestore(app, { experimentalForceLongPolling: true });
export const db = initializeFirestore(app, { experimentalForceLongPolling: true, });
export const storage = getStorage(app);
