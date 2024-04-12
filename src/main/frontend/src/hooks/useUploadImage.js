import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../firebase/fbase";

function useUploadImage() {


  const uploadImage = async (file) => {
  const storageRef = ref(storage, `images/${uuidv4()}`);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      return downloadUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null; // Upload failed, return null
    }
  };

  return uploadImage;
}

export default useUploadImage;