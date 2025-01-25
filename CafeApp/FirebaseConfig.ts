// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWtgCVKEE9GVhTGLi6yOp6AMFqU0X0VKE",
  authDomain: "cafeapp-56671.firebaseapp.com",
  projectId: "cafeapp-56671",
  storageBucket: "cafeapp-56671.firebasestorage.app",
  messagingSenderId: "331191904166",
  appId: "1:331191904166:web:a4e9b8ccef7df4abf49167",
  measurementId: "G-VQ5S56EBZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);