import React from 'react';
import { FaUserPlus, FaCalendarCheck, FaChartLine, FaMobileAlt, FaCalendarAlt, FaRegChartBar } from 'react-icons/fa';

import websiteImg from '../assets/howtouse-web.jpg';
import mobileImg from '../assets/howtouse-mobile.jpg';
import { FaCheckCircle } from "react-icons/fa";

const steps = [
    { title: 'Registration', description: 'Visit our homepage and click on "Member Area" to create your account. Fill out the required information to get started..', icon: <FaUserPlus /> },
    { title: 'Booking Lessons', description: 'Log in to your account and navigate to the "Book Lessons" section. Choose your preferred lesson type, date, and instructor.', icon: <FaCalendarCheck /> },
    { title: 'Tracking Your Progress', description: 'Access your personal dashboard to view your lesson history, upcoming appointments, and progress reports.', icon: <FaChartLine /> },
];

const mobileSteps = [
    { title: 'Download and Install', description: 'Download our app from the Apple App Store or Google Play. Sign in or register a new account.', icon: <FaMobileAlt /> },
    { title: 'Scheduling and Managing Lessons', description: 'Use the app to easily schedule lessons, view your calendar, and receive notifications about your bookings.', icon: <FaCalendarAlt /> },
    { title: 'Tracking and Feedback', description: 'Stay updated on your progress, receive lesson feedback from instructors, and track completion milestones.', icon: <FaRegChartBar /> },
];

export default function HowToUse() {
    return (
        <div className="HowToUse py-5">
              <h2 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-bold text-blue-600 mb-12 text-center">How to use the website and the app</h2>
              <p className="text-lg text-gray-800 dark:text-white mb-6 text-center">
    <strong>We will have</strong> Navigating our website and app is simple and designed with your convenience in mind. <br />
    Here's a step-by-step guide to help you get started:
</p>

            <div className="px-1 py-1 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-3 lg:px-3 lg:py-3">

                {/* Website Steps Section */}
                <div className="mt-8 mb-4 lg:flex lg:items-center lg:space-x-8">
                    <div className="lg:w-1/2">
                        <h3 className="text-xl font-bold text-blue-600 mb-4">For the Website :</h3>
                        {steps.map((step, index) => (
                            <div className="flex" key={index}>
                                <div className="flex flex-col items-center mr-4">
                                    <div className="flex items-center justify-center w-10 h-10 border rounded-full text-blue-600 text-2xl">
                                        {step.icon}
                                    </div>
                                    {index < steps.length - 1 && <div className="w-px h-full bg-gray-300"></div>}
                                </div>
                                <div className="pt-1 pb-8">
                                    <p className="mb-2 text-lg font-bold">Step {index + 1}: {step.title}</p>
                                    <p className="text-gray-700">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:w-1/2 lg:flex lg:justify-center  mt-8 lg:mt-0">
                        <img
                            src={websiteImg.src}
                            alt="Website Usage"
                            className="w-full h-auto max-w-sm rounded shadow-lg"
                        />
                    </div>
                </div>

                {/* Mobile Steps Section */}
                <div className="mt-16 mb-4 lg:flex lg: lg:items-center lg:space-x-8">
                    <div className="lg:w-1/2">
                        <h3 className="text-xl font-bold text-blue-600 mb-4">For the App : </h3>
                        {mobileSteps.map((step, index) => (
                            <div className="flex" key={index}>
                                <div className="flex flex-col items-center mr-4">
                                    <div className="flex items-center justify-center w-10 h-10 border rounded-full text-blue-600 text-2xl">
                                        {step.icon}
                                    </div>
                                    {index < mobileSteps.length - 1 && <div className="w-px h-full bg-gray-300"></div>}
                                </div>
                                <div className="pt-1 pb-8">
                                    <p className="mb-2 text-lg font-bold">Step {index + 1 }: {step.title}</p>
                                    <p className="text-gray-700">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:w-1/2 lg:flex lg:justify-center mt-8 lg:mt-0">
                        <img
                            src={mobileImg.src}
                            alt="Mobile App Usage"
                            className="w-full h-auto max-w-sm rounded shadow-lg"
                        />
                    </div>
                </div>
  {/* Additional Features Section */}
  <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold text-blue-600 mb-4">Additional Features:</h3>
        <ul className="space-y-4 text-left">
            <li className="flex items-start space-x-4">
                <FaCheckCircle className="h-6 w-6 text-blue-600" />
                <div>
                    <h6 className="text-lg font-semibold">Payments and Invoicing</h6>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Make secure payments for your lessons directly through the app or website.</p>
                </div>
            </li>
            <li className="flex items-start space-x-4">
                <FaCheckCircle className="h-6 w-6 text-blue-600" />
                <div>
                    <h6 className="text-lg font-semibold">Notifications and Reminders</h6>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Get reminders for your upcoming lessons and important updates.</p>
                </div>
            </li>
            <li className="flex items-start space-x-4">
                <FaCheckCircle className="h-6 w-6 text-blue-600" />
                <div>
                    <h6 className="text-lg font-semibold">Support</h6>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Access our support section for FAQs or to contact our team if you need assistance.</p>
                </div>
            </li>
        </ul>
        <p className="text-lg text-gray-700 mt-4">Our digital platforms are designed to enhance your learning experience and keep everything you need right at your fingertips!</p>
    </div>
                {/* Success Section 
                <div className="flex mt-16">
                    <div className="flex flex-col items-center mr-4">
                        <div className="flex items-center justify-center w-10 h-10 border rounded-full text-blue-600 text-2xl">
                            <svg className="w-6 text-gray-600" stroke="currentColor" viewBox="0 0 24 24">
                                <polyline fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" points="6,12 10,16 18,8"></polyline>
                            </svg>
                        </div>
                    </div>
                    <div className="pt-1">
                        <p className="mb-2 text-lg font-bold">Success</p>
                        <p className="text-gray-700">Congratulations, you've completed all steps successfully!</p>
                    </div>
                </div>*/}
            </div>
        </div>
    );
}
