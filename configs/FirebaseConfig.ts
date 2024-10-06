// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: "ai-short-video-generator-4d7e0.firebaseapp.com",
  projectId: "ai-short-video-generator-4d7e0",
  storageBucket: "ai-short-video-generator-4d7e0.appspot.com",
  messagingSenderId: "148252961775",
  appId: "1:148252961775:web:51ec9b0a2948306d72641a",
  measurementId: "G-ZMJF6WB8MF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
