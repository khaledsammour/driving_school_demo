"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { addDoc, collection, getDocs, query, where, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/firebase";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        amount: "",
        driver_id: "",
        user_id: "",
        status: "Completed",
    });
    const [drivers, setDrivers] = useState([]);

    // Fetch user ID from localStorage on component mount
    useEffect(() => {
        const storedUserId = localStorage.getItem("IdUser");
        if (storedUserId) {
            setFormData((prev) => ({
                ...prev,
                user_id: storedUserId,
            }));
        }
    }, []);

    // Fetch drivers from Firestore
    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const driversQuery = query(
                    collection(db, "users"),
                    where("type", "==", "driver")
                );

                const querySnapshot = await getDocs(driversQuery);
                const driverList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setDrivers(driverList);
            } catch (error) {
                console.error("Error fetching drivers:", error);
                toast.error("Failed to fetch drivers.");
            }
        };

        fetchDrivers();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Form validation
    const validateForm = () => {
        if (!formData.driver_id) {
            toast.error("Please select a driver.");
            return false;
        }
        if (!formData.amount || formData.amount <= 0) {
            toast.error("Please enter a valid amount.");
            return false;
        }
        return true;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            let driver = drivers.find(driver=>driver.id == formData.driver_id);
            let email = driver.email
            let user_type = driver.type
            await addDoc(collection(db, "payments"), {
                amount: formData.amount,
                status: "Completed",
                user_id: formData.driver_id,
                email: email,
                user_type: user_type,
                created_at: serverTimestamp(),
            });

            router.push("/admin/Payments");
            toast.success("Payment created successfully!");
        } catch (error) {
            console.error("Error creating payment:", error);
            toast.error(`Error: ${error.message}`);
        }
    };

    return (
        <div className="create">
            <div className="p-8 rounded border border-gray-200">
                <h1 className="font-medium text-3xl">Create Payment</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mt-8 grid lg:grid-cols-2 gap-4">
                        {/* Driver Selection */}
                        <div>
                            <label htmlFor="driver_id" className="text-sm text-gray-700 block mb-1 font-medium">
                                Driver
                            </label>
                            <select
                                name="driver_id"
                                id="driver_id"
                                value={formData.driver_id}
                                onChange={handleChange}
                                className="bg-gray-100 text-black border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 w-full"
                            >
                                <option value="" disabled>
                                    Select a driver
                                </option>
                                {drivers.map((driver) => (
                                    <option className="text-black" key={driver.id} value={driver.id}>
                                        {driver.first_name + " " + driver.last_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Amount Input */}
                        <div>
                            <label htmlFor="amount" className="text-sm text-gray-700 block mb-1 font-medium">
                                Amount
                            </label>
                            <input
                                type="number"
                                name="amount"
                                id="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="space-x-4 mt-8">
                        <button
                            type="submit"
                            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
                        >
                            Add Payment
                        </button>
                        <Link href="/admin/Payments">
                            <button
                                type="button"
                                className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
