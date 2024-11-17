"use client";
import React from 'react';
import { motion } from 'framer-motion';
import LottieHandler from './LottieHandler';
import HeroAnimate from "@/app/assets/hero.json";
import Link from 'next/link';

export default function Hero() {
    // Define animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="hero">
            <section className="sm:mt-6 lg:mt-8 mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="my-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 flex gap-3 lg:justify-between lg:flex lg:flex-row flex-col"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    transition={{ duration: 0.5 }}
                >
                    {/* Animated text block */}
                    <motion.div
                        className="sm:text-center lg:text-left"
                        variants={containerVariants}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-6xl">
                            <span className="block xl:inline">Let us get you ready to drive! </span>
                            <span className="block text-indigo-600 xl:inline">We teach the art of driving safely. </span>
                        </h1>
                        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                            Unlock the road to freedom and confidence with our driving lessons tailored just for you. Whether
                            you're a beginner or looking to brush up on your skills, we offer personalized training to help you
                            master the road. Join us and start your journey towards becoming a confident, safe driver.
                        </p>
                        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                            <div className="rounded-md shadow">
                                <Link
                                    href="/MapDriver"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-600 md:py-4 md:text-lg md:px-10"
                                >
                                    Get started
                                </Link>
                            </div>
                            <div className="mt-3 sm:mt-0 sm:ml-3">
                                <Link
                                    href="/Services"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-800 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                                >
                                    Learn more
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* Animated Lottie section */}
                    <motion.div
                        className="lg:inset-y-0 lg:right-0 lg:w-1/2 my-4"
                        variants={containerVariants}
                        transition={{ duration: 0.5 }}
                    >
                        <LottieHandler animate={HeroAnimate} />
                    </motion.div>
                </motion.div>
            </section>
        </div>
    );
}
