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

                        // If packageId exists, fetch the package data
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
                <div className="flex justify-between items-center">
                    <div className="title flex items-center mb-12">
                        <BiHome className='h-9 w-9 bg-primary rounded-lg text-blue-600 flex items-center justify-center text-xl' />
                        <span className="text text-2xl font-bold ml-2 text-blue-600">Dashboard</span>
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
