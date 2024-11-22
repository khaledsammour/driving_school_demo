"use client";

import React, { useRef, useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { MdFormatQuote, MdStar } from "react-icons/md";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Testimonials() {
    const swiperRef = useRef(null);
    const [AllTestimonials, setAllTestimonials] = React.useState([]);

    const fetchTestimonials = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "testimonials"));
            const testimonials = querySnapshot.docs.map((doc) => doc.data());
            setAllTestimonials(testimonials);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
        }
    }

    useEffect(() => {
        fetchTestimonials();
    }, []);
    return (
        <div className="Testimonials py-10 px-5">
            <div className="text">
                <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Testimonials</h2>
            </div>
            <div className="my-10">
                <div className="slider w-full h-auto my-10 relative">
                    <Swiper
                        ref={swiperRef}
                        slidesPerView={1}
                        centeredSlides={true}
                        loop={true}
                        spaceBetween={10}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        navigation={{
                            prevEl: '.swiper-button-prev-custom',
                            nextEl: '.swiper-button-next-custom',
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                                centeredSlides: true,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                        modules={[Pagination, Navigation, Autoplay]}
                        className="mySwiper"
                        data-aos="fade-up"
                    >
                        {AllTestimonials.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-white shadow-xl rounded-lg p-6">
                                    <div className="flex justify-center mb-4">
                                        <Image
                                            src={item.img || "https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"}
                                            className="rounded-full"
                                            width={100}
                                            height={100}
                                            alt={item.name}
                                        />
                                    </div>
                                    <h5 className="font-bold text-center text-sm mb-2 lg:text-lg">
                                        {item.name}
                                    </h5>
                                    <h6 className="font-semibold text-center my-2">
                                        {item.type}
                                    </h6>
                                    <div className="flex justify-center mb-4 text-blue-500">

                                        {[...Array(5)].map((_, index) => (
                                            <MdStar
                                                key={index}
                                                className={index < +(item.rate) ? "text-blue-500" : "text-gray-400"}
                                            />
                                        ))}
                                    </div>
                                    <p className="mb-2 flex">
                                        <sup>
                                            <MdFormatQuote className="text-[35px] mx-2 text-blue-600" />
                                        </sup>
                                        {item.description}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <button className="swiper-button-prev-custom absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full z-10">
                        <FaArrowLeft />
                    </button>
                    <button className="swiper-button-next-custom absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full z-10">
                        <FaArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
}
