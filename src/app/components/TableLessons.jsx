"use client";

import React, { useEffect, useState } from "react";
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton
} from '@mui/material';
import { deleteLessonsFromFirestore, fetchLessonsFromFirestore } from "@/app/services/LessonsServices";
import { FaEdit, FaTrash } from "react-icons/fa";
import { LuView } from "react-icons/lu";
import Loader from "./loader";
import toast from "react-hot-toast";
import Link from "next/link";

export default function TableLessons({ type }) {
    const [lessons, setLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const getLessons = async () => {
            try {
                const allLessons = await fetchLessonsFromFirestore();
                console.log(allLessons);
                setLessons(allLessons);
            } catch (err) {
                setError("Failed to fetch lessons.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        getLessons();
    }, []);

    if (loading) return <Loader />;
    if (error) return toast.error(error);



    const handleDelete = async (event, id) => {
        if (event) event.preventDefault();
        try {
            await deleteLessonsFromFirestore(id);
            setLessons((prevLessons) => prevLessons.filter((lesson) => lesson.id !== id));
        } catch (err) {
            console.error("Failed to delete lesson:", err);
            toast.error("Failed to delete lesson. Please try again.");
        }
        console.log("Delete lesson with ID:", id);
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
                                <TableCell>{lesson.date}</TableCell>
                                <TableCell>{lesson.time}</TableCell>
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                    >
                                        <Link href={`/${type}/lessons/edit/${lesson.id}`}><FaEdit /></Link>
                                    </IconButton>
                                    <IconButton
                                        color="secondary"
                                    >
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
