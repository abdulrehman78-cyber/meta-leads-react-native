import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC6HIplw2a_bAAMoAtYMJOVN3EAbMyrC4Q",
  authDomain: "meta-leads-testing.firebaseapp.com",
  projectId: "meta-leads-testing",
  storageBucket: "meta-leads-testing.firebasestorage.app",
  messagingSenderId: "363033675467",
  appId: "1:363033675467:web:4bdef425cd8fa0ec173d4e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);