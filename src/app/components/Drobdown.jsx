"use client";
import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Logout } from "../services/authService";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dropdown({ imgSrc }) {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [isAdmin, setIsAdmin] = useState(null);
    const router = useRouter();
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setOpenDropdown((prev) => !prev);
    };

    const handleLogOut = async () => {
        try {
            await Logout();
            toast.success("Successfully logged out!");
            router.push("/login");
            if (typeof window !== "undefined") {
                localStorage.removeItem("typeUser");
            }
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Logout failed. Please try again.");
        }
    };

    // Set `isAdmin` based on localStorage after the component mounts
    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsAdmin(localStorage.getItem("typeUser"));
        }
    }, []);

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
                                <Link href={isAdmin === "admin" ? "/admin" : "/user"} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
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
