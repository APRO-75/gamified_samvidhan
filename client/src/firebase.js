import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAnLQ2LtSLvmAgnxmhZVJiLVBckzoMBw4",
  authDomain: "gamesam-3c3bb.firebaseapp.com",
  projectId: "gamesam-3c3bb",
  storageBucket: "gamesam-3c3bb.firebasestorage.app",
  messagingSenderId: "702944048973",
  appId: "1:702944048973:web:9b26cfcc63b75c8cdaa904",
  measurementId: "G-9BW89L0T6L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth();

// Initialize Firestore
export const db = getFirestore();

// Initialize Analytics
export const analytics = getAnalytics(app);

// Export default app instance
export default app; 