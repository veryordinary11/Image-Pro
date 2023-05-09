import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

// Custom hook to get the firestore data
const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const q = query(
          collection(db, collectionName),
          orderBy("createdAt", "desc")
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const images = [];
          querySnapshot.forEach((doc) => {
            const imageUrl = doc.data().imgaeUrl;
            const userEmail = doc.data().userEmail;
            const createdAt = doc.data().createdAt.toDate();
            images.push({ imageUrl, userEmail, createdAt });
          });
          setDocs(images);
          setIsLoading(false);
        });
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    getData();
  }, [collectionName]);

  return { docs, isLoading };
};

export default useFirestore;
