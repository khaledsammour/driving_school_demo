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
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from "./loader";
import toast from "react-hot-toast";
import Link from "next/link";

export default function TablePaymentAdmin() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch payments from Firestore
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "payments"));
                const paymentsData = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setPayments(paymentsData);
            } catch (err) {
                setError("Failed to fetch payments.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);


    if (loading) return <Loader />;
    if (error) {
        toast.error(error);
        return null;
    }

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "payments", id));
            setPayments((prevPayments) => prevPayments.filter((payment) => payment.id !== id));
            toast.success("Payment deleted successfully");
        } catch (error) {
            console.error("Error deleting payment:", error.message);
            toast.error("Failed to delete payment. Please try again.");
        }
    };

    const filteredPayments = payments.filter((payment) =>
        `${payment.driver_id}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${payment.user_id}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `${payment.amount}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="table-payments py-7">
            <TextField
                label="Search Payments"
                variant="outlined"
                fullWidth
                margin="normal"
                className="z-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Driver ID</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Date</TableCell>
                            {/* <TableCell>Actions</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPayments.map((payment) => (
                            <TableRow key={payment.id}>
                                <TableCell>{payment.user_id}</TableCell>
                                <TableCell>{payment.amount}</TableCell>
                                <TableCell>{payment.status}</TableCell>
                                <TableCell>
                                    {payment.created_at
                                        ? new Date(payment.created_at.seconds * 1000).toLocaleString()
                                        : "N/A"}
                                </TableCell>
                                {/* <TableCell>
                                    <IconButton
                                        onClick={() => console.log("Edit payment with ID:", payment.id)}
                                        color="primary"
                                    >
                                        <Link href={`/admin/payments/edit/${payment.id}`}><FaEdit /></Link>
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleDelete(payment.id)}
                                        color="secondary"
                                    >
                                        <FaTrash />
                                    </IconButton>
                                </TableCell> */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
