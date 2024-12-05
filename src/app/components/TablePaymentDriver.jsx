"use client";
import React, { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
} from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/firebase";
import { v4 as uuidv4 } from "uuid";
import Loader from "./loader";
import toast from "react-hot-toast";

export default function TablePaymentDriver() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPayments = async () => {
            const userId = localStorage.getItem("IdUser");

            if (!userId) {
                setError("User ID not found in local storage.");
                setLoading(false);
                return;
            }

            try {
                const paymentsRef = collection(db, "payments");
                const q = query(paymentsRef, where("user_id", "==", userId));
                const querySnapshot = await getDocs(q);

                const paymentsData = querySnapshot.docs.map((doc) => ({
                    id: uuidv4(),
                    ...doc.data(),
                }));

                setPayments(paymentsData);
            } catch (err) {
                console.error("Error fetching payments:", err);
                toast.error("Failed to fetch payments.");
                setError("Failed to fetch payments.");
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    if (loading) return <Loader />;
    if (error) {
        toast.error(error);
        return <p>{error}</p>;
    }

    return (
        <TableContainer
            component={Paper}
            elevation={3}
            sx={{
                mt: 3,
                overflowX: "auto",
                width: "100%",
                maxWidth: { xs: "100%", sm: "600px", md: "800px", lg: "100%" },
                mx: "auto",
            }}
        >
            <Table sx={{ minWidth: 650 }} aria-label="payment table">
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Date</strong></TableCell>
                        <TableCell><strong>Price</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {payments.map((payment) => (
                        <TableRow key={payment.id}>
                            <TableCell>
                                {payment.created_at.toDate().toLocaleString()}
                            </TableCell>
                            <TableCell>{payment.amount}</TableCell>
                            <TableCell>
                                <Chip
                                    label={payment.status}
                                    color={payment.status === "Completed" ? "success" : "warning"}
                                    variant="outlined"
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
