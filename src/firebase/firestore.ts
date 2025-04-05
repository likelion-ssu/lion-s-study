import { getFirestore } from "firebase/firestore";
import { firebaseApp } from "./firebasedb";

const fireStore = getFirestore(firebaseApp);

export default fireStore;
