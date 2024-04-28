import { addDoc, collection } from "firebase/firestore";
import { db } from ".";

export const createMessage = async message => {
  const ref = await addDoc(collection(db, "messages"), message);
  return ref;
}