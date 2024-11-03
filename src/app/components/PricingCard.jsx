import Link from 'next/link';
import React from 'react';

export default function PricingCard({ id, Tittle, price, discount, features }) {
    // console.log("features:", features);

    return (
        <div className="m-4 flex flex-col justify-between p-5 bg-white border rounded shadow-sm" key={id}>
            <div className="mb-6">
                <h1 className='lg:text-4xl font-bold md:text-2xl text-lg text-center pt-2 pb-5'>{Tittle}</h1>
                <div className="flex items-center justify-between pb-6 mb-6 border-b">
                    <div>
                        <p className="text-sm font-bold tracking-wider uppercase">Get started for</p>
                        <p className="text-3xl font-bold mx-3 ">${price}<span className="text-lg mx-3 text-gray-500">{discount}% off</span> </p>
                    </div>
                    <div className="flex items-center justify-center w-24 h-24 rounded-full bg-blue-gray-50">
                        <svg className="w-10 h-10 text-gray-600" viewBox="0 0 24 24" strokeLinecap="round" strokeWidth="2">
                            <path
                                d="M12,7L12,7 c-1.657,0-3-1.343-3-3v0c0-1.657,1.343-3,3-3h0c1.657,0,3,1.343,3,3v0C15,5.657,13.657,7,12,7z"
                                fill="none"
                                stroke="currentColor"
                            />
                            <path
                                d="M15,23H9v-5H7v-6 c0-1.105,0.895-2,2-2h6c1.105,0,2,0.895,2,2v6h-2V23z"
                                fill="none"
                                stroke="currentColor"
                            />
                        </svg>
                    </div>
                </div>
                <div>
                    <p className="mb-2 font-bold tracking-wide">Features</p>
                    <ul className="space-y-2">
                        {
                            features.map((feature, index) => (
                                <li className="flex items-center" key={index}>
                                    <div className="mr-2">
                                        <svg className="w-4 h-4 text-purple-600" viewBox="0 0 24 24" strokeLinecap="round" strokeWidth="2">
                                            <polyline fill="none" stroke="currentColor" points="6,12 10,16 18,8"></polyline>
                                            <circle cx="12" cy="12" fill="none" r="11" stroke="currentColor"></circle>
                                        </svg>
                                    </div>
                                    <p className="font-medium text-gray-800">{feature}</p>
                                </li>
                            ))
                        }

                    </ul>
                </div>
            </div>
            <div>
                <Link
                    href="/payment"
                    className="inline-flex items-center justify-center w-full h-12 px-6 mb-4 font-medium tracking-wide text-white transition duration-200 bg-gray-800 rounded shadow-md hover:bg-gray-900 focus:shadow-outline focus:outline-none"
                >
                    Get started
                </Link>

            </div>
        </div>
    );
}
