"use client"
import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
    Tooltip,
} from "@mui/material";
import { storage, db } from "@/app/firebase";
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    deleteObject,
} from "firebase/storage";
import {
    collection,
    addDoc,
    doc,
    getDoc,
    getDocs,
    query,
    where,
    deleteDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { BiTrash } from "react-icons/bi";
import { CgEye } from "react-icons/cg";

const FileUploadDocument = ({ UserType, TypeFile }) => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState({});
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [userId, setUserId] = useState("");
    const [formUser, setFormUser] = useState({});
    const [useValid, setUseValid] = useState(true);

    useEffect(() => {
        const storedUserId = localStorage.getItem("IdUser");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            if (!userId) return;

            try {
                const docRef = doc(db, "users", userId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setFormUser(docSnap.data());

                    if (
                        formUser.license_info &&
                        formUser.middle_name &&
                        formUser.third_name &&
                        formUser.last_name &&
                        formUser.phone &&
                        formUser.gender &&
                        formUser.language &&
                        formUser.address
                    ) {
                        setUseValid(true);
                    }
                } else {
                    console.warn("User document does not exist.");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, [userId]);

    useEffect(() => {
        const fetchUploadedFiles = async () => {
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

                const docs = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setUploadedFiles(docs);
            } catch (error) {
                console.error("Error fetching uploaded files:", error.message);
            }
        };

        fetchUploadedFiles();
    }, [userId, UserType, TypeFile]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const validFiles = selectedFiles.filter(
            (file) => file.size <= 5 * 1024 * 1024
        );

        if (validFiles.length < selectedFiles.length) {
            toast.error("Some files exceed the 5MB size limit.");
        }

        setFiles([...files, ...validFiles]);
    };

    const uploadFile = async (file) => {
        try {
            const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
            const storageRef = ref(storage, `uploads/${userId}/${sanitizedFileName}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            await new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        setUploadProgress((prev) => ({
                            ...prev,
                            [file.name]: (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                        }));
                    },
                    reject,
                    resolve
                );
            });

            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            const docRef = await addDoc(collection(db, "uploads"), {
                userId,
                email: formUser.email,
                fileName: sanitizedFileName,
                fileType: TypeFile,
                fileUrl: downloadURL,
                userType: UserType,
                status: "Pending",
                uploadDate: new Date(),
            });

            setUploadedFiles((prev) => [
                ...prev,
                { id: docRef.id, fileUrl: downloadURL, fileName: sanitizedFileName, status: "Pending" },
            ]);
            toast.success(`${file.name} uploaded successfully!`);
        } catch (error) {
            console.error(`Upload failed for ${file.name}:`, error.message);
            toast.error(`File upload failed for ${file.name}. Please try again.`);
        }
    };

    const uploadAllFiles = async () => {
        if (!useValid) {
            toast.error("Update your profile first to upload files.");
            return;
        }

        setUploading(true);
        for (const file of files) {
            await uploadFile(file);
        }
        setFiles([]);
        setUploading(false);
    };

    const deleteUploadedFile = async (fileId, fileUrl) => {
        try {
            const fileRef = ref(storage, fileUrl);
            await deleteObject(fileRef);
            await deleteDoc(doc(db, "uploads", fileId));
            setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
            toast.success("File deleted successfully!");
        } catch (error) {
            console.error("Failed to delete file:", error.message);
            toast.error("Failed to delete file. Please try again.");
        }
    };

    return (
        <div className="py-6">

            {!useValid && (
                <Typography variant="subtitle1" color="error" align="center" gutterBottom>
                    You must update your profile first to upload files.
                </Typography>
            )}
            <div className="max-w-3xl my-5 mx-auto">
                <p className='text text-xl font-bold ml-2 mb-4 text-black'>Upload your documents here</p>

                <label
                    htmlFor="uploadFile"
                    className="bg-white text-gray-500 font-semibold text-base rounded h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-12 h-12 text-gray-400"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M12 2v12m0 0l4-4m-4 4l-4-4m4 9c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582-8-8-8-8-8z" />
                    </svg>
                    <p className="text-sm">Upload your files here</p>
                    <input id="uploadFile" type="file" className="hidden" multiple onChange={handleFileChange} />
                </label>
                {files.length > 0 && (
                    <div className="my-4">
                        {files.map((file) => (
                            <div key={file.name} className="flex justify-between items-center my-2 border p-2 rounded">
                                <div>
                                    <p className="text-sm">{file.name}</p>
                                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                                </div>
                                <button
                                    onClick={() =>
                                        setFiles((prev) => prev.filter((f) => f.name !== file.name))
                                    }
                                    className="text-red-500"
                                >
                                    <MdClose size={20} />
                                </button>
                            </div>
                        ))}
                        <Button
                            onClick={uploadAllFiles}
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={uploading}
                        >
                            {uploading ? "Uploading..." : "Upload All Files"}
                        </Button>
                    </div>
                )}
            </div>

            {uploadedFiles.length > 0 && (
                <TableContainer component={Paper} className="max-w-3xl mx-auto">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>File Name</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {uploadedFiles.map((file) => (
                                <TableRow key={file.id}>
                                    <TableCell>
                                        {file.fileName}
                                    </TableCell>
                                    <TableCell>{file.status}</TableCell>
                                    <TableCell>
                                        {file.status != 'Accepted' && (
                                            <Tooltip title="Delete">
                                                <Button
                                                    onClick={() => deleteUploadedFile(file.id, file.fileUrl)}
                                                    color="secondary"
                                                >
                                                    <BiTrash color="red" />
                                                </Button>
                                            </Tooltip>
                                        )}
                                        <Tooltip title="View">
                                            <Button
                                                href={file.fileUrl} target="_blank" rel="noopener noreferrer"
                                                color="secondary"
                                            >
                                                <CgEye />
                                            </Button>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default FileUploadDocument;
