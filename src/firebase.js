import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwqvV-Asbkqfwh3KRtG5kMm4FRaiky4u8",
  authDomain: "react-firebase-chat-app-4a3fa.firebaseapp.com",
  projectId: "react-firebase-chat-app-4a3fa",
  storageBucket: "react-firebase-chat-app-4a3fa.appspot.com",
  messagingSenderId: "438760319396",
  appId: "1:438760319396:web:ef2e863ebc351cfbdeb931",
  measurementId: "G-7L4BGTGK56",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
