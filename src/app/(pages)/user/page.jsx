"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/app/firebase'; 
import { collection, query, doc, where, getDoc, getDocs, Timestamp } from 'firebase/firestore';
import { AiFillDashboard } from "react-icons/ai";
import { BiHome } from 'react-icons/bi';
import ChartUser from '@/app/components/ChartUser';
import Loader from '@/app/components/loader';
import Link from 'next/link';
import { MdDirectionsCar, MdLocalShipping } from "react-icons/md";
import { FaClock, FaGraduationCap, FaDollarSign } from "react-icons/fa";

export default function UserPage() {
    const [userData, setUserData] = useState(null);
    const [packageData, setPackageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);
    const [userPayments, setUserPayments] = useState([]);

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
                        fetchUserPayments(userId);                        
                        if (user.package_id) {
                            fetchPackageData(user.package_id);
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

    const fetchUserPayments = async (userId) => {
        try {
            const paymentsRef = collection(db, "payments");
            const q = query(paymentsRef, where("user_id", "==", userId));
            const querySnapshot = await getDocs(q);
            const userPayments = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUserPayments(userPayments);
        } catch (error) {
            console.error("Error fetching user payments:", error);
        }
    };

    const subtractTime = (time1, time2) => {
        const [hours1, minutes1] = time1.split(":").map(Number);
        const [hours2, minutes2] = time2.split(":").map(Number);

        const totalMinutes1 = hours1 * 60 + minutes1;
        const totalMinutes2 = hours2 * 60 + minutes2;
        let remainingMinutes = totalMinutes1 - totalMinutes2;
        if (remainingMinutes < 0) {
            remainingMinutes = 0;
        }
        const hours = Math.floor(remainingMinutes / 60);
        const minutes = remainingMinutes % 60;
        return `${hours}:${minutes.toString().padStart(2, "0")}`;
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
                            href="/Pricing"
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
                <div className="boxes grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            color: "bg-gradient-to-r from-blue-400 to-blue-600",
                            icon: <FaClock className="text-white text-4xl" />,
                            label: "Hours Completed",
                            value: subtractTime(userData?.total_driving_hours, userData?.driving_hours) ?? 0,
                        },
                        {
                            color: "bg-gradient-to-r from-yellow-300 to-yellow-500",
                            icon: <MdDirectionsCar className="text-white text-4xl" />,
                            label: "Car for Test Status",
                            value: userData?.car_test === true ? "Not Applicable" : "Not Used Yet",
                        },
                        {
                            color: "bg-gradient-to-r from-purple-300 to-purple-500",
                            icon: <MdLocalShipping className="text-white text-4xl" />,
                            label: "Package Type",
                            value: packageData?.name,
                        },
                        {
                            color: "bg-gradient-to-r from-teal-400 to-teal-600",
                            icon: <FaClock className="text-white text-4xl" />,
                            label: "Hours Remaining",
                            value: userData?.driving_hours || 0,
                        },
                        {
                            color: "bg-gradient-to-r from-pink-400 to-pink-600",
                            icon: <FaGraduationCap className="text-white text-4xl" />,
                            label: "Online Training",
                            value: userData?.is_online_training_completed ? "Completed" : "Not Completed",
                        },
                        {
                            color: "bg-gradient-to-r from-green-400 to-green-600",
                            icon: <FaDollarSign className="text-white text-4xl" />,
                            label: "Total Payments",
                            value: userPayments?.reduce((total, payment) => total + parseFloat(payment.amount), 0).toFixed(2) || "0.00",
                        }
                    ].map((box, index) => (
                        <div
                            key={index}
                            className={`${box.color} rounded-lg flex flex-col items-center p-6 transition-all duration-200 hover:scale-105 hover:shadow-2xl`}
                        >
                            {box.icon}
                            <span className="text-lg font-semibold text-white mt-2">{box.label}</span>
                            <span className="text-3xl font-bold text-white mt-2">{box.value}</span>
                        </div>
                    ))}
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
