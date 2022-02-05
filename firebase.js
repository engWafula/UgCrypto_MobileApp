
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAbDxDiP5N9nWU-uSQlNHOgrXW17rswx1k",
  authDomain: "ug-crypto.firebaseapp.com",
  projectId: "ug-crypto",
  storageBucket: "ug-crypto.appspot.com",
  messagingSenderId: "245068975727",
  appId: "1:245068975727:web:4465b77d08fb8f62ec879a",
  measurementId: "G-XBKE8WFDQL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);