import React from 'react';
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import whyChooseImg from '../assets/whyChooseUs.jpg';
import Image from 'next/image';

export default function WhyChooseUs() {
    return (
        <div className="WhyChooseUs">
            <section className="overflow-hidden bg-white py-8 sm:py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-16 lg:gap-20 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pr-8 lg:pt-4">
                            <div className="lg:max-w-lg">
                                <h2 className="text-2xl font-bold leading-7 text-indigo-600">Why Choosing Formula One Driving School</h2>
                                <p className="mt-6 text-lg leading-8 text-gray-600">
                                    Choosing the right driving school is an important decision. Here’s why Formula One Driving stands out
                                </p>
                                <dl className="mt-10 max-w-xl space-y-4 text-base leading-7 text-gray-600 lg:max-w-none">
                                    <div className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">
                                            <IoIosCheckmarkCircleOutline className="absolute left-1 top-1 h-5 w-5 text-indigo-600" />
                                            Proven track record of student success.
                                        </dt>
                                    </div>
                                    <div className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">
                                            <IoIosCheckmarkCircleOutline className="absolute left-1 top-1 h-5 w-5 text-indigo-600" />
                                            Highly qualified and experienced instructors.
                                        </dt>
                                    </div>
                                    <div className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">
                                            <IoIosCheckmarkCircleOutline className="absolute left-1 top-1 h-5 w-5 text-indigo-600" />
                                            Flexible lesson scheduling to fit your lifestyle.
                                        </dt>
                                    </div>
                                    <div className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">
                                            <IoIosCheckmarkCircleOutline className="absolute left-1 top-1 h-5 w-5 text-indigo-600" />
                                            Modern, safe vehicles for all training sessions.
                                        </dt>
                                    </div>
                                    <div className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-900">
                                            <IoIosCheckmarkCircleOutline className="absolute left-1 top-1 h-5 w-5 text-indigo-600" />
                                            Personalized lesson plans tailored to your needs.
                                        </dt>
                                    </div>
                                </dl>
                                <p className="mt-10">
                                    Our team of experienced instructors and dedicated staff are the heart of Formula One Driving
                                    School. With a diverse range of backgrounds and expertise, each member brings something unique
                                    to our school. Get to know the people who make your learning experience exceptional.
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-center ">
                            <Image
                                src={whyChooseImg}
                                alt="Product screenshot"
                                className="w-full max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 lg:w-[40rem]"
                                width="2432"
                                height="1442"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
