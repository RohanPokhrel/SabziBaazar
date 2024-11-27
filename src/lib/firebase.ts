import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCKoxOnC5xet1yxdh--YyObAnomqUM_3dM",
  authDomain: "sabzibaazar-19664.firebaseapp.com",
  projectId: "sabzibaazar-19664",
  storageBucket: "sabzibaazar-19664.firebasestorage.app",
  messagingSenderId: "456682617117",
  appId: "1:456682617117:web:03c35647fbbe08edc1c9f4",
  measurementId: "G-CE2MYY76Q1"
};

// Initialize Firebase only on client side
let auth;
let db;

if (typeof window !== 'undefined') {
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
}

export { db, auth }; 