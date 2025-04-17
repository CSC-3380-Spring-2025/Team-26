// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; 


const firebaseConfig = {
  apiKey: "AIzaSyB2t__i6zFqDB2HsBieCUzOr16rDUcU-WI",
  authDomain: "proj-87e9f.firebaseapp.com",
  databaseURL: "https://proj-87e9f-default-rtdb.firebaseio.com",
  projectId: "proj-87e9f",
  storageBucket: "proj-87e9f.firebasestorage.app",
  messagingSenderId: "754780800812",
  appId: "1:754780800812:web:555e676eb9a4720c0cce89",
  measurementId: "G-SMWCEKPWZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);


if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) {
      getAnalytics(app);
    }
  });
}
