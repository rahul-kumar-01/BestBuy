import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAIAbyxRqGHhvMQGaOU9X2JgcSCwYMqrcY",
    authDomain: "busybuy-1940f.firebaseapp.com",
    projectId: "busybuy-1940f",
    storageBucket: "busybuy-1940f.appspot.com",
    messagingSenderId: "223732739357",
    appId: "1:223732739357:web:def2d62ee745d5324585f4"
};

const app = initializeApp(firebaseConfig);
export  const db = getFirestore(app);

