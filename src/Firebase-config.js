import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCqCNRIvWkUusHbwtP3l8ad5QtuqJVHXfU",
  authDomain: "jobsland-1a8f6.firebaseapp.com",
  projectId: "jobsland-1a8f6",
  storageBucket: "jobsland-1a8f6.appspot.com",
  messagingSenderId: "392960828040",
  appId: "1:392960828040:web:6bf017a9c7ca8c89a2753d",
  measurementId: "G-8ZPPH78DTH",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
