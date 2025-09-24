// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO:  Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDc9u22vBTZMFT1wJrzw0_PGZcpoxCDrxs",
  authDomain: "talky-1bd93.firebaseapp.com",
  projectId: "talky-1bd93",
  storageBucket: "talky-1bd93.firebasestorage.app",
  messagingSenderId: "391428403770",
  appId: "1:391428403770:web:8ab600bf44ea89372c3b03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);