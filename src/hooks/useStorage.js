import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebase/config";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";

// Custom hook to upload the image to firebase storage
const useStorage = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const { user } = useAuth();

  const startUpload = (file) => {
    if (!file) return;

    const fileId = uuidv4();
    const formatFile = file.type.split("/").pop();

    const storageRef = ref(storage, `images/${fileId}.${formatFile}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        setError(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setProgress(0);
        //store data in firestore
        await addDoc(collection(db, "images"), {
          imgaeUrl: downloadURL,
          createdAt: new Date(),
          userEmail: user.email,
        });
      }
    );
  };

  return { progress, url, error, startUpload };
};

export default useStorage;
