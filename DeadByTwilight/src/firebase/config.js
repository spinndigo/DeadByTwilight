// see here for why we permit api keys here : https://firebase.google.com/docs/projects/api-keys#api-keys-for-firebase-are-different

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqQ_40II6VJbwsZaBXfRfQn7HvBv9i8GM",
  authDomain: "deadbytwilight.firebaseapp.com",
  projectId: "deadbytwilight",
  storageBucket: "deadbytwilight.appspot.com",
  messagingSenderId: "277246670139",
  appId: "1:277246670139:web:4ba7de049f5449b66d331e",
  measurementId: "G-Q7S91S2MVC"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export { firebase };
