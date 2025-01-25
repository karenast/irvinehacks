import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
});

const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
