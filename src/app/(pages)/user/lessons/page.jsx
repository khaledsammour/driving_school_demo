'use client';
import TableLessons from '@/app/components/TableLessons';
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import { MdOutlinePlayLesson } from "react-icons/md";
import { query, collection, where, getDocs, getDoc, doc } from "firebase/firestore";
import toast from "react-hot-toast";

import { db } from "@/app/firebase";

export default function Page() {
    const [userId, setUserId] = useState(null);
    const [userHasAcceptedLicense, setUserHasAcceptedLicense] = useState(false); // State for license status
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUserId = localStorage.getItem("IdUser");
            if (storedUserId) {
                setUserId(storedUserId);
            }
        }
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            if (!userId) return;

            try {
                const docRef = doc(db, "users", userId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    console.log("🚀 ~ fetchUser ~ userData:", userData)
                    setUser(userData);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    useEffect(() => {
        const getLessonsWithUsers = async () => {
            if (!userId) return;

            try {
                // Step 1: Query uploads where user_id matches userId and status is 'Accepted'
                const approvedQuery = query(
                    collection(db, "uploads"),
                    where('userId', "==", userId),
                    where('status', "==", 'Accepted'),
                    where('fileType', "==", 'license')
                );

                const querySnapshot = await getDocs(approvedQuery);

                // Check if the user has accepted the license
                if (querySnapshot.empty) {
                    setUserHasAcceptedLicense(false);
                } else {
                    setUserHasAcceptedLicense(true);
                }
            } catch (err) {
                console.error(err);
            }
        };

        getLessonsWithUsers();
    }, [userId]);  // The effect will re-run when userId changes

    const handleAddLessonClick = (e) => {
        if (!userHasAcceptedLicense) {
            e.preventDefault(); // Prevent navigation if license not accepted
            toast.error("Your license must be accepted to add a new lesson.");
        }
        if (!user?.is_verify) {
            e.preventDefault(); // Prevent navigation if license not accepted
            toast.error("You should complete your profile")
        }
    };

    return (
        <>
            <div className="lessons">
                <div className="title flex items-center justify-between mb-12">
                    <div className="flex items-center justify-between">
                        <MdOutlinePlayLesson className='h-9 w-9 bg-primary rounded-lg text-blue-600 flex items-center justify-center text-md' />
                        <span className="text text-xl font-bold ml-2 text-blue-600">Lessons</span>
                    </div>
                    <div className="flex">
                        <Link
                            href="/user/lessons/add"
                            onClick={handleAddLessonClick}
                            className={`text-green-600 text-base font-normal border border-green-600 py-1 px-2 rounded cursor-pointer hover:bg-green-50 ${!userHasAcceptedLicense ? 'cursor-not-allowed opacity-50' : ''}`}
                        >
                            Add New Lesson
                        </Link>
                    </div>
                </div>
                <div className="table w-full py-6">
                    <TableLessons type="user" />
                </div>
            </div>
        </>
    );
}
