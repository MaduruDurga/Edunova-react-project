// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBB_QOWtGeOMVFTmT5iUfF1ImFwlfc780U",
  authDomain: "reactapp-61700.firebaseapp.com",
  projectId: "reactapp-61700",
  storageBucket: "reactapp-61700.appspot.com",  // <-- fixed here
  messagingSenderId: "424786897294",
  appId: "1:424786897294:web:8a4c937711b42fa59fdcdf"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
