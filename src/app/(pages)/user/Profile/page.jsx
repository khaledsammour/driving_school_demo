"use client";

import { useState, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-hot-toast";
import { auth, db } from "@/app/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

export default function ProfilePage() {
    const [IdUser, setIdUser] = useState(null);

    const [formData, setFormData] = useState({
        first_name: '',
        middle_name: '',
        third_name: '',
        date: '',
        last_name: '',
        email: '',
        address: '',
        gender: '',
        language: '',
        phone: '',
        licenseInfo: '',
        password: '',
    });

    useEffect(() => {
        const storedId = localStorage.getItem("IdUser");
        if (storedId) {
            setIdUser(storedId);
        }
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            if (!IdUser) return;

            try {
                const docRef = doc(db, "users", IdUser);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    setFormData((prevData) => ({
                        ...prevData,
                        ...userData,
                    }));
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        if (IdUser) {
            fetchUser();
        }
    }, [IdUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const user = auth.currentUser;

            if (user) {
                await updateProfile(user, {
                    displayName: `${formData.first_name} ${formData.last_name}`,
                });
            }

            const userDocRef = doc(db, "users", IdUser);

            await setDoc(
                userDocRef,
                {
                    ...formData,
                    updatedAt: serverTimestamp(),
                },
                { merge: true }
            );

            toast.success("Profile updated successfully");
        } catch (error) {
            console.error("Error updating user:", error);
            toast.error(`Error: ${error.message}`);
        }
    };

    return (
        <>
            <div className="profile">
                <div className="flex items-center py-5 px-2">
                    <CgProfile className="h-9 w-9 bg-primary rounded-lg text-blue-600 flex items-center justify-center text-md" />
                    <span className="text text-xl font-bold ml-2 text-blue-600">Profile</span>
                </div>
                <div className="flex items-center flex-col justify-center min-h-screen">
                    <form onSubmit={handleSubmit} className="w-full px-6 py-8 bg-white rounded-lg shadow-lg">
                        <div className="space-y-5">
                            {["first_name", "middle_name", "third_name", "last_name", "date", "email", "address", "phone", "password"].map((field) => (
                                <div key={field} className="flex flex-col">
                                    <label htmlFor={field} className="text-sm text-gray-700 mb-1">
                                        {field.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
                                    </label>
                                    <input
                                        type={field === "date" ? "date" : field === "password" ? "password" : "text"}
                                        name={field}
                                        id={field}
                                        value={formData[field]}
                                        onChange={handleChange}
                                        placeholder={`Enter your ${field.replace("_", " ")}`}
                                        className="bg-gray-50 border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 w-full"
                                    />
                                </div>
                            ))}

                            {/* Additional Fields */}
                            <div className="flex flex-col">
                                <label htmlFor="licenseInfo" className="text-sm text-gray-700 mb-1">License Info</label>
                                <input
                                    type="text"
                                    name="licenseInfo"
                                    id="licenseInfo"
                                    value={formData.licenseInfo}
                                    onChange={handleChange}
                                    placeholder="Enter license information"
                                    className="bg-gray-50 border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 w-full"
                                />
                            </div>

                            {/* Select fields */}
                            <div className="flex flex-col">
                                <label htmlFor="gender" className="text-sm text-gray-700 mb-1">Gender</label>
                                <select
                                    name="gender"
                                    id="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 w-full"
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="language" className="text-sm text-gray-700 mb-1">Preferred Language</label>
                                <select
                                    name="language"
                                    id="language"
                                    value={formData.language}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 rounded-md py-2 px-3 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700 w-full"
                                >
                                    <option value="english">English</option>
                                    <option value="arabic">Arabic</option>
                                    <option value="french">French</option>
                                </select>
                            </div>

                            <button type="submit" className="w-full bg-purple-600 text-white py-3 rounded-md hover:bg-purple-500 transition duration-200 ease-in-out">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
