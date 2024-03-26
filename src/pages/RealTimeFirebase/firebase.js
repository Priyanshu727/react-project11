// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCP2Id46lpES8hzFkg0LkvD8UUBaz1lWus",
  authDomain: "pr11-2cdbc.firebaseapp.com",
  projectId: "pr11-2cdbc",
  storageBucket: "pr11-2cdbc.appspot.com",
  messagingSenderId: "164579306907",
  appId: "1:164579306907:web:036059351f32ffc080853e",
  measurementId: "G-CFQ18K392E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);