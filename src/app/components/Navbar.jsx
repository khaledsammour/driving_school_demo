"use client";
import React, { useEffect, useState, useRef, useContext } from "react";
import Hamburger from 'hamburger-react';
import logo from "@/app/assets/formula-logo-1.png";
import Link from "next/link";
import Image from "next/image";
import EnglandImg from '@/app/assets/english.png';
import ArabicImg from '@/app/assets/arab.png';
import { FormattedMessage } from "react-intl";
import { LanguageContext } from "@/app/ProviderLang";
import { checkUserLoggedIn } from '@/app/services/authService';
import toast from "react-hot-toast";
import { useRouter, usePathname } from 'next/navigation';
import NavDrobdown from './NavDrobdown';
import imgUser from '@/app/assets/userImg.jpg';
import imgAdmin from '@/app/assets/admin.png';
import { db } from '@/app/firebase'; // Import your Firebase config
import { doc, getDoc } from 'firebase/firestore';
import { Logout } from "../services/authService";

export default function Header() {
    const [isOpen, setOpen] = useState(false);
    const [openLang, setOpenLang] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [lang, setLang] = useState('en');
    const [user, setUser] = useState(null);
    const closeSearch = useRef(null);
    const { switchLanguage } = useContext(LanguageContext);
    const router = useRouter();
    const pathname = usePathname();

    const [imageWidth, setImageWidth] = useState(200);

    useEffect(() => {
        const updateImageSize = () => {
            // Check if viewport width is less than a specific size (e.g., 768px)
            if (window.innerWidth <= 768) {
                setImageWidth(100); // Mobile width
            } else {
                setImageWidth(200); // Web width
            }
        };

        // Initial check
        updateImageSize();

        // Update on window resize
        window.addEventListener("resize", updateImageSize);

        return () => {
            window.removeEventListener("resize", updateImageSize);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (closeSearch.current && !closeSearch.current.contains(event.target)) {
                setOpenLang(false);
            }
        };

        if (typeof window !== "undefined") {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            if (typeof window !== "undefined") {
                document.removeEventListener('mousedown', handleClickOutside);
            }
        };
    }, []);

    useEffect(() => {
        checkUserLoggedIn(async (loggedIn, callbackUser) => {          
            const userRef = doc(db, "users", callbackUser?.uid);
            const userSnapshot = await getDoc(userRef);
            if (userSnapshot.exists()) {
                const fetchedUser = userSnapshot.data();
                setUser(fetchedUser);  
                setIsLoggedIn(loggedIn);
                console.log(fetchedUser);
            } else {
                console.log("No such user document!");
            }
        });
    }, []);

    const toggleLangMenu = () => {
        setOpenLang((prevState) => !prevState);
    };

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

    return (
        <header className="shadow-lg ">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link href="/" className="flex items-center">
                        <Image src={logo} alt="Logo" className="mx-2" width={imageWidth} height={60} />
                    </Link>
                    <div className="flex items-center lg:order-2">
                        {/* <div className="mx-2">
                            <div className="lang-menu relative text-right font-bold w-24" ref={closeSearch}>
                                <div className="selected-lang flex items-center justify-end cursor-pointer" onClick={toggleLangMenu}>
                                    <Image src={lang === "en" ? EnglandImg : ArabicImg} alt="Language" className="w-9 h-9 mx-2" width={42} height={42} />
                                </div>
                                <ul className={`${openLang ? "block" : "hidden"} z-50 menuLang absolute right-0 top-14 bg-white border border-gray-200 rounded-lg shadow-md w-32`}>
                                    <li className="flex items-center cursor-pointer px-1 py-1 hover:bg-gray-100" onClick={() => { setLang('ar'); switchLanguage("ar"); setOpenLang(false); }}>
                                        <Image src={ArabicImg} alt="Arabic" className="w-9 h-9 mx-2" width={42} height={42} />
                                        <span> Arabic</span>
                                    </li>
                                    <li className="flex items-center cursor-pointer px-1 py-1 hover:bg-gray-100" onClick={() => { setLang('en'); switchLanguage("en"); setOpenLang(false); }}>
                                        <Image src={EnglandImg} alt="English" className="w-9 h-9 mx-2" width={42} height={42} />
                                        <span> English</span>
                                    </li>
                                    <li className="flex items-center cursor-pointer px-1 py-1 hover:bg-gray-100" onClick={() => { setLang('fr'); switchLanguage("fr"); setOpenLang(false); }}>
                                        <Image src={EnglandImg} alt="English" className="w-9 h-9 mx-2" width={42} height={42} />
                                        <span> France</span>
                                    </li>
                                </ul>
                            </div>
                        </div> */}
                        {
                            isLoggedIn ? (
                                <div className="lg:flex hidden justify-between items-center">
                                    {user.online_training_hours && <div className="mx-2">
                                        <a
                                            href="https://formulaonedrivingschool.trubicars.ca/auth/mfa/login.php"
                                            className="text-blue-700 border border-blue-800 hover:bg-blue-800 hover:text-white focus:ring-none font-medium rounded-lg text-sm px-4 lg:px-7 py-2 lg:py-2.5 mr-2 "
                                        >
                                            Online Training Portal
                                        </a>
                                    </div>}
                                    <div className="mt-1">

                                        <NavDrobdown imgSrc={imgUser.src} isAdmin={false} />
                                    </div>
                                </div>

                            ) : (
                                <div className="mx-2 lg:block hidden">
                                    <Link
                                        href="/login"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-none font-medium rounded-lg text-sm px-4 lg:px-7 py-2 lg:py-2.5 mr-2 "
                                    >
                                        Members Portal
                                    </Link>
                                </div>
                            )
                        }

                        <div className="lg:hidden flex">
                            <Hamburger toggled={isOpen} toggle={setOpen} />
                        </div>
                    </div>

                    <div className={`${isOpen ? 'block' : 'hidden'} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`} id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            {isLoggedIn && <li className="lg:hidden block">
                                <Link href={user.type === "user" ? "/user" : user.type === "driver" ? "/driver" : "/admin" } className={`block py-2 pr-4 pl-3 rounded ${pathname === "/user" ? "text-blue-700" : "text-gray-700"
                                        } lg:p-0`}>
                                    Dashboard
                                </Link>
                            </li>}
                            <li>
                                <Link
                                    href="/"
                                    className={`block py-2 pr-4 pl-3 rounded ${pathname === "/" ? "text-blue-700" : "text-gray-700"
                                        } lg:p-0`}
                                >
                                    <FormattedMessage id="home" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/aboutUs"
                                    className={`block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 ${pathname === "/aboutUs" ? "text-blue-700" : "text-gray-700"
                                        }`}
                                >
                                    <FormattedMessage id="about_us" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/Services"
                                    className={`block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 ${pathname === "/Services" ? "text-blue-700" : "text-gray-700"
                                        }`}
                                >
                                    <FormattedMessage id="services" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/Pricing"
                                    className={`block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 ${pathname === "/Pricing" ? "text-blue-700" : "text-gray-700"
                                        }`}
                                >
                                    <FormattedMessage id="pricing" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contactUs"
                                    className={`block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 ${pathname === "/contactUs" ? "text-blue-700" : "text-gray-700"
                                        }`}
                                >
                                    <FormattedMessage id="contact_us" />
                                </Link>
                            </li>
                            {isLoggedIn && user.online_training_hours && <li className="lg:hidden block">
                                <Link
                                    href="https://formulaonedrivingschool.trubicars.ca/auth/mfa/login.php"
                                    className={`block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 ${pathname === "/contactUs" ? "text-blue-700" : "text-gray-700"
                                        }`}
                                >
                                    Online Training Portal
                                </Link>
                            </li>}
                            {isLoggedIn ? <li className="lg:hidden block">
                                <Link
                                    href="#"
                                    onClick={(e)=>{
                                        e.preventDefault()
                                        handleLogOut()
                                    }}
                                    className={`block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 ${pathname === "/contactUs" ? "text-blue-700" : "text-gray-700"
                                        }`}
                                >
                                    Sign out
                                </Link>
                            </li> : <li>
                                <Link
                                    href="/login"
                                    className={`block py-2 pr-4 pl-3 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 ${pathname === "/contactUs" ? "text-blue-700" : "text-gray-700"
                                        }`}
                                >
                                    Members Portal
                                </Link>
                            </li>}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
