import { addDoc, collection } from "firebase/firestore";
import { db } from ".";


export const createMessage = async message => {
  await addDoc(collection(db, "kattar"), message);
}