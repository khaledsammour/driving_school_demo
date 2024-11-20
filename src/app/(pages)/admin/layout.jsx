"use client";
import React, { useState } from "react";
import {
    BiHome,
    BiUser,
    BiLogOut,
    BiMenu,
    BiPackage,
    BiSearch,
} from "react-icons/bi";
import logo from "@/app/assets/logo.png";
import adminImg from "@/app/assets/admin.png";
import Link from "next/link";
import { Logout } from "@/app/services/authService";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import NavDrobdown from "@/app/components/NavDrobdown";
import { MdOutlinePlayLesson } from "react-icons/md";
import { VscPreview } from "react-icons/vsc";
export default function Layout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogOut = () => {
        Logout();
        toast.success('Successfully logged out !');
        router.push('/login')
    }
    return (
        <div className="admin_dashboard flex min-h-screen">
            <aside>
                <div
                    className={`fixed top-0 left-0 h-full ${isSidebarOpen ? "w-64" : "w-16"
                        } bg-white transition-all duration-300 ease-in-out border-r border-gray-300 z-50`}
                >
                    <div className="flex items-center p-4">
                        <Link href="/" className="flex items-center">
                            <div className="flex justify-center items-center w-12">
                                <img
                                    src={logo.src}
                                    alt="Logo"
                                    className={`w-10 h-10 rounded-full ${!isSidebarOpen && "hidden"
                                        } object-cover`}
                                />
                            </div>
                            <span
                                className={`text-black font-bold text-lg ml-3 ${!isSidebarOpen && "hidden"
                                    } whitespace-nowrap`}
                            >
                                Formula One
                            </span>
                        </Link>
                        <div
                            className={`ml-auto  top-6 ${!isSidebarOpen ? " absolute left-5" : "absolute right-4"
                                }`}
                        >
                            <BiMenu
                                onClick={toggleSidebar}
                                className={`text-black cursor-pointer `}
                                size={24}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col justify-between h-[calc(100%-130px)] mt-10">
                        <ul className="space-y-3">
                            <li className="text-black hover:text-blue-500 cursor-pointer">
                                <Link
                                    href="/admin"
                                    className={`flex items-center p-3 ${!isSidebarOpen
                                        ? "justify-center"
                                        : "justify-start"
                                        }`}
                                >
                                    <BiHome className="w-6 h-6" />
                                    <span
                                        className={`ml-3 text-base ${!isSidebarOpen && "hidden"
                                            } transition-all duration-300`}
                                    >
                                        Dashboard
                                    </span>
                                </Link>
                            </li>
                            <li className="text-black hover:text-blue-500 cursor-pointer">
                                <Link
                                    href="/admin/users"
                                    className={`flex items-center p-3 ${!isSidebarOpen
                                        ? "justify-center"
                                        : "justify-start"
                                        }`}
                                >
                                    <BiUser className="w-6 h-6" />
                                    <span
                                        className={`ml-3 text-base ${!isSidebarOpen && "hidden"
                                            } transition-all duration-300`}
                                    >
                                        Users
                                    </span>
                                </Link>
                            </li>
                            <li className="text-black hover:text-blue-500 cursor-pointer">
                                <Link
                                    href="/admin/packages"
                                    className={`flex items-center p-3 ${!isSidebarOpen
                                        ? "justify-center"
                                        : "justify-start"
                                        }`}
                                >
                                    <BiPackage className="w-6 h-6" />
                                    <span
                                        className={`ml-3 text-base ${!isSidebarOpen && "hidden"
                                            } transition-all duration-300`}
                                    >
                                        Packages
                                    </span>
                                </Link>
                            </li>
                            <li className="text-black hover:text-blue-500 cursor-pointer">
                                <Link href="/admin/lessons" className={`flex items-center p-3 ${!isSidebarOpen ? "justify-center" : "justify-start"}`}>
                                    <MdOutlinePlayLesson className="w-6 h-6" />
                                    <span className={`ml-3 text-base ${!isSidebarOpen && "hidden"} transition-all duration-300`}>Lessons</span>
                                </Link>
                            </li>
                            <li className="text-black hover:text-blue-500 cursor-pointer">
                                <Link href="/admin/testimonials" className={`flex items-center p-3 ${!isSidebarOpen ? "justify-center" : "justify-start"}`}>
                                    <VscPreview className="w-6 h-6" />
                                    <span className={`ml-3 text-base ${!isSidebarOpen && "hidden"} transition-all duration-300`}>Testimonials</span>
                                </Link>
                            </li>
                        </ul>
                        <ul className="border-t border-gray-200 pt-4">
                            <li className="text-black hover:text-blue-500 cursor-pointer" onClick={handleLogOut} >
                                <span

                                    className={`flex items-center p-3 ${!isSidebarOpen
                                        ? "justify-center"
                                        : "justify-start"
                                        }`}
                                >
                                    <BiLogOut className="w-6 h-6" />
                                    <span
                                        className={`ml-3 text-base ${!isSidebarOpen && "hidden"
                                            } transition-all duration-300`}
                                    >
                                        Logout
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>

            <section
                className={`flex-1 min-h-screen transition-all duration-75 bg-white ${isSidebarOpen ? "pl-64" : "pl-16"
                    }`}
            >
                <div
                    className={`fixed top-0 flex items-center justify-between ${isSidebarOpen ? "left-64" : "left-16"
                        } right-0 shadow-sm bg-white py-3 px-4 text-black transition-all duration-300`}
                >
                    <div className="relative w-full max-w-md">
                        <BiSearch
                            className="absolute left-3 top-2 text-gray-400"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="w-full pl-10 pr-4 py-2 rounded bg-gray-200 text-black focus:outline-none"
                        />
                    </div>
                    <div className="">
                        <NavDrobdown imgSrc={adminImg.src} isAdmin={true} />
                    </div>

                </div>

                <div className="pt-20 p-4">{children}</div>
            </section>
        </div>
    );
}
