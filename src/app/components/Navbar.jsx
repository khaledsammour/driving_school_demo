"use client";
import React, { useEffect, useState, useRef, useContext } from "react";
import Hamburger from 'hamburger-react';
import logo from "@/app/assets/logo.png";
import Link from "next/link";
import Image from "next/image";
import EnglandImg from '@/app/assets/english.png';
import ArabicImg from '@/app/assets/arab.png';
import { FormattedMessage } from "react-intl";
import { LanguageContext } from "@/app/ProviderLang";
import { checkUserLoggedIn } from '@/app/services/authService';
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import NavDrobdown from './NavDrobdown';
import imgUser from '@/app/assets/userImg.jpg';
import imgAdmin from '@/app/assets/admin.png';
export default function Header() {
    const [isOpen, setOpen] = useState(false);
    const [openLang, setOpenLang] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [lang, setLang] = useState('en');
    const closeSearch = useRef(null);
    const { switchLanguage } = useContext(LanguageContext);
    const router = useRouter();

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
        checkUserLoggedIn((loggedIn) => {
            setIsLoggedIn(loggedIn);
        });
    }, []);

    const toggleLangMenu = () => {
        setOpenLang((prevState) => !prevState);
    };

    return (
        <header className="shadow-lg ">
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <Link href="/" className="flex items-center">
                        <Image src={logo} alt="Logo" className="mx-2" width={50} height={50} />
                        <span className="self-center flex items-center text-md lg:text-lg font-semibold whitespace-nowrap dark:text-white">
                            DRS
                        </span>
                    </Link>
                    <div className="flex items-center lg:order-2">
                        <div className="mx-2">
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
                                </ul>
                            </div>
                        </div>
                        {
                            isLoggedIn ? (
                                <NavDrobdown imgSrc={imgUser.src} isAdmin={false} />
                            ) : (
                                <Link
                                    href="/login"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-none font-medium rounded-lg text-sm px-4 lg:px-7 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                >
                                    Log in
                                </Link>
                            )
                        }

                        <div className="lg:hidden flex">
                            <Hamburger toggled={isOpen} toggle={setOpen} />
                        </div>
                    </div>

                    <div className={`${isOpen ? 'block' : 'hidden'} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`} id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                            <li>
                                <Link
                                    href="/"
                                    className="block py-2 pr-4 pl-3 text-white rounded bg-blue-700 lg:bg-transparent lg:text-blue-700 lg:p-0 dark:text-white"
                                    aria-current="page"
                                >
                                    <FormattedMessage id="home" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/Lessons"
                                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    <FormattedMessage id="lessons" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/Services"
                                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    <FormattedMessage id="services" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/Pricing"
                                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    <FormattedMessage id="pricing" />
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contactUs"
                                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                                >
                                    <FormattedMessage id="contact_us" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}
