"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import {
    addDoc,
    collection,
    serverTimestamp,
} from "firebase/firestore";
import { auth, db, storage } from '@/app/firebase';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";

export default function Page() {

    const route = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        middle_name: '',
        third_name: '',
        date: '',
        last_name: '',
        email: '',
        address: '',
        type: 'driver',
        password: '',
        gender: '',
        language: '',
        phone: '',
        licenseInfo: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {

            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            const docRef = await addDoc(collection(db, "users"), {
                uid: user.uid,
                first_name: formData.first_name,
                middle_name: formData.middle_name,
                third_name: formData.third_name,
                date: formData.date,
                last_name: formData.last_name,
                email: formData.email,
                address: formData.address,
                gender: formData.gender,
                language: formData.language,
                type: formData.type,
                password: formData.password,
                phone: formData.phone,
                licenseInfo: formData.licenseInfo,
                createdAt: serverTimestamp(),
            });

            console.log("Document written with ID: ", docRef.id);
            toast.success("User added successfully");
            route.push("/admin/drivers");

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };



    return (
        <>
            <div className="addUser">
                <div className="p-8 rounded border border-gray-200">
                    <h1 className="font-medium text-3xl">Add Driver</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-8 grid lg:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="first_name" className="text-sm text-gray-700 block mb-1 font-medium">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="first_name"
                                    id="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                                    placeholder="Enter your first name"
                                />
                            </div>
                            <div>
                                <label htmlFor="middle_name" className="text-sm text-gray-700 block mb-1 font-medium">
                                    Middle Name
                                </label>
                                <input
                                    type="text"
                                    name="middle_name"
                                    id="middle_name"
                                    value={formData.middle_name}
                                    onChange={handleChange}
                                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                                    placeholder="Enter your middle name"
                                />
                            </div>
                            <div>
                                <label htmlFor="third_name" className="text-sm text-gray-700 block mb-1 font-medium">
                                    Third Name
                                </label>
                                <input
                                    type="text"
                                    name="third_name"
                                    id="third_name"
                                    value={formData.third_name}
                                    onChange={handleChange}
                                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                                    placeholder="Enter your third name"
                                />
                            </div>
                            <div>
                                <label htmlFor="last_name" className="text-sm text-gray-700 block mb-1 font-medium">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="last_name"
                                    id="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                                    placeholder="Enter your last name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="text-sm text-gray-700 block mb-1 font-medium">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                                    placeholder="yourmail@provider.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="address" className="text-sm text-gray-700 block mb-1 font-medium">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                                    placeholder="Enter your address"
                                />
                            </div>
                            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="password" className="text-sm text-gray-700 block mb-1 font-medium">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            id="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                                            placeholder="Enter your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                                        >
                                            {showPassword ? <FaRegEye className="h-5 w-5 text-gray-400" /> : <FaRegEyeSlash className="h-5 w-5 text-gray-400" />}
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="date" className="text-sm text-gray-700 block mb-1 font-medium">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        id="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                                    />
                                </div>
                          </div>
                            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="gender" className="text-sm text-gray-700 block mb-1 font-medium">
                                        Gender
                                    </label>
                                    <select
                                        name="gender"
                                        id="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="language" className="text-sm text-gray-700 block mb-1 font-medium">
                                        Language
                                    </label>
                                    <select
                                        name="language"
                                        id="language"
                                        value={formData.language}
                                        onChange={handleChange}
                                        className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                                    >
                                        <option value="english">English</option>
                                        <option value="arabic">Arabic</option>
                                        <option value="french">French</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="phone" className="text-sm text-gray-700 block mb-1 font-medium">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                                    placeholder="Enter your phone number"
                                />
                            </div>
                            <div>
                                <label htmlFor="licenseInfo" className="text-sm text-gray-700 block mb-1 font-medium">
                                    License Info
                                </label>
                                <input
                                    type="text"
                                    name="licenseInfo"
                                    id="licenseInfo"
                                    value={formData.licenseInfo}
                                    onChange={handleChange}
                                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                                    placeholder="Enter license information"
                                />
                            </div>
                       
                        </div>
                        <div className="space-x-4 mt-8">
                            <button
                                type="submit"
                                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
                            >
                                Add Driver
                            </button>
                            <Link href="/admin/users">
                                <button
                                    type="button"
                                    className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                            </Link>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
}
