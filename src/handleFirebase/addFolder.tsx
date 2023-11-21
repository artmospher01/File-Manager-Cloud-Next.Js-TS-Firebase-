import { database } from "@/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

const files = collection(database, "files");
const addFolder = async (payload: {
  folderName: string;
  email: string;
  positionId: string;
}) => {
  try {
    await addDoc(files, { ...payload, isFolder: true });
  } catch (error) {
    console.log(error);
  }
};

export default addFolder;
