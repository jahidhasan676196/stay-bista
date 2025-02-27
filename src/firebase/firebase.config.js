import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
}
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCp7jXk2CsN--I3gZTz3gvRO-olOez3F5c",
//   authDomain: "stay-bista-hotels.firebaseapp.com",
//   projectId: "stay-bista-hotels",
//   storageBucket: "stay-bista-hotels.firebasestorage.app",
//   messagingSenderId: "554579209455",
//   appId: "1:554579209455:web:ded9c1fde704c0d340ff1a"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig)
