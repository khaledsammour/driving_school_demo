import React from 'react';
import ServicesImg from '../assets/services.jpg';
import Image from 'next/image';
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
                        alt="billboard"
                    />
                </div>
                {/* Content Section */}
                <div className="lg:w-1/2 w-full bg-gray-100 dark:bg-gray-900 dark:text-gray-400 p-4 rounded-md flex flex-col justify-between">
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
                        Practical driving lessons to learn to drive with confidence and ease.
                    </h3>
                    <p className="text-md mt-4">
                        Embark on your journey to becoming a skilled driver with our comprehensive practical driving lessons, tailored to help you learn to drive with confidence and ease. Our experienced instructors will guide you through every step of the process, providing personalized training that not only focuses on the technical aspects of driving but also emphasizes safety, road awareness, and the essential skills needed to navigate various driving conditions.
                    </p>
                    <div className="mt-6">
                        <a
                            href="#"
                            className=" w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-600 transition duration-200 md:py-4 md:text-lg md:px-10"
                        >
                            Get started
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
