import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwchnXNAoXCVzMyWP2XZPIdhErthotr-w",
  authDomain: "insta-33bc0.firebaseapp.com",
  projectId: "insta-33bc0",
  storageBucket: "insta-33bc0.appspot.com",
  messagingSenderId: "962269557107",
  appId: "1:962269557107:web:b5be9e698960ddfc929506"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

 const uploadImg = getStorage(app);

export {uploadImg};