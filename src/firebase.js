
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCg78VVFfS3KN7M3_IJVksPrIzBFc0D39w",
  authDomain: "mealtracker-f47fc.firebaseapp.com",
  projectId: "mealtracker-f47fc",
  storageBucket: "mealtracker-f47fc.firebasestorage.app",
  messagingSenderId: "933481815693",
  appId: "1:933481815693:web:c8591e88893117a9be8cc4",
  measurementId: "G-RCM5V3NY76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);