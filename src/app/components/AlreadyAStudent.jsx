import React from 'react';
import AlreadyAStudentImg from "../../app/assets/AlreadyAStudent.jpg";
import Image from 'next/image';

export default function AlreadyAStudent() {
    return (
        <section className="py-24">
            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto grid lg:grid-cols-2 grid-cols-1 gap-12">

                {/* Left Text Content */}
                <div className="flex flex-col justify-center lg:items-start md:items-center  gap-8 text-center lg:text-left">
                    <h2 className="text-blue-600 text-4xl font-bold font-manrope leading-normal">
                        Already A Student?
                    </h2>
                    <p className="text-black text-base font-normal leading-relaxed">
                        If you are already a registered student, please click on one of the buttons to go to your portal or the online training website.
                    </p>
                    <button className="px-6 py-3 text-gray-900 font-semibold border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300">
                        Student Portal
                    </button>
                </div>

                {/* Right Image Content */}
                <div className="flex justify-center lg:justify-end">
                    <Image
                        className="rounded-xl object-cover"
                        src={AlreadyAStudentImg}
                        alt="Already A Student"
                    />
                </div>

            </div>
        </section>
    );
}
