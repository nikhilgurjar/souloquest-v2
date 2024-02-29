import {
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "./firebase";

export const handleUplaod = async (image) => {
  return new Promise((resolve, reject) => {
    if (image) {
      if (!image?.name) resolve(image);
      const storageRef = ref(storage, `images/${image.name}`);

      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(progress);
        },
        (error) => {
          // error -> reject promise
          reject(error);
        },
        () => {
          // upload completed
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // resolve promise with url
            resolve(downloadURL);
          });
        }
      );
    } else {
      // no image
      reject("No image to upload");
    }
  });
};
