import React from 'react';
import DownloadAppImg from '../assets/DownloadApp.png';
import { FaCheckCircle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
const DownloadApp = () => {
    return (
        <div className="flex flex-col relative md:flex-row items-center justify-center  bg-gradient-to-r from-blue-900 to-purple-900 text-white px-8 py-4">



            <div className="text-center md:text-left max-w-md">
                <h1 className="text-4xl font-bold mb-4">Download Our App</h1>
                <p className="text-gray-300 mb-6">
                    Get the full driving school experience right at your fingertips! Our app makes it easier than ever to
                    book lessons, track your progress, and stay informed on your journey to becoming a confident
                    driver
                </p>

                <ul className="space-y-2 list-inside mt-4 text-md">
                    <li className="flex items-center text-white">
                        <FaCheckCircle className="h-5 w-5 text-white mr-2" />
                        Book Lessons On-the-Go
                    </li>
                    <li className="flex items-center text-white">
                        <FaCheckCircle className="h-5 w-5 text-white mr-2" />
                        Track Your Progress
                    </li>
                    <li className="flex items-center text-white">
                        <FaCheckCircle className="h-5 w-5 text-white mr-2" />
                        Receive Notifications and Reminders
                    </li>
                    <li className="flex items-center text-white ">
                        <FaCheckCircle className="h-5 w-5 text-white mr-2" />
                        Secure Payments
                    </li>

                </ul>

                {/* Buttons */}
                <div className="flex justify-center py-4 md:justify-start mt-8 space-x-4">
                    <button className="bg-black py-2 px-4 rounded-lg flex items-center space-x-2">
                        <FcGoogle className='h-6 w-6'/>
                        <span>Google Play</span>
                    </button>
                    <button className="bg-black py-2 px-4 rounded-lg flex items-center space-x-2">
                        <FaApple className='h-6 w-6'/>
                        <span>App Store</span>
                    </button>
                </div>
            </div>
            <div className=" top-[16px]  relative w-full  mb-8 md:mb-0 md:mr-8">
                <img
                    src={DownloadAppImg.src}
                    alt="Casper App"
                    className="w-full   rounded-2xl "
                />
            </div>
        </div>
    );
};

export default DownloadApp;
