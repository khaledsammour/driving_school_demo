"use client";
import React, { useEffect, useState } from "react";
import { AiFillDashboard } from "react-icons/ai";
import { BiHome } from "react-icons/bi";
import { MdOutlinePlayLesson } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
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
                <div className="boxes grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                    <div className="box bg-[#4da3ff] rounded-lg flex flex-col items-center p-4 transition-all duration-150 hover:shadow-lg">
                        <MdOutlinePlayLesson className="text-text-color text-4xl" />
                        <span className="text text-lg font-medium text-black">
                            Total Lesson
                        </span>
                        <span className="number text-4xl font-medium text-black">0</span>
                    </div>

                    <div className="box bg-[#ffe6ac] rounded-lg flex flex-col items-center p-4 transition-all duration-150 hover:shadow-lg">
                        <FaHistory className="text-text-color text-4xl" />
                        <span className="text text-lg font-medium text-black">
                            History Lesson
                        </span>
                        <span className="number text-4xl font-medium text-black">0</span>
                    </div>

                    <div className="box bg-[#e7d1fc] rounded-lg flex flex-col items-center p-4 transition-all duration-150 hover:shadow-lg">
                        <LuPackageCheck className="text-text-color text-4xl" />
                        <span className="text text-lg font-medium text-black">
                            Total Payment
                        </span>
                        <span className="number text-4xl font-medium text-black">
                            $ {totalPrice.toFixed(2)}
                        </span>
                    </div>
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
