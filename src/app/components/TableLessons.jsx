"use client";

import React, { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import { deleteLessonsFromFirestore } from "@/app/services/LessonsServices";
import { FaEdit, FaTrash } from "react-icons/fa";
import { LuView } from "react-icons/lu";
import Loader from "./loader";
import toast from "react-hot-toast";
import Link from "next/link";
import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";

export default function TableLessons({ type }) {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [userId, setUserId] = useState(null);
    const [userType, setUserType] = useState(type == "user" ? "user_id" : "driver_id");
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
        const getLessons = async () => {
            if (!userId) return;
            try {
                setLoading(true);

                const lessonsQuery = query(
                    collection(db, "lessons"),
                    where(userType, "==", userId)
                );

                const querySnapshot = await getDocs(lessonsQuery);

                const filteredLessons = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setLessons(filteredLessons);
            } catch (err) {
                setError("Failed to fetch lessons.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getLessons();
    }, [userId]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    if (loading) return <Loader />;

    const handleDelete = async (event, id) => {
        if (event) event.preventDefault();
        try {
            await deleteLessonsFromFirestore(id);
            setLessons((prevLessons) => prevLessons.filter((lesson) => lesson.id !== id));
        } catch (err) {
            console.error("Failed to delete lesson:", err);
            toast.error("Failed to delete lesson. Please try again.");
        }
    };

    const formatTimestamp = (timestamp) => {
        if (!timestamp || isNaN(Date.parse(timestamp))) return "Invalid Date";

        const date = new Date(timestamp);

        if (isNaN(date)) return "Invalid Date";

        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };

        const formattedDate = date.toLocaleString('en-US', options);

        return formattedDate;
    };


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
                        <TableCell><strong>User ID</strong></TableCell>
                        <TableCell><strong>Date</strong></TableCell>
                        <TableCell><strong>Time</strong></TableCell>
                        <TableCell><strong>Actions</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lessons
                        .filter((lesson) =>
                            lesson.id.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((lesson) => (
                            <TableRow key={lesson.id}>
                                <TableCell>{lesson.id}</TableCell>
                                <TableCell>{formatTimestamp(lesson.date)}</TableCell>
                                <TableCell>{lesson.time || "N/A"}</TableCell>
                                <TableCell>
                                    <IconButton color="primary">
                                        <Link href={`/${type}/lessons/edit/${lesson.id}`}><FaEdit /></Link>
                                    </IconButton>
                                    <IconButton color="secondary">
                                        <Link href={`/${type}/lessons/view/${lesson.id}`}><LuView /></Link>
                                    </IconButton>
                                    <IconButton
                                        onClick={(e) => handleDelete(e, lesson.id)}
                                        color="error"
                                    >
                                        <FaTrash />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
