import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

console.log(process.env.API_KEY, "APIKEY");
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER,
  appId: process.env.APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
