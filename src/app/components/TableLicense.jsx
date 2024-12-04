"use client";
import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip
} from '@mui/material';
import { db } from "@/app/firebase";
import { collection, getDocs, updateDoc, doc, query, where } from "firebase/firestore";
import toast from "react-hot-toast";

export default function TableLicense() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchDocuments = async () => {
        setLoading(true);
        try {
            const q = query(collection(db, "uploads"), where("fileType", "==", "license"));
            const querySnapshot = await getDocs(q);

            const docs = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setDocuments(docs);

        } catch (error) {
            console.error("Error fetching documents:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchDocuments();
    }, []);

    const handleApproval = async (docId, status, userId) => {
        try {
            const docRef = doc(db, "uploads", docId);
            await updateDoc(docRef, { status });

            await sendMessageToUser(userId, status);
            await fetchDocuments();
            toast.success(`${status} successfully!`);
        } catch (error) {
            console.error("Error updating document status:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    const sendMessageToUser = async (userId, status) => {
        try {
            const message = status === "Accepted" ? "Your license has been accepted." : "Your license has been rejected.";
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, { notification: message });

        } catch (error) {
            console.error("Error sending message to user:", error);
        }
    };
    console.log("Documents:", documents);


    useEffect(() => {
    }, [])
    return (
        <TableContainer
            component={Paper}
            elevation={3}
            sx={{
                mt: 3,
                overflowX: 'auto',
                width: '100%',
                maxWidth: { xs: '100%', sm: '600px', md: '800px', lg: '100%' },
                mx: 'auto'
            }}
        >
            <Table sx={{ minWidth: 650 }} aria-label="payment table">
                <TableHead>
                    <TableRow>
                        <TableCell><strong>User</strong></TableCell>
                        <TableCell><strong>File Type</strong></TableCell>
                        <TableCell><strong>User Type</strong></TableCell>
                        <TableCell><strong>Actions</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {documents.map((doc) => (
                        <TableRow key={doc.userId}>
                            <TableCell>{doc.email}</TableCell>
                            <TableCell>{doc.fileType}</TableCell>
                            <TableCell>{doc.userType}</TableCell>
                            <TableCell>
                                <button
                                    onClick={() => window.open(doc.fileUrl, "_blank")}
                                    className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                                >
                                    View File
                                </button>
                                {
                                    doc.status === "Accepted" ? (
                                        <Chip label="Accepted" color="success" />
                                    )
                                        : doc.status === "Rejected" ? (
                                            <Chip label="Rejected" color="error" />
                                        ) : (
                                            <>
                                                <button
                                                    onClick={() => handleApproval(doc.id, "Accepted", doc.userId)}
                                                    className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleApproval(doc.id, "Rejected", doc.userId)}
                                                    className="px-4 py-2 bg-red-500 text-white rounded"
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
