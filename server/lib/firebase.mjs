// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgjt3oYpKrEVh5-aEOKtS-EeXwQYI1M3A",
  authDomain: "qofra-sw.firebaseapp.com",
  projectId: "qofra-sw",
  storageBucket: "qofra-sw.appspot.com",
  messagingSenderId: "272748410003",
  appId: "1:272748410003:web:2aa182d6cfcc06d4758966",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Create the file metadata
const metadata = {
  contentType: "image/jpeg",
};
const storage = getStorage(app, "gs://qofra-sw.appspot.com");

export async function uploadImages(files) {
  return await Promise.allSettled(
    files.map(async (file) => {
      try {
        // Resize and save the image using sharp
        await uploadBytes(
          ref(storage, `${file.originalname}`),
          file.buffer,
          metadata
        );

        const url = await getDownloadURL(ref(storage, `${file.originalname}`));
        return url;
      } catch (error) {
        console.log("error:", error);
      }
    })
  );
}
