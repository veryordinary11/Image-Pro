import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmCtLtcw7uKyPVtP2ZgxCthd-MRsxFPek",
  authDomain: "image-pro-ce7ba.firebaseapp.com",
  projectId: "image-pro-ce7ba",
  storageBucket: "image-pro-ce7ba.appspot.com",
  messagingSenderId: "772973648402",
  appId: "1:772973648402:web:621d192543cfe69eff16cb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, storage, db };
