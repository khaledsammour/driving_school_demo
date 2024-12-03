import React from 'react';
import aboutOne from '../assets/about-1.jpg';
import aboutTwo from '../assets/about-2.jpg';
import Image from 'next/image';
const AboutSection = () => {
    return (
        <section className="py-24 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                <div className="w-full justify-start items-center gap-12 grid lg:grid-cols-2 grid-cols-1">
                    <div className="w-full justify-center items-start gap-6 grid sm:grid-cols-2 grid-cols-1 lg:order-first order-last">
                        <div className="pt-24 lg:justify-center sm:justify-end justify-start items-start gap-2.5 flex">
                            <Image
                                className="rounded-xl object-cover"
                                src={aboutOne}
                                alt="about Us image"
                            />
                        </div>
                        <Image
                            className="sm:ml-0 ml-auto rounded-xl object-cover"
                            src={aboutTwo}
                            alt="about Us image"
                        />
                    </div>

                    <div className="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
                        <div className="w-full flex-col justify-center items-start gap-8 flex">
                            <div className="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                                <h2 className="text-blue-600 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                                    About Formula One
                                </h2>
                                <p className="text-gray-600 text-base font-normal leading-relaxed lg:text-start text-center">
                                    At Formula One Driving, we believe that driving is a life skill that opens up a world of opportunities.
                                    Our mission is to empower individuals with the confidence and knowledge they need to navigate
                                    the road safely and independently.
                                    <span className='mt-2'>
                                        Our mission is to provide high-quality driving education that prioritizes safety, confidence, and
                                        lifelong driving skills. We are committed to creating a supportive learning environment where every
                                        student feels valued and equipped to succeed.
                                    </span>

                                </p>
                            </div>

                            <div className="w-full lg:justify-start justify-center items-center sm:gap-10 gap-5 inline-flex">
                                <div className="flex-col justify-start items-start inline-flex">
                                    <h3 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">2+</h3>
                                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">Years of Experience</h6>
                                </div>
                                <div className="flex-col justify-start items-start inline-flex">
                                    <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">10+</h4>
                                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">Driving instructors</h6>
                                </div>
                                <div className="flex-col justify-start items-start inline-flex">
                                    <h4 className="text-gray-900 text-4xl font-bold font-manrope leading-normal">100+</h4>
                                    <h6 className="text-gray-500 text-base font-normal leading-relaxed">Happy Clients</h6>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
