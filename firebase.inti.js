
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6jaOVvJoNczvyaFufthbgP8g27CX4Ofg",
  authDomain: "exam-hero-9eb23.firebaseapp.com",
  projectId: "exam-hero-9eb23",
  storageBucket: "exam-hero-9eb23.firebasestorage.app",
  messagingSenderId: "898580533071",
  appId: "1:898580533071:web:829fc65857bbba3e3fbf3a"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);