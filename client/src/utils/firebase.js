import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "sdfsdfew",
  authDomain: "ecoistic-8513b.firebaseapp.com",
  projectId: "ecoistic-8513b",
  storageBucket: "ecoistic-8513b.appspot.com",
  messagingSenderId: "305538040166",
  appId: "1:305538040166:web:cfe546dabc3b1a9dd688a7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
