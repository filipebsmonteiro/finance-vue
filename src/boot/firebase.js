import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDm0SCiDBAVjeuzVqHXPdvW-5LViiZqY4A",
  authDomain: "finance-b1846.firebaseapp.com",
  projectId: "finance-b1846",
  storageBucket: "finance-b1846.appspot.com",
  messagingSenderId: "673438932464",
  appId: "1:673438932464:web:63a1ee9453a42b9b4d9135",
  measurementId: "G-ZW5BVCFQYW",
  databaseURL: "https://finance-b1846-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export default {
  app,
  analytics,
  auth,
  database
};
