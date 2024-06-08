import { initializeApp } from "firebase/app"; // Import initializeApp function from Firebase
import { getAuth } from "firebase/auth"; // Import getAuth function from Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Import getFirestore function from Firebase Firestore
import { getStorage } from "firebase/storage"; // Import getStorage function from Firebase Storage

// Firebase configuration object containing API keys and other settings
const firebaseConfig = {
  apiKey: "AIzaSyAeaS_IJAYpyy3nyELGY9qpBGM7VRTXwl8",
  authDomain: "login-a983e.firebaseapp.com",
  projectId: "login-a983e",
  storageBucket: "login-a983e.appspot.com",
  messagingSenderId: "941507257853",
  appId: "1:941507257853:web:73391c20b84ac8ae64e594"
};

// Initialize Firebase app with the provided configuration
const app = initializeApp(firebaseConfig);
// Get authentication instance from Firebase app
const auth = getAuth(app);
// Get Firestore database instance from Firebase app
const db = getFirestore(app);
// Get Storage instance for images from Firebase app
const imgdb = getStorage(app);
// Get default Storage instance from Firebase app
const storage = getStorage(app); 

// Export authentication, Firestore database, image storage, and default storage instances
export { auth, db, imgdb, storage };
