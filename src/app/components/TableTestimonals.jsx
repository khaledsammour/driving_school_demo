"use client";

import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    IconButton,
    Paper,
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from "./loader";
import toast from "react-hot-toast";
import Link from "next/link";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function TableTestimonials() {
    const [AllTestimonials, setAllTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchTestimonials = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "testimonials"));
            const testimonials = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setAllTestimonials(testimonials);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching testimonials:", err);
            setError("Failed to fetch testimonials.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "testimonials", id));
            toast.success("Testimonial deleted successfully!");
            setAllTestimonials(AllTestimonials.filter((item) => item.id !== id));
        } catch (err) {
            console.error("Error deleting testimonial:", err);
            toast.error("Failed to delete testimonial.");
        }
    };

    const filteredTestimonials = AllTestimonials.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <Loader />;
    if (error) return toast.error(error);

    return (
        <div className="table-packages py-7">
            <TextField
                label="Search Testimonials"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Rating</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredTestimonials.map((testimonial) => (
                            <TableRow key={testimonial.id}>
                                <TableCell>{testimonial.id}</TableCell>
                                <TableCell>{testimonial.name}</TableCell>
                                <TableCell>{testimonial.type}</TableCell>
                                <TableCell>{testimonial.rating}</TableCell>
                                <TableCell>
                                    {/* <IconButton color="primary">
                                        <Link href={`/admin/testimonials/edit/${testimonial.id}`}>
                                            <FaEdit />
                                        </Link>
                                    </IconButton> */}
                                    <IconButton
                                        onClick={() => handleDelete(testimonial.id)}
                                        color="secondary"
                                    >
                                        <FaTrash />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
