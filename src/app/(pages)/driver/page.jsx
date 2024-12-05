"use client";
import React, { useEffect, useState } from "react";
import { AiFillDashboard } from "react-icons/ai";
import { BiHome } from "react-icons/bi";
import { MdDirectionsCar, MdLocalShipping, MdOutlinePlayLesson } from "react-icons/md";
import { FaClock, FaDollarSign, FaFile, FaFileAlt, FaGraduationCap, FaHistory, FaStar } from "react-icons/fa";
import { LuPackageCheck } from "react-icons/lu";
import ChartUser from "@/app/components/ChartUser";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/firebase";
import { v4 as uuidv4 } from "uuid";
import Loader from "@/app/components/loader";
import toast from "react-hot-toast";

export default function UserPage() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [userId, setUserId] = useState(null);

    // Fetch userId from localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            const Id = localStorage.getItem("IdUser");
            if (Id) {
                setUserId(Id);
            }
        }
    }, []);

    // Fetch payments and calculate total price
    useEffect(() => {
        const fetchPayments = async () => {
            if (!userId) {
                setError("User ID not found in local storage.");
                setLoading(false);
                return;
            }

            try {
                const paymentsRef = collection(db, "payments");
                const q = query(paymentsRef, where("user_id", "==", userId));
                const querySnapshot = await getDocs(q);

                const paymentsData = querySnapshot.docs.map((doc) => ({
                    id: uuidv4(),
                    ...doc.data(),
                }));

                const total = paymentsData.reduce((sum, payment) => {
                    const price = parseFloat(payment.amount) || 0;
                    return sum + price;
                }, 0);

                setPayments(paymentsData);
                setTotalPrice(total);
            } catch (err) {
                console.error("Error fetching payments:", err);
                toast.error("Failed to fetch payments.");
                setError("Failed to fetch payments.");
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchPayments();
        }
    }, [userId]);

    if (loading) return <Loader />;
    if (error) {
        toast.error(error);
        return null;
    }

    return (
        <div className="User py-6">
            <div className="overview">
                {/* Dashboard Header */}
                <div className="title flex items-center mb-12">
                    <BiHome className="h-9 w-9 bg-primary rounded-lg text-blue-600 flex items-center justify-center text-xl" />
                    <span className="text text-2xl font-bold ml-2 text-blue-600">
                        Dashboard
                    </span>
                </div>

                {/* Summary Boxes */}
                
                <div className="boxes grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        {
                            color: "bg-gradient-to-r from-blue-400 to-blue-600",
                            icon: <FaClock className="text-white text-4xl" />,
                            label: "Hours Completed",
                            value: '0'
                        },
                        {
                            color: "bg-gradient-to-r from-yellow-300 to-yellow-500",
                            icon: <MdDirectionsCar className="text-white text-4xl" />,
                            label: "Hours Scheduled",
                            value: '0'
                        },
                        {
                            color: "bg-gradient-to-r from-purple-300 to-purple-500",
                            icon: <MdLocalShipping className="text-white text-4xl" />,
                            label: "Today open hours",
                            value: '0'
                        },
                        {
                            color: "bg-gradient-to-r from-teal-400 to-teal-600",
                            icon: <FaClock className="text-white text-4xl" />,
                            label: "Car Test completed",
                            value: '0'
                        },
                        {
                            color: "bg-gradient-to-r from-pink-400 to-pink-600",
                            icon: <FaGraduationCap className="text-white text-4xl" />,
                            label: "Car Test Scheduled",
                            value: '0'
                        },
                        {
                            color: "bg-gradient-to-r from-green-400 to-green-600",
                            icon: <FaDollarSign className="text-white text-4xl" />,
                            label: "Money Earned",
                            value: '0'
                        },
                        {
                            color: "bg-gradient-to-r from-red-400 to-red-600",
                            icon: <FaDollarSign className="text-white text-4xl" />,
                            label: "Money Transferred",
                            value: '0'
                        },
                        {
                            color: "bg-gradient-to-r from-green-400 to-green-600",
                            icon: <FaDollarSign className="text-white text-4xl" />,
                            label: "Remaining Money",
                            value: '0'
                        },
                        {
                            color: "bg-gradient-to-r from-green-400 to-green-600",
                            icon: <FaStar className="text-white text-4xl" />,
                            label: "Rating",
                            value: '0'
                        },
                        {
                            color: "bg-gradient-to-r from-green-400 to-green-600",
                            icon: <FaFile className="text-white text-4xl" />,
                            label: "Documents Required",
                            value: '0'
                        },
                        {
                            color: "bg-gradient-to-r from-green-400 to-green-600",
                            icon: <FaFileAlt className="text-white text-4xl" />,
                            label: "Document To expire (2 month to expiry)",
                            value: '0'
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

                {/* User Activity Section */}
                <div className="users pt-4">
                    <div className="title flex items-center mb-8">
                        <AiFillDashboard className="h-9 w-9 bg-primary rounded-lg text-blue-600 flex items-center justify-center text-xl" />
                        <span className="text text-2xl font-medium ml-2 text-blue-600">
                            User Activity
                        </span>
                    </div>
                    <div className="chart w-full max-w-full">
                        <ChartUser />
                    </div>
                </div>
            </div>
        </div>
    );
}
