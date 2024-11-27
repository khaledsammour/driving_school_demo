"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/app/firebase'; // Import your Firebase config
import { doc, getDoc } from 'firebase/firestore';

import { AiFillDashboard } from "react-icons/ai";
import { BiHome } from 'react-icons/bi';
import { MdOutlinePlayLesson } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { LuPackageCheck } from "react-icons/lu";
import ChartUser from '@/app/components/ChartUser';
import Loader from '@/app/components/loader';
import Link from 'next/link';

export default function UserPage() {
    const [userData, setUserData] = useState(null);
    const [packageData, setPackageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUserId = localStorage.getItem("IdUser");
            if (storedUserId) {
                setUserId(storedUserId);
            }
        }
    }, []);

    useEffect(() => {
        if (userId) {
            const fetchUserData = async () => {
                try {
                    const userRef = doc(db, "users", userId);
                    const userSnapshot = await getDoc(userRef);
                    if (userSnapshot.exists()) {
                        const user = userSnapshot.data();
                        setUserData(user);

                        if (user.packageId) {
                            fetchPackageData(user.packageId);
                        }
                    } else {
                        console.log("No such user document!");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchUserData();
        }
    }, [userId]);

    const fetchPackageData = async (packageId) => {
        try {
            const packageRef = doc(db, "packages", packageId);
            const packageSnapshot = await getDoc(packageRef);
            if (packageSnapshot.exists()) {
                setPackageData(packageSnapshot.data());
            } else {
                console.log("No such package document!");
            }
        } catch (error) {
            console.error("Error fetching package data:", error);
        }
    };

    if (loading) {
        return <><Loader /></>;
    }

    return (
        <div className="User py-6">
            <div className="overview">
                <div className="title flex items-center justify-between mb-12">
                    <div className="flex items-center justify-between">
                        <BiHome className='h-9 w-9 bg-primary rounded-lg text-blue-600 flex items-center justify-center text-xl' />
                        <span className="text text-2xl font-bold ml-2 text-blue-600">Dashboard</span>
                    </div>
                    <div className="flex">
                        <Link
                            href="/MapDriver"
                            class="brightness-150 dark:brightness-100 group hover:shadow-lg hover:shadow-yellow-700/60 transition ease-in-out hover:scale-105 p-1 rounded-xl bg-gradient-to-br from-yellow-800 via-yellow-600 to-yellow-800 hover:from-yellow-700 hover:via-yellow-800 hover:to-yellow-600"
                        >
                            <div
                                className="px-6 py-2 backdrop-blur-xl bg-black/80 rounded-xl font-bold w-full h-full"
                            >
                                <div
                                    className="group-hover:scale-100 flex group-hover:text-yellow-500 text-yellow-600 gap-1 "
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.8"
                                        className="w-6 h-6 stroke-yellow-600 group-hover:stroke-yellow-500 group-hover:stroke-{1.99}"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                                        ></path>
                                    </svg>
                                    Upgrade
                                </div>
                            </div>
                        </Link>


                    </div>
                </div>

                <div className="boxes grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                    <div className="box bg-[#4da3ff] rounded-lg flex flex-col items-center p-4 transition-all duration-150 hover:shadow-lg">
                        <MdOutlinePlayLesson className="text-text-color text-4xl" />
                        <span className="text text-lg font-medium text-black">Total Lesson</span>
                        <span className="number text-4xl font-medium text-black">{userData?.totalLessons || 0}</span>
                    </div>

                    <div className="box bg-[#ffe6ac] rounded-lg flex flex-col items-center p-4 transition-all duration-150 hover:shadow-lg">
                        <FaHistory className="text-text-color text-4xl" />
                        <span className="text text-lg font-medium text-black">History Lesson</span>
                        <span className="number text-4xl font-medium text-black">
                            {userData?.historyLessons || 0}
                        </span>
                    </div>

                    <div className="box bg-[#e7d1fc] rounded-lg flex flex-col items-center p-4 transition-all duration-150 hover:shadow-lg">
                        <LuPackageCheck className="text-text-color text-4xl" />
                        <span className="text text-lg font-medium text-black">Current Package</span>
                        <span className="number text-4xl font-medium text-black">
                            {packageData?.name || "Free"}
                        </span>
                    </div>
                    <div className="box bg-[#4da3ff] rounded-lg flex flex-col items-center p-4 transition-all duration-150 hover:shadow-lg">
                        <MdOutlinePlayLesson className="text-text-color text-4xl" />
                        <span className="text text-lg font-medium text-black">Driving Hours</span>
                        <span className="number text-4xl font-medium text-black">{userData?.driving_hours || 0}</span>
                    </div>

                    <div className="box bg-[#ffe6ac] rounded-lg flex flex-col items-center p-4 transition-all duration-150 hover:shadow-lg">
                        <FaHistory className="text-text-color text-4xl" />
                        <span className="text text-lg font-medium text-black">Online Training Hours</span>
                        <span className="number text-4xl font-medium text-black">
                            {userData?.online_training_hours || 0}
                        </span>
                    </div>

                    <div className="box bg-[#e7d1fc] rounded-lg flex flex-col items-center p-4 transition-all duration-150 hover:shadow-lg">
                        <LuPackageCheck className="text-text-color text-4xl" />
                        <span className="text text-lg font-medium text-black">Car Test</span>
                        <span className="number text-4xl font-medium text-black">
                            {userData?.car_test === true ? "Active" : "Inactive"}
                        </span>
                    </div>
                </div>

                <div className="users pt-4">
                    <div className="title flex items-center mb-8">
                        <AiFillDashboard className='h-9 w-9 bg-primary rounded-lg text-blue-600 flex items-center justify-center text-xl' />
                        <span className="text text-2xl font-medium ml-2 text-blue-600">User Activity</span>
                    </div>
                    <div className="chart w-full max-w-full">
                        <ChartUser />
                    </div>
                </div>
            </div>
        </div>
    );
}
