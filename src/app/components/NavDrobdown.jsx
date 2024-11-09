"use client";
import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Logout } from "../services/authService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { db } from "@/app/firebase";
import { doc, getDoc } from "firebase/firestore";
export default function NavDrobdown({ imgSrc }) {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [typeUser, setTypeUser] = useState();
    const [IdUser, setIdUser] = useState(null);
    const router = useRouter();
    const dropdownRef = useRef(null);


    useEffect(() => {
        const storedId = localStorage.getItem("IdUser");
        if (storedId) {
            setIdUser(storedId);
        }
    }, []);


    const toggleDropdown = () => {
        setOpenDropdown((prev) => !prev);
    };




    useEffect(() => {
        const fetchUser = async () => {
            if (!IdUser) return;

            try {
                const docRef = doc(db, "users", IdUser);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setTypeUser(userData.type);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser();
    }, [IdUser]);

    const handleLogOut = async () => {
        try {
            await Logout();
            toast.success("Successfully logged out!");
            router.push("/login");
            if (typeof window !== "undefined") {
                localStorage.removeItem("typeUser");
                localStorage.removeItem("IdUser");
            }
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Logout failed. Please try again.");
        }
    };


    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpenDropdown(false);
            }
        };

        // Attach event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Clean up event listener on unmount
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div className="dropdown" ref={dropdownRef}>
            <div className="relative z-50 inline-block text-left">
                <button
                    onClick={toggleDropdown}
                    className="flex text-sm mx-2 lg:mx-5 bg-gray-300 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    type="button"
                >
                    <span className="sr-only">Open user menu</span>
                    <img className="w-10 h-10 rounded-full" src={imgSrc} alt="admin photo" />
                </button>

                {openDropdown && (
                    <div className="absolute right-0 z-50 top-14 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                            <li>
                                <Link href={typeUser === "user" ? "/user" : typeUser === "driver" ? "/driver" : "/admin" } className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Dashboard
                                </Link>
                            </li>
                        </ul>
                        <div className="py-2">
                            <span
                                onClick={handleLogOut}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer dark:text-gray-200"
                            >
                                Sign out
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
