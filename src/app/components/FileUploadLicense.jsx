"use client";
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { storage, db } from "@/app/firebase";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { collection, addDoc, doc, getDoc, getDocs, query, where, deleteDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const FileUploadLicense = ({ UserType, TypeFile }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedUrl, setUploadedUrl] = useState("");
    const [uploadDocId, setUploadDocId] = useState(null);
    const [userId, setUserId] = useState("");
    const [formUser, setFormUser] = useState({});
    const [useValid, setUseValid] = useState(true);
    const [documents, setDocuments] = useState([]);
    const [statusDocument, setStatusDocument] = useState();  // Store document status (Approved, Rejected, Pending)

    useEffect(() => {
        const storedUserId = localStorage.getItem("IdUser");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    useEffect(() => {
        const fetchUploadedFile = async () => {
            if (!userId) return;

            try {
                const querySnapshot = await getDocs(
                    query(
                        collection(db, "uploads"),
                        where("userId", "==", userId),
                        where("userType", "==", UserType),
                        where("fileType", "==", TypeFile)
                    )
                );
                if (!querySnapshot.empty) {
                    const fileData = querySnapshot.docs[0].data();
                    setUploadedUrl(fileData.fileUrl);
                    setUploadDocId(querySnapshot.docs[0].id);
                    setStatusDocument(fileData.status); // Set status
                }
            } catch (error) {
                console.error("Error fetching uploaded file:", error.message);
            }
        };

        fetchUploadedFile();
    }, [userId, UserType, TypeFile]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.size > 5 * 1024 * 1024) {
                toast.error("File size must not exceed 5MB.");
                return;
            }
            setFile(selectedFile);
        }
    };

    const uploadFile = async () => {
        if (!file) return;

        if (useValid === false) {
            setUseValid(false);
            console.log("Form is not valid");
            return;
        }
        setUseValid(true);

        setUploading(true);
        setUploadProgress(0);

        try {
            const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
            const storageRef = ref(storage, `uploads/${userId}/${sanitizedFileName}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            await new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        setUploadProgress(
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                        );
                    },
                    reject,
                    resolve
                );
            });

            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            const docRef = await addDoc(collection(db, "uploads"), {
                userId,
                fileName: sanitizedFileName,
                fileType: TypeFile,
                fileUrl: downloadURL,
                userType: UserType,
                status: "Pending",
                uploadDate: new Date(),
            });

            setUploadedUrl(downloadURL);
            setUploadDocId(docRef.id);
            toast.success("File uploaded successfully!");
        } catch (error) {
            console.error("Upload failed:", error.message);
            toast.error("File upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const removeFile = async () => {
        if (!uploadDocId || !uploadedUrl) return;

        setUploading(true);

        try {
            const fileRef = ref(storage, uploadedUrl);
            await deleteObject(fileRef);
            await deleteDoc(doc(db, "uploads", uploadDocId));
            resetFileState();
            toast.success("File removed successfully!");
        } catch (error) {
            console.error("Failed to remove file:", error.message);
            toast.error("Failed to remove file. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const resetFileState = () => {
        setFile(null);
        setUploadedUrl("");
        setUploadDocId(null);
        setUploadProgress(0);
    };

    return (
        <div className="py-6">
            {!useValid && (
                <div className="flex items-center bg-red-500 text-white text-sm font-bold px-4 py-3" role="alert">
                    <p>You must update your profile first to upload a file</p>
                </div>
            )}
            
            {uploadedUrl ? (
                statusDocument === "Accepted" ? (
                    <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
                        <p className="font-bold">Success</p>
                        <p>Your {TypeFile} has been Approved successfully.</p>
                        <img src={uploadedUrl} alt="License" className="w-auto h-60" />
                        
                    </div>
                ) : statusDocument === "Rejected" ? (
                    <>
                   <p className='text text-xl font-bold ml-2 text-black'>please upload your Document </p>

                   
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                        <p className="font-bold">Be Warned</p>
                        <p>Your {TypeFile} has been Rejected.</p>
                        <p>
                            View your file{" "}
                            <a
                                href={uploadedUrl}
                                target="_blank"
                                className="text-blue-400 underline"
                                rel="noopener noreferrer"
                            >
                                here
                            </a>.
                        </p>
                        <p>
                            If you want to remove it, click{" "}
                            <button className="text-red-500 underline" onClick={removeFile}>
                                here
                            </button>.
                        </p>
                    </div>
                    </>
                ) : (
                    <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                        <p className="font-bold">Be Warned</p>
                        <p>Your {TypeFile} is still being reviewed.</p>
                        <p>This process can take up to 24 hours.</p>
                    </div>
                )
            ) : (
                <>
                                   <p className='text text-xl font-bold ml-2 text-black'>please upload your Document </p>

                <div className="max-w-2xl my-10 mx-auto">
                    

                    {file && (
                        <div className="relative p-4 border border-gray-300 rounded bg-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{file.name}</p>
                                    <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
                                </div>
                                <button
                                    aria-label="Remove file"
                                    className="text-red-500 hover:text-red-700"
                                    onClick={resetFileState}
                                >
                                    <MdClose size={20} />
                                </button>
                            </div>
                            <button
                                onClick={uploadFile}
                                className="mt-3 px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 disabled:bg-gray-400"
                                disabled={uploading || statusDocument === "Accepted"}
                            >
                                {uploading ? "Uploading..." : "Upload"}
                            </button>
                            {uploading && (
                                <div className="mt-3 w-full bg-gray-200 rounded-full">
                                    <div
                                        className="bg-blue-500 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
                                        style={{ width: `${uploadProgress}%` }}
                                    >
                                        {uploadProgress.toFixed(0)}%
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                   
                    {!file && statusDocument !== "Accepted" && (
                        <label
                            htmlFor="uploadFile1"
                            className="bg-white text-gray-500 font-semibold text-base rounded h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-11 mb-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4v16m8-8H4"
                                />
                            </svg>
                            <p className="text-lg text-gray-700">Choose {TypeFile} to upload</p>
                            <input
                                type="file"
                                id="uploadFile1"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </label>
                    )}
                </div>
                </>
            )}
        </div>
    );
};


export default FileUploadLicense;
