"use client";

import React, { use, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ImgLogin from '@/app/assets/login.jpg';
import { Login } from '@/app/services/authService';
import { useRouter, useSearchParams } from 'next/navigation';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export default function Page() {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const searchParams = useSearchParams();
    const [type, setType] = useState('');

    useEffect(() => {
        const UserType = searchParams.get("typeUser");
        if (UserType) {
            setType(UserType);
        }
    }, []);

    console.log(searchParams.has("namePackage") && searchParams.has("pricePackage"));
    const router = useRouter();
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setError('');

        try {
            await Login(email, password);
            if (searchParams.has("namePackage") && searchParams.has("pricePackage")) {
                router.push(`/payment?namePackage=${searchParams.get("namePackage")}&pricePackage=${searchParams.get("pricePackage")}`);
            } else {
                router.push('/');
            }
        } catch (error) {
            setError(error.message);
        }
    };
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };


    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">Sign in</h1>
                        <div className="w-full flex-1 mt-10">
                            <div className="mx-auto max-w-xs">
                                <form className='mt-12' onSubmit={handleSubmit}>
                                    <input
                                        className="w-full px-8 py-4 mb-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <div className="relative w-full">
                                        <input
                                            className="w-full px-8 py-4 mb-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span
                                            className="absolute right-3 top-3 cursor-pointer text-gray-500"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? (
                                                <AiFillEyeInvisible size={24} />
                                            ) : (
                                                <AiFillEye size={24} />
                                            )}
                                        </span>
                                    </div>
                                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                                    <button type='submit' className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M15 12h6M18 15l3-3-3-3" />
                                            <path d="M12 2v20M2 12h10" />
                                        </svg>
                                        <span className="ml-3">Sign in</span>
                                    </button>
                                </form>
                                <p className="mt-6 text-xs text-gray-600 text-center">
                                    I agree to abide by templatana's
                                    <Link href="/PrivacyPolicy" className="border-b border-gray-500 border-dotted"> Terms of Service </Link>
                                    and its
                                    <Link href="/PrivacyPolicy" className="border-b border-gray-500 border-dotted"> Privacy Policy </Link>
                                </p>
                                <p className="mt-8 text-md text-gray-600 text-center">
                                    Don't have an account?
                                    <Link href="/register" className="border-b border-gray-500 border-dotted"> Sign up </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
                    <div className="flex items-center justify-center h-full w-full">
                        <Image
                            src={ImgLogin}
                            width={500}
                            height={500}
                            className="object-cover w-full h-full rounded-lg"
                            alt="Background"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
