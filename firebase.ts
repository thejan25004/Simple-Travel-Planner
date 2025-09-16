
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Add auth import
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBSj2QL5L6_vdv2DAE34p7K-nZccWf4d_0",
  authDomain: "taskmanager-2a8f0.firebaseapp.com",
  projectId: "taskmanager-2a8f0",
  storageBucket: "taskmanager-2a8f0.appspot.com",
  messagingSenderId: "840991804472",
  appId: "1:840991804472:web:85dccdb29f9b55c4b6aacd",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // Export auth
export const db = getFirestore(app);



