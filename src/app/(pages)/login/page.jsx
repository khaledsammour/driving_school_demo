"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ImgLogin from '@/app/assets/login.jpg';
import { Login } from '@/app/services/authService';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            toast.error('Please enter a valid email address.')
            return;
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            toast.error('Password must be at least 6 characters long.')
            return;
        }

        setError('');

        try {
            await Login(email, password);
            toast.success('Successfully logged !')
            router.push('/');
        } catch (error) {
            setError(error.message);
            toast.error(error.message)

        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl xl:text-3xl font-extrabold">Sign in</h1>
                        <div className="w-full flex-1 mt-10">
                            <div className="mx-auto max-w-xs">
                                <form action="" className='mt-12' onSubmit={handleSubmit}>
                                    <input
                                        className="w-full px-8 py-4 mb-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <input
                                        className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
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
                                    <a href="#" className="border-b border-gray-500 border-dotted"> Terms of Service </a>
                                    and its
                                    <a href="#" className="border-b border-gray-500 border-dotted"> Privacy Policy </a>
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
