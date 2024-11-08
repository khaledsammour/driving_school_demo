"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/app/firebase';

export default function Page({ params }) {
    const { id } = params;
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

    return (
        <>
            <div className="view">
                <div className="p-8 rounded border border-gray-200">
                    <h1 className="font-medium text-3xl">View Lesson</h1>
                    <div className="mt-8 grid lg:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-700 block mb-1 font-medium">
                                Date
                            </label>
                            <input
                                type="date"
                                value={formData.date}
                                readOnly
                                className="bg-gray-200 border border-gray-200 rounded py-1 px-3 block text-gray-500 w-full"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-700 block mb-1 font-medium">
                                Driver ID
                            </label>
                            <input
                                type="text"
                                value={formData.driver_id}
                                readOnly
                                className="bg-gray-200 border border-gray-200 rounded py-1 px-3 block text-gray-500 w-full"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-700 block mb-1 font-medium">
                                From
                            </label>
                            <input
                                type="text"
                                value={formData.from}
                                readOnly
                                className="bg-gray-200 border border-gray-200 rounded py-1 px-3 block text-gray-500 w-full"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-700 block mb-1 font-medium">
                                Time
                            </label>
                            <input
                                type="time"
                                value={formData.time}
                                readOnly
                                className="bg-gray-200 border border-gray-200 rounded py-1 px-3 block text-gray-500 w-full"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-700 block mb-1 font-medium">
                                To
                            </label>
                            <input
                                type="text"
                                value={formData.to}
                                readOnly
                                className="bg-gray-200 border border-gray-200 rounded py-1 px-3 block text-gray-500 w-full"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-700 block mb-1 font-medium">
                                User ID
                            </label>
                            <input
                                type="text"
                                value={formData.user_id}
                                readOnly
                                className="bg-gray-200 border border-gray-200 rounded py-1 px-3 block text-gray-500 w-full"
                            />
                        </div>
                    </div>
                    <div className="space-x-4 mt-8">
                        <Link href="/user/lessons">
                            <button
                                type="button"
                                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
                            >
                                Back to Lessons
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
