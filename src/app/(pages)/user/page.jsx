"use client";
import React, { useEffect, useState } from 'react';

import { AiFillDashboard } from "react-icons/ai";
import { BiHome } from 'react-icons/bi';
import { MdOutlinePlayLesson } from "react-icons/md";
import { FaHistory } from "react-icons/fa";
import { LuPackageCheck } from "react-icons/lu";
import ChartUser from '@/app/components/ChartUser';
export default function UserPage() {
    return (
        <div className="User py-6">
            <div className="overview">
                <div className="title flex items-center mb-12">
                    <BiHome className='h-9 w-9 bg-primary rounded-lg text-blue-600 flex items-center justify-center text-xl' />
                    <span className="text text-2xl font-bold ml-2 text-blue-600">Dashboard</span>
                </div>

                <div className="boxes grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">

                    <div className="box bg-[#4da3ff] rounded-lg flex flex-col items-center p-4 transition-all duration-150 hover:shadow-lg">
                        <MdOutlinePlayLesson className="text-text-color text-4xl" />
                        <span className="text text-lg font-medium text-black">Total Lesson</span>
                        <span className="number text-4xl font-medium text-black">0</span>
                    </div>

                    <div className="box bg-[#ffe6ac] rounded-lg flex flex-col items-center p-4 transition-all duration-150 hover:shadow-lg">
                        <FaHistory className="text-text-color text-4xl" />
                        <span className="text text-lg font-medium text-black">History Lesson</span>
                        <span className="number text-4xl font-medium text-black">
                            0
                        </span>
                    </div>

                    <div className="box bg-[#e7d1fc] rounded-lg flex flex-col items-center p-4 transition-all duration-150 hover:shadow-lg">
                        <LuPackageCheck className="text-text-color text-4xl" />
                        <span className="text text-lg font-medium text-black">Current package</span>
                        <span className="number text-4xl font-medium text-black"> Free</span>
                    </div>
                </div>

                <div className="users pt-4">
                    <div className="title flex items-center mb-8">
                        <AiFillDashboard className='h-9 w-9 bg-primary rounded-lg text-blue-600 flex items-center justify-center text-xl' />
                        <span className="text text-2xl font-medium ml-2 text-blue-600">User Activity</span>
                    </div>
                    <div className="p-10 ">
                        <div className="overflow-x-auto">
                            <ChartUser />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
