import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
// Replace these values with your actual Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyA86mqqpSe3duhOb3_qY6Re2jW2DaxrwsQ",
    authDomain: "mtm6404-contact-book-rea-e2112.firebaseapp.com",
    projectId: "mtm6404-contact-book-rea-e2112",
    storageBucket: "mtm6404-contact-book-rea-e2112.firebasestorage.app",
    messagingSenderId: "214151199426",
    appId: "1:214151199426:web:89795d0036c5663ce7595b",
    measurementId: "G-CGCPW1DCR0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
