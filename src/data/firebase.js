// src/data/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Твій правильний firebaseConfig сюди вставлений
const firebaseConfig = {
  apiKey: "AIzaSyANSGO4jzsWfCQ9CEK-z6heW8QNsx8Coac",
  authDomain: "simulator-of-startupmana-c0d8a.firebaseapp.com",
  projectId: "simulator-of-startupmana-c0d8a",
  storageBucket: "simulator-of-startupmana-c0d8a.appspot.com",
  messagingSenderId: "588827090161",
  appId: "1:588827090161:web:0be95796acfaa516c65d50",
  measurementId: "G-FJM0QQ8H28",
};

// Спочатку ініціалізуємо додаток
const app = initializeApp(firebaseConfig);

// Потім беремо сервіси
export const auth = getAuth(app);
export const db = getFirestore(app);
