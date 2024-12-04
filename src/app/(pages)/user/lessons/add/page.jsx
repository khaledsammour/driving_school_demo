"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { doc, addDoc, collection, getDocs, query, where, Timestamp, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        date: "",
        driver_id: "",
        status: "soon",
        from: "",
        time: "",
        to: "",
        user_id: "",
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
                console.log(driverList);
            } catch (error) {
                console.error("Error fetching drivers:", error);
                toast.error("Failed to fetch drivers.");
            }
        };

        fetchDrivers();
    }, []);

    const formatTimestamp = (timestamp) => {
        if (!timestamp) return "";
        const date = new Date(timestamp.seconds * 1000);
        return date.toISOString().split("T")[0];
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const { date, from, to, driver_id } = formData;

        if (!date || !from || !to || !driver_id) {
            toast.error("Please fill in all required fields.");
            return false;
        }

        if (to <= from) {
            toast.error("'To' time must be later than 'From' time.");
            return false;
        }



        return true;
    };


    function convertTimeToTimestamp(timeString) {
        // Split the time string into hours and minutes
        const [hours, minutes] = timeString.split(':').map(Number);
    
        // Get the current date
        const now = new Date();
    
        // Set the time on the current date
        now.setHours(hours, minutes, 0, 0);
    
        // Return the timestamp (milliseconds since epoch)
        return now.getTime();
    }

    function getTimeDifference(timestamp1, timestamp2) {
        // Calculate the difference in milliseconds
        const differenceMs = Math.abs(timestamp1 - timestamp2);
    
        // Convert to different units
        const seconds = Math.floor(differenceMs / 1000);
        const minutes = Math.floor(differenceMs / (1000 * 60));
        const hours = Math.floor(differenceMs / (1000 * 60 * 60));
    
        return { differenceMs, seconds, minutes, hours };
    }

    function timeDifference(startTime, endTime) {
        // Convert time strings to hours and minutes        
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);
    
        // Convert to total minutes from midnight
        const startTotalMinutes = startHours * 60 + startMinutes;
        const endTotalMinutes = endHours * 60 + endMinutes;
    
        // Calculate the difference, accounting for crossing midnight
        let differenceMinutes;
        if (endTotalMinutes >= startTotalMinutes) {
            differenceMinutes = endTotalMinutes - startTotalMinutes;
        } else {
            // Crossing midnight case
            differenceMinutes = 1440 - startTotalMinutes + endTotalMinutes;
        }
    
        // Convert back to hours and minutes
        const hours = Math.floor(differenceMinutes / 60);
        const minutes = differenceMinutes % 60;
    
        // Format result as HH:mm
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            const { differenceMs, seconds, minutes, hours } = getTimeDifference(convertTimeToTimestamp(formData.to), convertTimeToTimestamp(formData.from));
            await addDoc(collection(db, "lessons"), {
                date: new Date(formData.date),
                driver_id: formData.driver_id,
                status: formData.status,
                from: Timestamp.fromMillis(convertTimeToTimestamp(formData.from)),
                time: `${String(hours).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`,
                to: Timestamp.fromMillis(convertTimeToTimestamp(formData.to)),
                user_id: formData.user_id
            });
            const userDocRef = doc(db, "users", formData.user_id);
            const docSnap = await getDoc(userDocRef);
            await setDoc(userDocRef, {
                driving_hours: timeDifference(`${String(hours).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`, docSnap.data().driving_hours)
            }, { merge: true });

            router.push("/user/lessons");
            toast.success("Lesson created successfully");
        } catch (error) {
            console.error("Error creating lesson:", error);
            toast.error(`Error: ${error.message}`);
        }
    };

    return (
        <>
            <div className="create">
                <div className="p-8 rounded border border-gray-200">
                    <h1 className="font-medium text-3xl">Create Lesson</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-8 grid lg:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="date"
                                    className="text-sm text-gray-700 block mb-1 font-medium"
                                >
                                    Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    id="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="driver_id" className="text-sm text-gray-700 block mb-1 font-medium">
                                    Driver
                                </label>
                                <select
                                    name="driver_id"
                                    id="driver_id"
                                    value={formData.driver_id}
                                    onChange={handleChange}
                                    className="bg-gray-100 text-black border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500  w-full"
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
                            <div>
                                <label
                                    htmlFor="from"
                                    className="text-sm text-gray-700 block mb-1 font-medium"
                                >
                                    From
                                </label>
                                <input
                                    type="time"
                                    name="from"
                                    id="from"
                                    value={formData.from}
                                    onChange={handleChange}
                                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                                />
                            </div>
                            {/* <div>
                                <label
                                    htmlFor="time"
                                    className="text-sm text-gray-700 block mb-1 font-medium"
                                >
                                    Time
                                </label>
                                <input
                                    type="time"
                                    name="time"
                                    id="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                                />
                            </div> */}
                            <div>
                                <label
                                    htmlFor="to"
                                    className="text-sm text-gray-700 block mb-1 font-medium"
                                >
                                    To
                                </label>
                                <input
                                    type="time"
                                    name="to"
                                    id="to"
                                    value={formData.to}
                                    onChange={handleChange}
                                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                                />
                            </div>
                        </div>
                        <div className="space-x-4 mt-8">
                            <button
                                type="submit"
                                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
                            >
                                Create Lesson
                            </button>
                            <Link href="/user/lessons">
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
        </>
    );
}
