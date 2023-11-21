import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8wTf0Q-iVrsF6yR0-YwqdAJN_81sgXyg",
  authDomain: "file-manager-article-project.firebaseapp.com",
  projectId: "file-manager-article-project",
  storageBucket: "file-manager-article-project.appspot.com",
  messagingSenderId: "963116751611",
  appId: "1:963116751611:web:cb5366dbe8a9ed6f73ae5e",
  measurementId: "G-M5J0VBVL4J",
};

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);

export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
export const database = getFirestore(app);
