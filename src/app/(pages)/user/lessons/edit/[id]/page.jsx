"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { db } from '@/app/firebase';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Page({ params }) {
    const { id } = params;
    const router = useRouter();
    const [formData, setFormData] = useState({
        date: '',
        driver_id: '',
        from: '',
        time: '',
        to: '',
        user_id: '',
    });

    // Fetch lesson data when component mounts
    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const docRef = doc(db, "lessons", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const lessonData = docSnap.data();
                    setFormData({
                        date: lessonData.date || '',
                        driver_id: lessonData.driver_id || '',
                        from: lessonData.from || '',
                        time: lessonData.time || '',
                        to: lessonData.to || '',
                        user_id: lessonData.user_id || '',
                    });
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching lesson:", error);
            }
        };

        fetchLesson();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Form validation function
    const validateForm = () => {
        const { date, from, to, driver_id } = formData;

        if (!date || !from || !to || !driver_id) {
            toast.error("Please fill in all required fields.");
            return false;
        }

        // Check that the 'to' date is after the 'from' date
        if (new Date(to) <= new Date(from)) {
            toast.error("'To' date must be later than 'From' date.");
            return false;
        }

        // Check that the 'date' is not in the past
        if (new Date(date) < new Date()) {
            toast.error("The 'Date' cannot be in the past.");
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the form before submitting
        if (!validateForm()) return;

        try {
            const lessonDocRef = doc(db, "lessons", id);
            const { differenceMs, seconds, minutes, hours } = getTimeDifference(convertTimeToTimestamp(formData.to), convertTimeToTimestamp(formData.from));

            await setDoc(lessonDocRef, {
                date: new Date(formData.date),
                driver_id: formData.driver_id,
                from: Timestamp.fromMillis(convertTimeToTimestamp(formData.from)),
                time: `${String(hours).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`,
                to: Timestamp.fromMillis(convertTimeToTimestamp(formData.to)),
                user_id: formData.user_id,
                updated_at: serverTimestamp(),
            }, { merge: true });

            router.push("/user/lessons");
            toast.success("Lesson updated successfully");
        } catch (error) {
            console.error('Error updating lesson:', error);
            toast.error(`Error: ${error.message}`);
        }
    };

    return (
        <>
            <div className="update">
                <div className="p-8 rounded border border-gray-200">
                    <h1 className="font-medium text-3xl">Edit Lesson</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-8 grid lg:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="date" className="text-sm text-gray-700 block mb-1 font-medium">
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
                                    Driver ID
                                </label>
                                <input
                                    type="text"
                                    name="driver_id"
                                    id="driver_id"
                                    value={formData.driver_id}
                                    readOnly
                                    className="bg-gray-200 border border-gray-200 rounded py-1 px-3 block text-gray-500 w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="from" className="text-sm text-gray-700 block mb-1 font-medium">
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
                                <label htmlFor="time" className="text-sm text-gray-700 block mb-1 font-medium">
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
                                <label htmlFor="to" className="text-sm text-gray-700 block mb-1 font-medium">
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
                            <div>
                                <label htmlFor="user_id" className="text-sm text-gray-700 block mb-1 font-medium">
                                    User ID
                                </label>
                                <input
                                    type="text"
                                    name="user_id"
                                    id="user_id"
                                    value={formData.user_id}
                                    onChange={handleChange}
                                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                                    placeholder="Enter user ID"
                                />
                            </div>
                        </div>
                        <div className="space-x-4 mt-8">
                            <button
                                type="submit"
                                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
                            >
                                Update Lesson
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
