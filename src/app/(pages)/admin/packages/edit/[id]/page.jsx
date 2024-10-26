"use client";

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { collection, serverTimestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '@/app/firebase';
import { updateProfile } from "firebase/auth";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function Page({ params }) {
    const router = useRouter();
    const { id } = params;
    const [featureInput, setFeatureInput] = useState('');
    const [editIndex, setEditIndex] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        discount: '',
        include: [],
    });


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const docRef = doc(db, "packages", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setFormData({
                        name: userData.name || '',
                        price: userData.price || '',
                        discount: userData.discount || '',
                        include: userData.include || [],
                    });
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching package:", error);
            }
        };

        fetchUser();
    }, [id]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddFeature = () => {
        if (!featureInput.trim()) {
            toast.error('Please enter a feature');
        } else {
            setFormData((prev) => ({
                ...prev,
                include: [...prev.include, featureInput],
            }));
            toast.success('Feature added successfully');
            setFeatureInput('');
        }
    };

    const handleRemoveFeature = (index) => {
        setFormData((prev) => ({
            ...prev,
            include: prev.include.filter((_, i) => i !== index),
        }));
        toast.success('Feature removed successfully');
    };

    const handleEdit = (index) => {
        console.log("Edit feature:", index);
        setFeatureInput(formData.include[index]);
        setEditIndex(index);
    };

    const handleUpdate = () => {
        if (editIndex !== null) {
            setFormData((prev) => {
                const updatedInclude = [...prev.include];
                updatedInclude[editIndex] = featureInput;
                return {
                    ...prev,
                    include: updatedInclude,
                };
            });
            setEditIndex(null);
            toast.success('Feature updated successfully');
            setFeatureInput('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        const userDocRef = doc(db, "packages", id);
        try {
            await setDoc(userDocRef, {
                name: formData.name,
                price: formData.price,
                discount: formData.discount,
                include: formData.include,
                updatedAt: serverTimestamp()
            })
            toast.success("Package updated successfully");
            router.push('/admin/packages');
        } catch (error) {
            console.error("Error updating package:", error);
            toast.error(error.message);
        }
    };

    return (
        <>
            <div className="add-package">
                <div className="p-8 rounded border border-gray-200">
                    <h1 className="font-medium text-3xl">Edit Package</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-8 grid lg:grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label htmlFor="name" className="text-sm text-gray-700 block mb-1 font-medium">
                                    Package Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                                    placeholder="Enter package name"
                                />
                            </div>
                            <div>
                                <label htmlFor="price" className="text-sm text-gray-700 block mb-1 font-medium">
                                    Package Price
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                                    placeholder="Enter package price"
                                />
                            </div>
                            <div>
                                <label htmlFor="discount" className="text-sm text-gray-700 block mb-1 font-medium">
                                    Discount
                                </label>
                                <input
                                    type="number"
                                    name="discount"
                                    id="discount"
                                    value={formData.discount}
                                    onChange={handleChange}
                                    className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                                    placeholder="Enter discount"
                                />
                            </div>
                            <div className="flex flex-col lg:flex-row items-center justify-between col-span-2 space-y-4">
                                <div className="w-full lg:w-[90%]">
                                    <label htmlFor="Feature" className="text-sm text-gray-700 block mb-1 font-medium">
                                        Feature
                                    </label>
                                    <input
                                        type="text"
                                        name="Feature"
                                        id="Feature"
                                        value={featureInput}
                                        onChange={(e) => setFeatureInput(e.target.value)}
                                        className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full"
                                        placeholder="Enter feature"
                                    />
                                </div>
                                <div className="flex justify-center lg:justify-end w-full lg:w-[20%] mt-[50px]">
                                    <button
                                        onClick={handleAddFeature}
                                        type="button"
                                        className="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-6 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Add
                                    </button>
                                    <button
                                        onClick={handleUpdate}
                                        type="button"
                                        className={` ${editIndex !== null ? 'inline-flex' : 'hidden'} text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-6 mx-1 py-2 text-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                            <div className="mt-8 overflow-x-auto col-span-2">
                                <div className="min-w-full bg-gray-100 rounded-lg shadow">
                                    <div className="bg-gray-200 text-gray-800 text-sm font-medium uppercase p-4 rounded-t-lg">
                                        <div className="flex justify-between items-center">
                                            <span className="w-[60%]">Feature</span>
                                            <span className="w-[30%] text-right pr-4">Actions</span>
                                        </div>
                                    </div>
                                    {formData.include.map((feature, index) => (
                                        <div key={index} className="flex items-center justify-between bg-white border-b border-gray-200 p-4 hover:bg-gray-50 transition">
                                            <span className="text-gray-800 w-[60%] bg-gray-100 rounded-md py-2 px-4 text-sm font-medium">
                                                {feature}
                                            </span>
                                            <div className="flex justify-between lg:justify-end space-x-4 w-full lg:w-[30%] mt-2 lg:mt-0">
                                                <button
                                                    onClick={() => handleEdit(index)}
                                                    type="button"
                                                    className="text-blue-600 hover:text-blue-800 flex items-center transition duration-150 ease-in-out"
                                                >
                                                    <FaEdit className="mr-2 text-lg lg:text-xl" />
                                                    <span className="hidden lg:inline font-medium">Edit</span>
                                                </button>
                                                <button
                                                    onClick={() => handleRemoveFeature(index)}
                                                    type="button"
                                                    className="text-red-600 hover:text-red-800 flex items-center transition duration-150 ease-in-out"
                                                >
                                                    <FaTrash className="mr-2 text-lg lg:text-xl" />
                                                    <span className="hidden lg:inline font-medium">Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="space-x-4 flex lg:justify-start justify-center items-center mt-8">
                            <button
                                type="submit"
                                className="py-2 px-4 my-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
                            >
                                Edit Package
                            </button>
                            <Link href="/admin/packages">
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
