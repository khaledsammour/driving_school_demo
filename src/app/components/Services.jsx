import React from 'react';
import ServicesImg from '../assets/services.jpg';
import Image from 'next/image';
import { FaCheckCircle } from "react-icons/fa";
import Link from 'next/link';

export default function Services() {
    return (
        <div className="Services py-10">
            <div className="text">
                <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Our Services</h2>
            </div>
            <div className="xl:w-[90%] sm:w-[90%] xs:w-[90%] w-full mx-auto flex flex-col lg:flex-row gap-4 justify-center items-stretch mt-4">
                <div className="w-full bg-gray-100 dark:bg-gray-900 dark:text-gray-400 p-4 rounded-md flex flex-col justify-between">
                    <h3 className="text-2xl md:text-1xl font-semibold text-gray-900 dark:text-white mb-1">
                        Practical driving lessons to learn to drive with confidence and ease.
                    </h3>
                    <div className="text-md text-gray-800 dark:text-white  mx-auto py-6">
                        <ul className="space-y-2">
                            <li className="flex items-center space-x-4 ">
                                <FaCheckCircle className="text-blue-600" style={{ width: '5%', height: '20px' }} />
                                <div style={{ width: '100%' }}>
                                    <h6 className="text-lg font-semibold">Beginner Driving Lessons:</h6>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Start your driving journey with our comprehensive beginner courses, where we cover all the basics—from understanding road signs to mastering vehicle control. Perfect for first-time drivers.</p>
                                </div>
                            </li>
                            <li className="flex items-center space-x-4">
                                <FaCheckCircle className="text-blue-600" style={{ width: '5%', height: '20px' }} />
                                <div style={{ width: '95%' }}>
                                    <h6 className="text-lg font-semibold">Advanced Driving Courses:</h6>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">For those who already have some driving experience, our advanced courses focus on honing your skills, with an emphasis on complex driving scenarios, highway driving, and defensive driving techniques.</p>
                                </div>
                            </li>
                            <li className="flex items-center space-x-4">
                                <FaCheckCircle className="text-blue-600" style={{ width: '5%', height: '20px' }} />
                                <div style={{ width: '95%' }}>
                                    <h6 className="text-lg font-semibold">Refresher Lessons:</h6>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Need a confidence boost or a quick review before your test? Our refresher lessons are designed for licensed drivers who want to polish their driving abilities or adapt to new driving conditions.</p>
                                </div>
                            </li>
                            <li className="flex items-center space-x-4">
                                <FaCheckCircle className="text-blue-600" style={{ width: '5%', height: '20px' }} />
                                <div style={{ width: '95%' }}>
                                    <h6 className="text-lg font-semibold">Driving Test Preparation:</h6>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Ace your driving test with our targeted preparation sessions. We’ll guide you through the test format, focus on the areas where you need improvement, and provide mock test environments to ease your nerves.</p>
                                </div>
                            </li>
                            <li className="flex items-center space-x-4">
                                <FaCheckCircle className="text-blue-600" style={{ width: '5%', height: '20px' }} />
                                <div style={{ width: '95%' }}>
                                    <h6 className="text-lg font-semibold">Intensive Driving Courses:</h6>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">For those who already have some driving experience, our intensive courses focus on honing your skills, with an emphasis on complex driving scenarios, highway driving, and defensive driving techniques.</p>
                                </div>
                            </li>
                            <li className="flex items-center space-x-4">
                                <FaCheckCircle className="text-blue-600" style={{ width: '5%', height: '20px' }} />
                                <div style={{ width: '95%' }}>
                                    <h6 className="text-lg font-semibold">Car for Test:</h6>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Need a confidence boost or a quick review before your test? Our refresher lessons are designed for licensed drivers who want to polish their driving abilities or adapt to new driving conditions.</p>
                                </div>
                            </li>
                            <li className="flex items-center space-x-4">
                                <FaCheckCircle className="text-blue-600" style={{ width: '5%', height: '20px' }} />
                                <div style={{ width: '95%' }}>
                                    <h6 className="text-lg font-semibold">Progress Reports:</h6>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Regular updates and reports for students/parents on their student progress.</p>
                                </div>
                            </li>
                        </ul>
                    </div>


                    <div className="mt-6">
                        <Link
                            href="/MapDriver"
                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-600 transition duration-200 md:py-4 md:text-lg md:px-10"
                        >
                            Get started
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
