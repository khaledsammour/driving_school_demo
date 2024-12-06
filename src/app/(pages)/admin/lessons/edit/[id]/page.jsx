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
    const [oldTime, setOldTime] = useState('00:00');


    // Fetch lesson data when component mounts
    function timestampToTimeString(timestamp) {
        const date = timestamp.toDate(); // Convert Timestamp to JavaScript Date object
        const hours = date.getHours().toString().padStart(2, '0'); // Ensure 2 digits
        const minutes = date.getMinutes().toString().padStart(2, '0'); // Ensure 2 digits        
        return `${hours}:${minutes}`;
    }
    function timestampToDateString(timestamp) {
        const date = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date object
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`; // Format as "YYYY-MM-DD"
    }
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
    function addTimes(time1, time2) {
        // Split the times into hours and minutes
        let [hours1, minutes1] = time1.split(':').map(Number);
        let [hours2, minutes2] = time2.split(':').map(Number);
        
        // Add the minutes and handle overflow
        let totalMinutes = minutes1 + minutes2;
        let extraHours = Math.floor(totalMinutes / 60);
        let finalMinutes = totalMinutes % 60;
        
        // Add the hours and handle overflow
        let totalHours = hours1 + hours2 + extraHours;
        let finalHours = totalHours % 24; // In case of overflow past 24 hours
        
        // Return the result in "HH:MM" format
        return `${String(finalHours).padStart(2, '0')}:${String(finalMinutes).padStart(2, '0')}`;
      }

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const docRef = doc(db, "lessons", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const lessonData = docSnap.data();
                    let driver = await getDoc(doc(db, "users", lessonData.driver_id))
                    let user = await getDoc(doc(db, "users", lessonData.user_id))
                    setOldTime(lessonData.time)
                    setFormData({
                        date: timestampToDateString(lessonData.date) || '',
                        driver_id: lessonData.driver_id || '',
                        driver_name: driver.exists() ? driver.data().first_name + ' ' + driver.data().last_name : '',
                        from: timestampToTimeString(lessonData.from) || '',
                        time: lessonData.time || '',
                        to: timestampToTimeString(lessonData.to) || '',
                        user_id: lessonData.user_id || '',
                        user_name: user.exists() ? user.data().first_name + ' ' + user.data().last_name : '',
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Update existing lesson data in Firestore
            const lessonDocRef = doc(db, "lessons", id);
            const { differenceMs, seconds, minutes, hours } = getTimeDifference(convertTimeToTimestamp(formData.to), convertTimeToTimestamp(formData.from));

            await setDoc(lessonDocRef, {
                date: new Date(formData.date),
                driver_id: formData.driver_id,
                status: formData.status,
                from: Timestamp.fromMillis(convertTimeToTimestamp(formData.from)),
                time: `${String(hours).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`,
                to: Timestamp.fromMillis(convertTimeToTimestamp(formData.to)),
                user_id: formData.user_id,
                updated_at: serverTimestamp(),
            }, { merge: true });
            const userDocRef = doc(db, "users", formData.user_id);
            const docSnap = await getDoc(userDocRef);
            await setDoc(userDocRef, {
                driving_hours: timeDifference(`${String(hours).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`, addTimes(docSnap.data().driving_hours, oldTime))
            }, { merge: true });

            router.push("/driver/lessons");
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
                                <label htmlFor="driver_name" className="text-sm text-gray-700 block mb-1 font-medium">
                                    Driver
                                </label>
                                <input
                                    type="text"
                                    name="driver_name"
                                    id="driver_name"
                                    value={formData.driver_name}
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
                                    placeholder="Enter starting location"
                                />
                            </div>
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
                                <label htmlFor="user_name" className="text-sm text-gray-700 block mb-1 font-medium">
                                    User
                                </label>
                                <input
                                    type="text"
                                    name="user_name"
                                    id="user_name"
                                    value={formData.user_name}
                                    onChange={handleChange}
                                    readOnly
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
                            <Link href="/admin/lessons">
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
