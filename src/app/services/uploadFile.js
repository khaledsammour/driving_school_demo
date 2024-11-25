// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import { db } from "@/app/firebase";
// import { collection, addDoc } from "firebase/firestore";
// import { storage } from "@/app/firebase";
// import toast from "react-hot-toast";

// export const uploadFile = async (file, typeFile, typeUser, userId, userName) => {
//   const storageRef = ref(storage, `${typeFile}s/${file.name}`);
//   const uploadTask = uploadBytesResumable(storageRef, file);

//   uploadTask.on(
//     "state_changed",
//     (snapshot) => {
//       // Get task progress
//       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       console.log(`Upload is ${progress}% done`);
//       toast.success(`Upload is ${progress}% done`);
//     },
//     (error) => {
//       console.log(error);
//       toast.error("Error during upload");
//     },
//     async () => {
//       // Get the download URL after the file is uploaded successfully
//       const downloadURL = await getDownloadURL(uploadTask.snapshot.ref());
//       console.log("File available at", downloadURL);
//       saveFileToDatabase(downloadURL, typeFile, typeUser, userId, userName);
//     }
//   );
// };

// const saveFileToDatabase = async (downloadURL, typeFile, typeUser, userId, userName) => {
//   try {
//     const docRef = await addDoc(collection(db, "files"), {
//       url: downloadURL,
//       typeFile: typeFile, 
//       typeUser: typeUser,
//       status: "pending", 
//       userId: userId, 
//       userName: userName, 
//       timestamp: new Date(),
//     });
//     console.log("Document written with ID: ", docRef.id);
//     toast.success("File uploaded successfully!");
//   } catch (e) {
//     console.error("Error adding document: ", e);
//     toast.error("An error occurred while uploading the file.");
//   }
// };


