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
import { fetchUsersFromFirestore } from "@/app/services/userService";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from "./loader";
import toast from "react-hot-toast";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/app/firebase";
import Link from "next/link";

export default function TableUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const getUsers = async () => {
            try {
                const usersData = await fetchUsersFromFirestore();
                console.log(usersData);
                setUsers(usersData);
            } catch (err) {
                setError("Failed to fetch users.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, []);

    if (loading) return <Loader />;
    if (error) {
        toast.error(error);
        return null;
    }

    const handleEdit = (id) => {
        console.log("Edit user with ID:", id);
    };

    const handleDelete = async (event, id) => {
        if (event) event.preventDefault();
        try {
            await deleteDoc(doc(db, "users", id));
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            toast.success("User deleted successfully");
        } catch (err) {
            console.error("Failed to delete user:", err);
            toast.error("Failed to delete user. Please try again.");
        }
        console.log("Delete user with ID:", id);
    };

    // Filter users based on the search term
    const filteredUsers = users.filter((user) =>
        `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="table-users py-7">
            <TextField
                label="Search Users"
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
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Gender</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Language</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.first_name + " " + user.last_name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.gender}</TableCell>
                                <TableCell>{user.phone}</TableCell>
                                <TableCell>{user.language}</TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => handleEdit(user.id)}
                                        color="primary"
                                    >
                                        <Link href={`/admin/users/edit/${user.id}`}><FaEdit /></Link>
                                    </IconButton>
                                    <IconButton
                                        onClick={(event) => handleDelete(event, user.id)}
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
