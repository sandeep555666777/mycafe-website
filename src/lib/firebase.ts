import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCZz5ZZdOGthCNJq8ANaN7OY2ySUOGJ7S0",
  authDomain: "mcafeadmin-6c3e6.firebaseapp.com",
  projectId: "mcafeadmin-6c3e6",
  storageBucket: "mcafeadmin-6c3e6.firebasestorage.app",
  messagingSenderId: "141060277523",
  appId: "1:141060277523:web:bd74db1b3a097bc52a46e6",
  measurementId: "G-V7D9VXCB4T",
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0]!;
}

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export default app;


