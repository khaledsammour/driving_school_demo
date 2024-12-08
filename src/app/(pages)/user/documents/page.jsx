"use client"
import React, { useState, useEffect } from "react";
import FileUploadDocument from "@/app/components/FileUploadDocument";
import { TbLicense } from "react-icons/tb";
import { Tabs, Tab, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip } from "@mui/material";
import { storage, db } from "@/app/firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { collection, query, where, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";
import { BiDownload } from "react-icons/bi";

export default function Page() {
    const [activeTab, setActiveTab] = useState(0);
    const [contractUrl, setContractUrl] = useState(null);
    const [signedContract, setSignedContract] = useState(null);
    const [userId, setUserId] = useState(null);
    const [completedLessons, setCompletedLessons] = useState([]);

    useEffect(() => {
        const storedUserId = localStorage.getItem("IdUser");
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    useEffect(() => {
        if (userId) {
            // Fetch lessons for the user
            const fetchLessons = async () => {
                try {
                    const lessonsRef = collection(db, "lessons");
                    const q = query(lessonsRef, where("user_id", "==", userId), where("status", "==", "completed"));
                    const querySnapshot = await getDocs(q);
                    const lessonsData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setCompletedLessons(lessonsData);
                } catch (error) {
                    console.error("Error fetching lessons: ", error);
                }
            };

            fetchLessons();
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            const fetchContractUrl = async () => {
                try {
                    const contractRef = ref(storage, `contracts/${userId}`);
                    const url = await getDownloadURL(contractRef);
                    setContractUrl(url);
                } catch (error) {
                    console.error("Error fetching contract: ", error);
                }
            };

            fetchContractUrl();
        }
    }, [userId]);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleDownloadContract = () => {
        if (contractUrl) {
            window.open(contractUrl, "_blank"); // Opens the contract in a new tab
        }
    };

    const handleUploadSignedContract = async (file) => {
        if (!file) return;

        try {
            const contractRef = ref(storage, `contracts/${userId}/signed_contract.jpg`); // Firebase Storage path for signed contract
            await uploadBytes(contractRef, file);
            toast.success('Signed contract uploaded successfully!');
        } catch (error) {
            console.error("Error uploading signed contract: ", error);
        }
    };

    const handleDownloadCertificate = (lessonId) => {
        // Fetch the progress certificate for the lesson (assuming it's stored in Firebase)
        const certificateRef = ref(storage, `certificates/${userId}/${lessonId}_certificate.pdf`);
        getDownloadURL(certificateRef)
            .then((url) => {
                window.open(url, "_blank");
            })
            .catch((error) => {
                console.error("Error fetching certificate: ", error);
            });
    };

    return (
        <div className="Document">
            {/* Header Section */}
            <div className="flex items-center py-5 px-2">
                <TbLicense className="h-9 w-9 bg-primary rounded-lg text-blue-600 flex items-center justify-center text-md" />
                <span className="text text-xl font-bold ml-2 text-blue-600">Document</span>
            </div>

            {/* Tabs Section */}
            <Box>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    aria-label="Document tabs"
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Documents" />
                    <Tab label="Contract" />
                    <Tab label="Progress Certificates" />
                </Tabs>
            </Box>

            {/* Tab Content */}
            <Box className="py-6">
                {activeTab === 0 && (
                    <div className="table w-full">
                        <FileUploadDocument UserType="user" TypeFile={"document"} />
                    </div>
                )}
                {activeTab === 1 && (
                    <div className="flex justify-center items-center">
                        {contractUrl && (
                            <div>
                                <h3 className="text-center text-xl font-semibold mb-4">
                                    Please Download the contract for signing and re-upload it after signing.
                                </h3>
                                <div className="my-4 flex flex-col items-center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleDownloadContract}
                                        className="w-full max-w-xs mb-4"
                                        style={{
                                            backgroundColor: '#1976d2',
                                            padding: '10px 20px',
                                            fontSize: '16px',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                        }}
                                    >
                                        Download Contract
                                    </Button>

                                    {/* Re-upload signed contract */}
                                    <Typography variant="body2" color="textSecondary" className="mb-2">
                                        Upload the signed contract (PDF or Image)
                                    </Typography>
                                    <input
                                        type="file"
                                        accept="image/*, .pdf"
                                        onChange={(e) => handleUploadSignedContract(e.target.files[0])}
                                        className="file-input mb-4"
                                        style={{
                                            display: 'none',
                                        }}
                                        id="file-upload"
                                    />
                                    <label
                                        htmlFor="file-upload"
                                        className="cursor-pointer bg-primary text-white py-3 px-5 rounded-lg shadow-md mb-4"
                                        style={{
                                            backgroundColor: '#4caf50',
                                            fontSize: '16px',
                                            textAlign: 'center',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                            display: 'inline-block',
                                        }}
                                    >
                                        Choose File to Upload
                                    </label>
                                    {contractUrl && (
                                        <iframe
                                            src={contractUrl}
                                            width="100%"
                                            height="500px"
                                            title="Contract"
                                            frameBorder="0"
                                            className="border-2 border-gray-300 rounded-lg shadow-md"
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {activeTab === 2 && (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Lesson Date</TableCell>
                                    <TableCell>Rate</TableCell>
                                    <TableCell>Download Certificate</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {completedLessons.length > 0 ? (
                                    completedLessons.map((lesson) => (
                                        <TableRow key={lesson.id}>
                                            <TableCell>{lesson.from.toDate().toLocaleDateString()}</TableCell>
                                            <TableCell>{lesson.rate}</TableCell>
                                            <TableCell>
                                                <Tooltip title="Download">
                                                    <Button
                                                        variant="outlined"
                                                        color="secondary"
                                                        onClick={() => handleDownloadCertificate(lesson.id)}
                                                    >
                                                        <BiDownload />
                                                    </Button>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} align="center">
                                            No completed lessons found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </div>
    );
}
