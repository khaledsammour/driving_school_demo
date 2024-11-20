"use client";
import React, { useState, useEffect } from "react";
import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "@/app/firebase";

const DriverRating = ({ onClose }) => {
    const [rating, setRating] = useState(0);
    const [IdUser, setIdUser] = useState(null);
    const [message, setMessage] = useState("");
    const [users, setUsers] = useState({
        first_name: "user",
        middle_name: "user",
        type: "user",
        id: "",
    });

    const handleRating = (rate) => {
        setRating(rate);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    useEffect(() => {
        const fetchUser = async () => {
            if (!IdUser) return;

            try {
                const docRef = doc(db, "users", IdUser);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setUsers((prevUsers) => ({
                        ...prevUsers,
                        ...userData,
                    }));
                } else {
                    console.error("No such document!");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, [IdUser]);

    useEffect(() => {
        const storedUserId = localStorage.getItem("user");
        if (storedUserId) {
            setIdUser(storedUserId);
            setUsers((prevUsers) => ({ ...prevUsers, id: storedUserId }));
        } else {
            console.error("User ID not found in localStorage");
        }
    }, []);

    const handleSubmit = async () => {
        const userData = {
            name: `${users.first_name} ${users.middle_name}`,
            type: users.type,
            rating: rating.toString(),
            description: message,
            gallery: "https://ibb.co/9bS9d6x",
            createdAt: serverTimestamp(),
            id: users.id,
        };

        try {
            const docRef = await addDoc(collection(db, "ratings"), userData);
            console.log("Document written with ID: ", docRef.id);
            toast.success("Rating added successfully!");
            onClose();
        } catch (error) {
            console.error("Error adding document:", error);
            toast.error("An error occurred while submitting your rating.");
        }
    };

    return (
        <div className="fixed inset-0 top-0 right-[-24px] bg-black bg-opacity-50 py-6 flex flex-col justify-center sm:py-12 z-50">
            <div className="py-3 sm:max-w-lg md:max-w-xl sm:mx-auto w-full">
                <div className="bg-white mx-5 lg:left-0 md:left-0 left-[58px] w-[300px] sm:min-w-[300px] md:min-w-[450px] flex flex-col rounded-xl shadow-lg relative">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <div className="px-6 py-5">
                        <h2 className="text-gray-800 text-2xl sm:text-3xl font-semibold">Your opinion matters to us!</h2>
                    </div>

                    <div className="bg-gray-200 w-full flex flex-col items-center">
                        <div className="flex flex-col items-center py-6 space-y-3">
                            <span className="text-lg sm:text-xl text-gray-800">How was the quality of the call?</span>
                            <div className="flex space-x-3">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <svg
                                        key={value}
                                        className={`w-8 h-8 sm:w-12 sm:h-12 ${value <= rating ? "text-yellow-500" : "text-gray-500"}`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        onClick={() => handleRating(value)}
                                    >
                                        <path
                                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                        />
                                    </svg>
                                ))}
                            </div>
                        </div>

                        <div className="w-3/4 sm:w-2/3 md:w-3/4 flex flex-col">
                            <textarea
                                rows="3"
                                className="p-4 text-gray-500 rounded-xl resize-none w-full"
                                placeholder="Leave a message, if you want"
                                value={message}
                                onChange={handleMessageChange}
                            />
                            <button
                                className="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white"
                                onClick={handleSubmit}
                            >
                                Rate now
                            </button>
                        </div>
                    </div>

                    <div className="h-20 flex items-center justify-center">
                        <span className="text-gray-600 cursor-pointer" onClick={onClose}>
                            Maybe later
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverRating;
