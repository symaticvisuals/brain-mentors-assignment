// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getStorage} from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCszWMgfKR943Z_bxhiUKqRHn-K0iw-eiw",
  authDomain: "brain-mentors-assignment.firebaseapp.com",
  projectId: "brain-mentors-assignment",
  storageBucket: "brain-mentors-assignment.appspot.com",
  messagingSenderId: "716274288633",
  appId: "1:716274288633:web:5488a6f6475922e77c5f28",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);