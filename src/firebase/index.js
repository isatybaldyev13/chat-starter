import { getAuth } from '@firebase/auth';
import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWTqBkKWj6kGuuDtuWOmfMGTLerBkgbuM",
  authDomain: "fir-app-eff25.firebaseapp.com",
  projectId: "fir-app-eff25",
  storageBucket: "fir-app-eff25.appspot.com",
  messagingSenderId: "63924157201",
  appId: "1:63924157201:web:86ac6a9496d94eb90caab0",
  measurementId: "G-LV7G7ZST4J"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
