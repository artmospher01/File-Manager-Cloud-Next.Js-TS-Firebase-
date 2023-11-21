import { database, storage } from "@/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const uploadFile = (
  file: File,
  setprogres: (progres: number) => void,
  email: string,
  positionId: string,
) => {
  const storageRef = ref(storage, `files/${file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);
  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setprogres(progress);
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      console.log(error);
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      void getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        void addFile(downloadURL, file.name, email, positionId, file.type);
      });
    },
  );
};

export default uploadFile;

const files = collection(database, "files");
const addFile = async (
  downloadURL: string,
  fileName: string,
  email: string,
  positionId: string,
  fileType: string,
) => {
  try {
    await addDoc(files, {
      downloadURL,
      fileName,
      email,
      positionId,
      fileType,
      isFolder: false,
    });
  } catch (error) {
    console.log(error);
  }
};
