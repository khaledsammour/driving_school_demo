"use client"; // Keep this line for client component
import React, { useEffect, useState } from 'react';
import { TbPackage } from "react-icons/tb";
import { FaRegUser } from "react-icons/fa";
import { GiTwoCoins } from "react-icons/gi";
import { AiFillDashboard } from "react-icons/ai";
import TableUsers from '@/app/components/TableUsers';
import { BiHome } from 'react-icons/bi';

export default function AdminPage() {
    const [totalUsers, setTotalUsers] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Replace with your API endpoint
                const response = await fetch('/api/users');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTotalUsers(data.totalUsers); 
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className="Admin py-6">
            <div className="overview">
                <div className="title flex items-center mb-12">
                    <BiHome className='h-9 w-9 bg-primary rounded-lg text-blue-600 flex items-center justify-center text-xl' />
                    <span className="text text-2xl font-bold ml-2 text-blue-600">Dashboard</span>
                </div>

                <div className="boxes grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">

                    <div className="box bg-[#4da3ff] rounded-lg flex flex-col items-center p-4 transition-all duration-150 hover:shadow-lg">
                        <TbPackage className="text-text-color text-4xl" />
                        <span className="text text-lg font-medium text-black">Total Packages</span>
                        <span className="number text-4xl font-medium text-black">80,220</span>
                    </div>

                    <div className="box bg-[#ffe6ac] rounded-lg flex flex-col items-center p-4 transition-all duration-150 hover:shadow-lg">
                        <FaRegUser className="text-text-color text-4xl" />
                        <span className="text text-lg font-medium text-black">Total Users</span>
                        <span className="number text-4xl font-medium text-black">
                            {loading ? '...' : error ? 0 : totalUsers}
                        </span>
                    </div>

                    <div className="box bg-[#e7d1fc] rounded-lg flex flex-col items-center p-4 transition-all duration-150 hover:shadow-lg">
                        <GiTwoCoins className="text-text-color text-4xl" />
                        <span className="text text-lg font-medium text-black">Total Salary</span>
                        <span className="number text-4xl font-medium text-black">20,320</span>
                    </div>
                </div>

                <div className="users pt-10">
                    <div className="title flex items-center mb-8">
                        <AiFillDashboard className='h-9 w-9 bg-primary rounded-lg text-blue-600 flex items-center justify-center text-xl' />
                        <span className="text text-2xl font-medium ml-2 text-blue-600">Recent Activity</span>
                    </div>
                    <div className="p-10 ">
                        <div className="overflow-x-auto">
                            <TableUsers />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
