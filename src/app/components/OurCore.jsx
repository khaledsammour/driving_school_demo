import React from 'react'
import { FaShieldAlt, FaStar, FaHandshake, FaUsers } from 'react-icons/fa';
const features = [
    {
        icon: <FaShieldAlt />,
        title: 'Safety',
        description: 'We prioritize the safety of our students and the community in everything we do.',
    },
    {
        icon: <FaStar />,
        title: 'Excellence',
        description: 'We strive for the highest standards in driving education and customer service.',
    },
    {
        icon: <FaHandshake />,
        title: 'Respect',
        description: 'We treat every student with respect and personalize our approach to meet their individual needs.',
    },
    {
        icon: < FaUsers />,
        title: 'Community',
        description: 'We believe in giving back to the community and promoting safe driving practices.',
    },
];

export default function OurCore() {
    return (
        <>
            <div className="OurCore py-10">
                <div className="bg-gray-50 py-12">
                    <div className="text">
                        <h2 className="text-3xl font-bold text-blue-600 mb-8 text-center">Our Core Values and Commitment to Excellence </h2>
                    </div>
                    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
                        {features.map((feature, index) => (
                            <div key={index} className="flex flex-col items-center text-center p-6 bg-white shadow-md rounded-lg">
                                <div className="flex items-center justify-center w-14 h-14 bg-red-500 text-white rounded-full mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}
