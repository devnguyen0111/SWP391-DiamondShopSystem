import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAmmLTaIWacgSfuzgz5h92H-lb-13L2_fw",
  authDomain: "idyllic-bloom-423215-e4.firebaseapp.com",
  projectId: "idyllic-bloom-423215-e4",
  storageBucket: "idyllic-bloom-423215-e4.appspot.com",
  messagingSenderId: "169115462659",
  appId: "1:169115462659:web:82ecb794ed39b37a3cf236",
};

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const storage = getStorage();
// export const db = getFirestore();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, app };