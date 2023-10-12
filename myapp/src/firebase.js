// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD5Bygtq3LD81jMpm2SH97lLUy3SfLiKJk",
  authDomain: "shruti-react-project.firebaseapp.com",
  projectId: "shruti-react-project",
  storageBucket: "shruti-react-project.appspot.com",
  messagingSenderId: "924001565285",
  appId: "1:924001565285:web:e2faa03192a708c4f9a48c",
  measurementId: "G-29Z1HJXY3X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);