"use client";
import React, { useState, useEffect } from 'react';
import { db } from '@/app/firebase';
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
export default function Page() {
    const [userId, setUserId] = useState(null);
    const [packageId, setPackageId] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [packageInfo, setPackageInfo] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUserId = localStorage.getItem("IdUser");
            const storedPackageId = localStorage.getItem("PackageId");

            if (storedUserId) {
                setUserId(storedUserId);
            }

            if (storedPackageId) {
                setPackageId(storedPackageId);
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
                        setUserInfo(userSnapshot.data());
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching user info:", error);
                }
            };

            fetchUserData();
        }
    }, [userId]);

    useEffect(() => {
        if (packageId) {
            const fetchPackageData = async () => {
                try {
                    const packageRef = doc(db, "packages", packageId);
                    const packageSnapshot = await getDoc(packageRef);
                    if (packageSnapshot.exists()) {
                        setPackageInfo(packageSnapshot.data());
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching package info:", error);
                }
            };

            fetchPackageData();
        }
    }, [packageId]);


    const HandleSubmit = async (packageData) => {
        try {
            const userRef = doc(db, "users", userId);

            await updateDoc(userRef, {
                driving_hours: packageInfo?.driving_hours,
                online_training_hours: packageInfo?.online_training_hours,
                packageId: packageId,
                car_test: packageInfo?.car_test,
            });

            await addDoc(collection(db, "payments"), {
                amount: packageInfo.price,
                status: "Completed",
                user_id: userInfo.uid,
                created_at: serverTimestamp(),
            });

            console.log("User document updated with package data.");
            router.push("/user");
        } catch (error) {
            console.error("Error updating user document:", error);
        }
    };


    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-xl p-8 max-w-lg w-full">
                <div className="text-center">
                    <div className="flex justify-center items-center bg-green-100 text-green-600 w-16 h-16 mx-auto rounded-full">
                        <svg className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4"></path>
                            <circle cx="12" cy="12" r="10"></circle>
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mt-4">Payment Successful!</h1>
                    <p className="text-gray-600 mt-2">Thank you for your purchase. Your payment has been processed successfully.</p>
                </div>

                <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-800">Payment Details</h2>
                    <div className="mt-2 space-y-2">

                        {packageInfo && (
                            <div className="flex justify-between">
                                <span className="text-gray-500">Package Name:</span>
                                <span className="text-gray-800 font-medium">{packageInfo.name}</span>
                            </div>
                        )}

                        {userInfo && (
                            <div className="flex justify-between">
                                <span className="text-gray-500">Package Price:</span>
                                <span className="text-gray-800 font-medium">{packageInfo.price}</span>
                            </div>
                        )}
                        <div className="flex justify-between">
                            <span className="text-gray-500">Transaction ID:</span>
                            <span className="text-gray-800 font-medium">#1234567890</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Payment Method:</span>
                            <span className="text-gray-800 font-medium">Credit Card</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Date:</span>
                            <span className="text-gray-800 font-medium">{new Date().toDateString()}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <button
                        onClick={HandleSubmit}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}
