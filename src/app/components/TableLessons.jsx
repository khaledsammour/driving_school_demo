"use client";

import React, { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,
    Chip, Dialog, DialogActions, DialogContent, DialogTitle, Button, FormControlLabel,
    Checkbox,
    Tooltip
} from '@mui/material';
import { deleteLessonsFromFirestore } from "@/app/services/LessonsServices";
import { FaEdit, FaTrash, FaCheckCircle } from "react-icons/fa";
import { LuView } from "react-icons/lu";
import Loader from "./loader";
import toast from "react-hot-toast";
import Link from "next/link";
import { query, collection, where, orderBy, getDocs, doc, updateDoc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/app/firebase";
import { IoCloseCircle } from "react-icons/io5";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function TableLessons({ type }) {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [userId, setUserId] = useState(null);
    const [userType, setUserType] = useState(type === "user" ? "user_id" : "driver_id");
    const [openModal, setOpenModal] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [questions, setQuestions] = useState([
        { id: 1, text: "Did the driver complete the course?", passed: false },
        { id: 2, text: "Was the lesson successful?", passed: false },
        { id: 3, text: "Did the driver demonstrate the required skills?", passed: false }
    ]);

    // Fetch userId from localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUserId = localStorage.getItem("IdUser");
            if (storedUserId) {
                setUserId(storedUserId);
            } else {
                setError("User ID not found in localStorage.");
            }
        }
    }, []);

    useEffect(() => {
        const getLessonsWithUsers = async () => {
            if (!userId) return;
            try {
                setLoading(true);

                // Step 1: Query lessons where driver_id matches userId
                const lessonsQuery = query(
                    collection(db, "lessons"),
                    type === 'admin' ? null : where(userType, "==", userId),
                    orderBy("date", "desc")
                );

                const querySnapshot = await getDocs(lessonsQuery);

                const lessonsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                // Step 2: Fetch related users based on driver_id
                const userPromises = lessonsData.map((lesson) => {
                    return getDocs(
                        query(
                            collection(db, "users"),
                            where("uid", "==", userType === "user_id" ? lesson.driver_id : lesson.user_id)
                        )
                    ).then((userSnapshot) => (userType === "user_id" ? {
                        ...lesson,
                        driver: userSnapshot.docs[0]?.data() || null, // Add user data or null
                    } : {
                        ...lesson,
                        user: userSnapshot.docs[0]?.data() || null, // Add user data or null
                    }));
                });

                // Wait for all user fetches to complete
                const lessonsWithUsers = await Promise.all(userPromises);

                // Step 3: Combine data
                setLessons(lessonsWithUsers);
            } catch (err) {
                setError("Failed to fetch lessons with user data.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getLessonsWithUsers();
    }, [userId, userType]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    if (loading) return <Loader />;

    function addTimes(time1, time2) {
        const [hours1, minutes1] = time1.split(':').map(Number);
        const [hours2, minutes2] = time2.split(':').map(Number);

        let totalMinutes = minutes1 + minutes2;
        let totalHours = hours1 + hours2 + Math.floor(totalMinutes / 60);

        totalMinutes = totalMinutes % 60;
        totalHours = totalHours % 24;

        const formattedHours = String(totalHours).padStart(2, '0');
        const formattedMinutes = String(totalMinutes).padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}`;
    }

    const handleDelete = async (event, selectedLesson) => {
        if (event) event.preventDefault();
        try {
            const userDocRef = doc(db, "users", userType !== "user_id" ? selectedLesson.user.uid : userId);
            const docSnap = await getDoc(userDocRef);
            await setDoc(userDocRef, {
                driving_hours: addTimes(docSnap.data().driving_hours, selectedLesson.time)
            }, { merge: true });
            await deleteLessonsFromFirestore(selectedLesson.id);
            setLessons((prevLessons) => prevLessons.filter((lesson) => lesson.id !== selectedLesson.id));
        } catch (err) {
            console.error("Failed to delete lesson:", err);
            toast.error("Failed to delete lesson. Please try again.");
        }
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp) {
            return "Invalid Date";
        }
        const exampleTimestamp = new Timestamp(timestamp.seconds, 0);
        const date = exampleTimestamp.toDate();
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    };

    const handleApproval = async (docId, status) => {
        if (!["Accepted", "Rejected"].includes(status)) {
            toast.error("Invalid status update.");
            return;
        }
        try {
            const docRef = doc(db, "lessons", docId);
            await updateDoc(docRef, { status });
            setLessons((prev) =>
                prev.map((lesson) =>
                    lesson.id === docId ? { ...lesson, status } : lesson
                )
            );
            toast.success(`${status} successfully!`);
        } catch (error) {
            console.error("Error updating document status:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    const handleMarkAsCompleted = (lesson) => {
        setSelectedLesson(lesson);
        setOpenModal(true);
    };

    const handleQuestionChange = (id, passed) => {
        setQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
                question.id === id ? { ...question, passed } : question
            )
        );
    };

    const generatePDF = () => {
        const doc = new jsPDF();
    
        // Add background and border for the certificate
        doc.setFillColor(255, 255, 255); // White background
        doc.rect(10, 10, 190, 277, 'F'); // Draw a white background rectangle
        doc.setLineWidth(2);
        doc.rect(5, 5, 200, 285); // Outer border
    
        // Add header with larger font size and centered
        doc.setFontSize(20);
        doc.setFont('times', 'bold');
        doc.text('Lesson Completion Certificate', 105, 40, null, null, 'center');
    
        // Add a line below the title
        doc.setLineWidth(1);
        doc.line(10, 50, 200, 50); // Horizontal line
    
        // Add student and instructor details with styling
        doc.setFontSize(12);
        doc.setFont('times', 'normal');
        doc.text(`Student Name: ${selectedLesson?.user?.first_name ?? ''} ${selectedLesson?.user?.last_name ?? ''}`, 20, 60);
        doc.text(`Instructor Name: ${selectedLesson?.driver?.first_name ?? ''} ${selectedLesson?.driver?.last_name ?? ''}`, 20, 70);
        doc.text(`Issue Date: ${new Date().toLocaleDateString()}`, 20, 80);
        doc.text(`Expiry Date: ${new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString()}`, 20, 90);
        doc.text(`Instructor License: ${selectedLesson?.driver?.license ?? ''}`, 20, 100);
    
        // Add a line separating details from the table
        doc.setLineWidth(0.5);
        doc.line(10, 110, 200, 110); // Horizontal line
    
        // Add questions as a table with custom styling
        const tableData = questions.map((question, index) => [
            index + 1,  // No.
            question.text,  // Subject
            formatTimestamp(selectedLesson.date),  // Date
            new Date(selectedLesson.date?.seconds * 1000).toLocaleDateString(),  // Day
            selectedLesson.time,  // Time
            question.passed ? 'Passed' : 'Not Passed'  // Status
        ]);
    
        // Table styling
        doc.autoTable({
            head: [['No.', 'Subject', 'Date', 'Day', 'Time', 'Status']],
            body: tableData,
            startY: 120,  // Start the table after the text
            headStyles: {
                fillColor: [51, 102, 153],  // Blue background for headers
                textColor: [255, 255, 255],  // White text
                fontSize: 12,
                fontStyle: 'bold'
            },
            bodyStyles: {
                fontSize: 10,
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240], // Light gray for alternate rows
            },
            styles: {
                halign: 'center', // Center-align table content
            }
        });
    
        // Add footer with page number
        doc.setFontSize(10);
        doc.setFont('times', 'italic');
        doc.text(`Page 1`, 180, 280, null, null, 'right');
    
        // Save the PDF
        doc.save(`lesson-${selectedLesson.id}-certificate.pdf`);
    };

    const filteredLessons = lessons.filter((lesson) =>
        lesson.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.date?.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.time?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
            <Table sx={{ minWidth: 650 }} aria-label="lessons table">
                <TableHead>
                    <TableRow>
                        <TableCell><strong>#</strong></TableCell>
                        <TableCell><strong>Date</strong></TableCell>
                        <TableCell><strong>{userType === "user_id" ? 'Driver' : 'User'}</strong></TableCell>
                        <TableCell><strong>Time</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                        <TableCell><strong>Actions</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredLessons.map((lesson, index) => (
                        <TableRow key={lesson.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{formatTimestamp(lesson.date)}</TableCell>
                            <TableCell>{userType === "user_id" ? `${lesson?.driver?.first_name ?? ''} ${lesson?.driver?.last_name ?? ''}` : `${lesson?.user?.first_name ?? ''} ${lesson?.user?.last_name ?? ''}`}</TableCell>
                            <TableCell>{lesson.time || "N/A"}</TableCell>
                            <TableCell>
                                <Chip
                                    label={lesson.status}
                                    color={
                                        lesson.status === "Accepted"
                                            ? "success"
                                            : lesson.status === "Rejected"
                                                ? "error"
                                                : lesson.status === "pending"
                                                    ? "warning"
                                                    : "default"
                                    }
                                    variant="outlined"
                                />
                            </TableCell>
                            <TableCell>
                                {(type === "user" || type === "admin") && <Tooltip title="Edit">
                                    <IconButton color="primary">
                                        <Link href={`/${type}/lessons/edit/${lesson.id}`}><FaEdit /></Link>
                                    </IconButton>
                                </Tooltip>}
                                <Tooltip title="View">
                                    <IconButton color="secondary" >
                                        <Link href={`/${type}/lessons/view/${lesson.id}`}><LuView /></Link>
                                    </IconButton>
                                </Tooltip>
                                {type === "admin" && <Tooltip title="Delete">
                                    <IconButton
                                        onClick={(e) => handleDelete(e, lesson)}
                                        color="error"
                                    >
                                        <FaTrash />
                                    </IconButton>
                                </Tooltip>}
                                <Tooltip title="mark as completed">
                                    <IconButton
                                        onClick={() => handleMarkAsCompleted(lesson)}
                                        color="primary"
                                    >
                                        <FaCheckCircle />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Modal for Marking Lesson as Completed */}
            <Dialog open={openModal} onClose={() => setOpenModal(false)}>
                <DialogTitle>Mark Lesson as Completed</DialogTitle>
                <DialogContent>
                    {questions.map((question) => (
                        <FormControlLabel
                            key={question.id}
                            control={
                                <Checkbox
                                    checked={question.passed}
                                    onChange={(e) => handleQuestionChange(question.id, e.target.checked)}
                                />
                            }
                            label={question.text}
                        />
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenModal(false)} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            generatePDF();
                            setOpenModal(false);
                        }}
                        color="primary"
                    >
                        Generate Certificate
                    </Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
    );
}
