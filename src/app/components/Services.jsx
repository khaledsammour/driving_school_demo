import React from 'react';
import ServicesImg from '../assets/Services.jpg';
import Image from 'next/image';
import { FaCheckCircle } from "react-icons/fa";

export default function Services() {
    return (
        <div className="Services py-10">
            <div className="text">
                <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Our Services</h2>
            </div>
            <div className="xl:w-[80%] sm:w-[85%] xs:w-[90%] w-full mx-auto flex flex-col lg:flex-row gap-4 justify-center items-stretch mt-4">
                {/* Image Section */}
                <div className="lg:w-1/2 w-full">
                    <Image
                        className="rounded-lg w-full object-cover"
                        src={ServicesImg}
                        width={1000}
                        height={1000}
                        alt="Services"
                    />
                </div>
                {/* Content Section */}
                <div className="lg:w-1/2 w-full bg-gray-100 dark:bg-gray-900 dark:text-gray-400 p-4 rounded-md flex flex-col justify-between">
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
                        Practical driving lessons to learn to drive with confidence and ease.
                    </h3>
                    <ul className="space-y-2 list-inside mt-4 text-md">
                        <li className="flex items-center text-gray-800 dark:text-white">
                            <FaCheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                            Beginner Driving Lessons
                        </li>
                        <li className="flex items-center text-gray-800 dark:text-white">
                            <FaCheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                            Advanced Driving Courses
                        </li>
                        <li className="flex items-center text-gray-800 dark:text-white">
                            <FaCheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                            Refreshing Lessons
                        </li>
                        <li className="flex items-center text-gray-800 dark:text-white">
                            <FaCheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                            Driving Test Preparation
                        </li>
                        <li className="flex items-center text-gray-800 dark:text-white">
                            <FaCheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                            Intensive Driving Courses
                        </li>
                        <li className="flex items-center text-gray-800 dark:text-white">
                            <FaCheckCircle className="h-5 w-5 text-blue-600 mr-2" />
                            Car for the Test
                        </li>
                    </ul>
                    <div className="mt-6">
                        <a
                            href="#"
                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-600 transition duration-200 md:py-4 md:text-lg md:px-10"
                        >
                            Get started
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
