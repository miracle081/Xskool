import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./settings";

const uriToBlob = async (uri) => {
  return new Promise((resolve, reject) => {
    fetch(uri)
      .then(response => response.blob())
      .then(blob => resolve(blob))
      .catch(error => reject(error));
  });
};

export const uploadImageToFirebase = async (uri, fileLocation) => {
  try {
    const blob = await uriToBlob(uri);
    const filename = fileLocation;
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Upload failed:", error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  } catch (error) {
    console.error("Error preparing upload:", error);
    throw error;
  }
};
