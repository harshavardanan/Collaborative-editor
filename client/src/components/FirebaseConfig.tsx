// src/config/FirebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, OAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Firebase configuration object from your Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyDrmOKnZQ_5omBzzyz5kJfaamnHudNW38g",
  authDomain: "collaborative-text-edito-3fd2d.firebaseapp.com",
  projectId: "collaborative-text-edito-3fd2d",
  storageBucket: "collaborative-text-edito-3fd2d.firebasestorage.app",
  messagingSenderId: "767873384377",
  appId: "1:767873384377:web:4f1877830fd1cd14970068",
  measurementId: "G-KV0WHQQ1JG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Set up the authentication
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const appleProvider = new OAuthProvider('apple.com');  // Use OAuthProvider for Apple

// Export everything you need
export { auth, googleProvider, appleProvider, githubProvider, signInWithPopup, signOut };
