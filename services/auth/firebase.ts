import { Platform } from "react-native";

// Create a unified type-safe auth wrapper
let auth: any;
let signInWithEmailAndPassword: (email: string, password: string) => Promise<any>;
let createUserWithEmailAndPassword: (email: string, password: string) => Promise<any>;
let updateProfile: (currentUser: any, args: { displayName: string }) => Promise<any>;
let signOut: () => Promise<void>;
let onAuthStateChanged: (callback: (user: any) => void) => (() => void);

if (Platform.OS === "web" || process.env.EXPO_PUBLIC_ENV === "development") {
  // --- Web SDK ---
  const { initializeApp } = require("firebase/app");
  const {
    getAuth,
    signInWithEmailAndPassword: webSignIn,
    createUserWithEmailAndPassword: webCreateUser,
    signOut: webSignOut,
    onAuthStateChanged: webOnAuthStateChanged,
    updateProfile: webUpdateProfile,
  } = require("firebase/auth");

  const firebaseConfig = {
    apiKey: "AIzaSyCy3Sa3Kt-FUe_MuqM2LxqpA0OFzJzPjI8",
    authDomain: "huayoo.firebaseapp.com",
    projectId: "huayoo",
    storageBucket: "huayoo.appspot.com",
    messagingSenderId: "895812760717",
    appId: "1:895812760717:web:6bcd6de30fac121a941ec4",
  };

  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);

  // Wrap Web SDK functions
  signInWithEmailAndPassword = (email, password) =>
    webSignIn(auth, email, password);
  createUserWithEmailAndPassword = (email, password) =>
    webCreateUser(auth, email, password);
  signOut = () => webSignOut(auth);
  updateProfile = (user, args) =>
    webUpdateProfile(user, args);
  onAuthStateChanged = (callback) => webOnAuthStateChanged(auth, callback);
} else {
  // --- Native SDK ---
  const authModule = require("@react-native-firebase/auth").default;
  auth = authModule();

  // Wrap Native SDK functions
  signInWithEmailAndPassword = (email, password) =>
    auth.signInWithEmailAndPassword(email, password);
  createUserWithEmailAndPassword = (email, password) =>
    auth.createUserWithEmailAndPassword(email, password);
  signOut = () => auth.signOut();
  updateProfile = (currentUser, args) => 
    auth.currentUser.updateProfile(args);
  onAuthStateChanged = (callback) => auth.onAuthStateChanged(callback);
}

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile };
