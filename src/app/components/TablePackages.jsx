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
import { deletePackageFromFirestore, fetchPackagesFromFirestore } from "@/app/services/packageService";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from "./loader";
import toast from "react-hot-toast";
import Link from "next/link";

export default function TablePackages() {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const getPackages = async () => {
            try {
                const allPackages = await fetchPackagesFromFirestore();
                const priorityOrder = {
                    "PREMIUM PACKAGE": 1,
                    "BASIC PACKAGE": 2,
                    "INDIVIDUAL LESSON": 3,
                    "CAR FOR TEST": 4,
                    "ONLINE TRAINING": 5,
                    "10 IN-CAR LESSON": 6,
                };

                // Sort the packages based on the priorityOrder
                const sortedPackages = allPackages.sort((a, b) => {
                    const priorityA = priorityOrder[a.name] || Infinity; // Default to Infinity if type is not in the order
                    const priorityB = priorityOrder[b.name] || Infinity;
                    return priorityA - priorityB; // Sort by ascending priority
                });                
                setPackages(sortedPackages);
            } catch (err) {
                setError("Failed to fetch packages.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getPackages();
    }, []);

    if (loading) return <Loader />;
    if (error) return toast.error(error);

    const handleEdit = (id) => {
        console.log("Edit package with ID:", id);
    };

    const handleDelete = async (event, id) => {
        if (event) event.preventDefault();
        try {
            await deletePackageFromFirestore(id);
            setPackages((prevPackages) => prevPackages.filter((pkg) => pkg.id !== id));
        } catch (err) {
            console.error("Failed to delete package:", err);
            toast.error("Failed to delete package. Please try again.");
        }
        console.log("Delete package with ID:", id);
    };

    // Filter packages based on the search term
    const filteredPackages = packages.filter((pkg) =>
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="table-packages py-7">
            <TextField
                label="Search Packages"
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
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Discount</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPackages.map((pkg) => (
                            <TableRow key={pkg.id}>
                                <TableCell>{pkg.name}</TableCell>
                                <TableCell>{pkg.price}</TableCell>
                                <TableCell>{pkg.discount}</TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleEdit(pkg.id)}
                                        color="primary"
                                    >
                                        <Link href={`/admin/packages/edit/${pkg.id}`}><FaEdit /></Link>
                                    </IconButton>
                                    <IconButton
                                        onClick={(event) => handleDelete(event, pkg.id)}
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
