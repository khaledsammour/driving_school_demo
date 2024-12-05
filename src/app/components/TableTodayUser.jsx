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
} from "@mui/material";
import { fetchLastUsersFromFirestore } from "@/app/services/userService";
import Loader from "./loader";
import toast from "react-hot-toast";

export default function TableTodayUser() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const usersData = await fetchLastUsersFromFirestore();
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

    return (
        <div className="max-w-4xl mx-auto mt-6">
            <h2 className="text-lg font-semibold text-center mb-4">Today Registered Users</h2>

            <TableContainer
                component={Paper}
                className="border border-gray-200 rounded-md shadow-sm"
            >
                <Table className="table-auto text-xs">
                    <TableHead className="bg-gray-100">
                        <TableRow>
                            <TableCell className="p-2 font-medium">Name</TableCell>
                            <TableCell className="p-2 font-medium">Email</TableCell>
                            <TableCell className="p-2 font-medium">Gender</TableCell>
                            <TableCell className="p-2 font-medium">Phone</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id} className="border-t">
                                <TableCell className="p-2">
                                    {user.first_name + " " + user.last_name}
                                </TableCell>
                                <TableCell className="p-2">{user.email}</TableCell>
                                <TableCell className="p-2">{user.gender}</TableCell>
                                <TableCell className="p-2">{user.phone}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
