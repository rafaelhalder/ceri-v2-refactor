import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { firebaseConfig as config } from "./../../FIREBASE_CONFIG";

const app = initializeApp(config);
const firestore = getFirestore(app);
const database = getDatabase(app);

export { firestore, database }