"use client";
import React, { useState, useEffect } from "react";
import { BiHome, BiUser, BiLogOut, BiMenu, BiPackage, BiSearch } from "react-icons/bi";
import { IoDocumentsSharp } from "react-icons/io5";
import { MdOutlinePayment, MdOutlinePlayLesson } from "react-icons/md";
import { TbLicense } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import logo from "@/app/assets/logo.png";
import userImg from "@/app/assets/userImg.jpg";
import Link from "next/link";
import { Logout } from "@/app/services/authService";
import toast from "react-hot-toast";
import NavDrobdown from "@/app/components/NavDrobdown";
import { useRouter } from "next/navigation";
import DriverRating from "../../../app/components/DriverRating";
import { RiStarFill } from "react-icons/ri";

export default function Layout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [ShowRate, setShowRate] = useState(false);
    const router = useRouter();



    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
        setShowRate(false);
    };

    const handleLogOut = () => {
        Logout();
        toast.success("Successfully logged out!");
        router.push("/login");
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    return (
        <div className="user_dashboard flex min-h-screen">
            <aside className={`fixed top-0 left-0 h-full ${isSidebarOpen ? "w-64" : "w-16"} bg-white transition-all duration-300 ease-in-out border-r border-gray-300 z-50`}>
                <div className="flex items-center p-4">
                    <Link href="/" className="flex items-center">
                        <div className="flex justify-center items-center w-12">
                            <img
                                src={logo.src}
                                alt="Logo"
                                className={`w-10 h-10 rounded-full ${!isSidebarOpen && "hidden"} object-cover`}
                            />
                        </div>
                        <span className={`text-black font-bold text-lg ml-3 ${!isSidebarOpen && "hidden"} whitespace-nowrap`}>
                            Formula One
                        </span>
                    </Link>
                    <div className={`ml-auto top-6 ${!isSidebarOpen ? "absolute left-5" : "absolute right-4"}`}>
                        <BiMenu onClick={toggleSidebar} className="text-black cursor-pointer" size={24} />
                    </div>
                </div>

                <div className="flex flex-col justify-between h-[calc(100%-130px)] mt-10">
                    <ul className="space-y-3">
                        <li className="text-black hover:text-blue-500 cursor-pointer">
                            <Link href="/user" className={`flex items-center p-3 ${!isSidebarOpen ? "justify-center" : "justify-start"}`}>
                                <BiHome className="w-6 h-6" />
                                <span className={`ml-3 text-base ${!isSidebarOpen && "hidden"} transition-all duration-300`}>Dashboard</span>
                            </Link>
                        </li>
                        <li className="text-black hover:text-blue-500 cursor-pointer">
                            <Link href="/user/lessons" className={`flex items-center p-3 ${!isSidebarOpen ? "justify-center" : "justify-start"}`}>
                                <MdOutlinePlayLesson className="w-6 h-6" />
                                <span className={`ml-3 text-base ${!isSidebarOpen && "hidden"} transition-all duration-300`}>Lessons</span>
                            </Link>
                        </li>
                        <li className="text-black hover:text-blue-500 cursor-pointer">
                            <Link href="/user/license" className={`flex items-center p-3 ${!isSidebarOpen ? "justify-center" : "justify-start"}`}>
                                <TbLicense className="w-6 h-6" />
                                <span className={`ml-3 text-base ${!isSidebarOpen && "hidden"} transition-all duration-300`}>License</span>
                            </Link>
                        </li>
                        <li className="text-black hover:text-blue-500 cursor-pointer">
                            <Link href="/user/documents" className={`flex items-center p-3 ${!isSidebarOpen ? "justify-center" : "justify-start"}`}>
                                <IoDocumentsSharp className="w-6 h-6" />
                                <span className={`ml-3 text-base ${!isSidebarOpen && "hidden"} transition-all duration-300`}>Documents</span>
                            </Link>
                        </li>
                        <li className="text-black hover:text-blue-500 cursor-pointer">
                            <Link href="/user/Payments" className={`flex items-center p-3 ${!isSidebarOpen ? "justify-center" : "justify-start"}`}>
                                <MdOutlinePayment className="w-6 h-6" />
                                <span className={`ml-3 text-base ${!isSidebarOpen && "hidden"} transition-all duration-300`}>Payments</span>
                            </Link>
                        </li>
                        <li className="text-black hover:text-blue-500 cursor-pointer">
                            <Link href="/user/Profile" className={`flex items-center p-3 ${!isSidebarOpen ? "justify-center" : "justify-start"}`}>
                                <CgProfile className="w-6 h-6" />
                                <span className={`ml-3 text-base ${!isSidebarOpen && "hidden"} transition-all duration-300`}>Profile</span>
                            </Link>
                        </li>
                        <li className={`text-black hover:text-blue-500 cursor-pointer`}>
                            <div className={`${!isSidebarOpen ? "block" : "hidden"} flex items-center justify-center`}>
                                <button
                                    onClick={handleOpenPopup}
                                    className="flex items-center justify-center p-2 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700"
                                >
                                    <RiStarFill className="h-3 w-3" />
                                </button>
                            </div>
                        </li>
                    </ul>
                    <ul className="border-t border-gray-200 pt-4">
                        <li className="text-black hover:text-blue-500 cursor-pointer" onClick={handleLogOut}>
                            <span className={`flex items-center p-3 ${!isSidebarOpen ? "justify-center" : "justify-start"}`}>
                                <BiLogOut className="w-6 h-6" />
                                <span className={`ml-3 text-base ${!isSidebarOpen && "hidden"} transition-all duration-300`}>Logout</span>
                            </span>
                        </li>
                    </ul>
                </div>
            </aside>

            <section className={`flex-1 min-h-screen z-40 transition-all duration-75 bg-white ${isSidebarOpen ? "pl-64" : "pl-16"}`}>
                <div className={`fixed top-0 z-[inherit] flex items-center justify-between ${isSidebarOpen ? "left-64" : "left-16"} right-0 shadow-sm bg-white py-3 px-4 text-black transition-all duration-300`}>
                    <div className="relative w-full max-w-md"></div>
                    <div className="">
                        <NavDrobdown imgSrc={userImg.src} isAdmin={false} />
                    </div>
                </div>

                {isPopupOpen && <DriverRating type={"user"} onClose={handleClosePopup} />}

                <div className="pt-20 p-4">{children}</div>
            </section>
        </div>
    );
}
