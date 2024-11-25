"use client";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { storage } from "@/app/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedUrl, setUploadedUrl] = useState("");

    // Handle file selection
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    // Remove the selected file
    const removeFile = () => {
        setFile(null);
        setUploadedUrl("");
        setUploadProgress(0);
    };

    // Async function to handle file upload
    const uploadFile = async () => {
        if (!file) return;

        setUploading(true);
        setUploadProgress(0);

        try {
            // Sanitize file name
            const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
            const storageRef = ref(storage, `uploads/${sanitizedFileName}`);

            // Start the upload
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Await upload progress in a Promise
            await new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setUploadProgress(progress); // Update progress
                        console.log(`Upload is ${progress}% done`);
                    },
                    (error) => {
                        console.error("Upload failed:", error.code, error.message);
                        reject(error);
                    },
                    resolve
                );
            });

            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setUploadedUrl(downloadURL);
            console.log("File uploaded successfully. File available at:", downloadURL);
        } catch (error) {
            console.error("Failed to upload file:", error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="max-w-2xl my-10 mx-auto">
            {!file ? (
                <label
                    htmlFor="uploadFile1"
                    className="bg-white text-gray-500 font-semibold text-base rounded h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-11 mb-2 fill-gray-500"
                        viewBox="0 0 32 32"
                    >
                        <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
                        <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
                    </svg>
                    Upload file
                    <input
                        type="file"
                        id="uploadFile1"
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/png, image/jpg, image/jpeg, image/svg+xml, image/webp, image/gif, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    />
                    <p className="text-xs font-medium text-gray-400 mt-2">
                        PNG, JPG, PDF, DOC, DOCX, XLS, XLSX.
                    </p>
                </label>
            ) : (
                <div className="relative p-4 border border-gray-300 rounded bg-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-600">{file.name}</p>
                            <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                        <button
                            className="text-red-500 hover:text-red-700"
                            onClick={removeFile}
                        >
                            <MdClose size={20} />
                        </button>
                    </div>
                    <button
                        onClick={uploadFile}
                        className="mt-3 px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 disabled:bg-gray-400"
                        disabled={uploading}
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
            {uploadedUrl && (
                <div className="mt-4 text-center">
                    <p className="text-green-600">File uploaded successfully!</p>
                    <a
                        href={uploadedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                    >
                        View File
                    </a>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
