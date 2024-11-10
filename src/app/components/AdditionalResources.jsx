import React from 'react';
import { FaCar, FaGavel, FaMapMarkerAlt } from 'react-icons/fa';

export default function AdditionalResources() {
    const resources = [
        {
            title: 'Driving Tips and Guides',
            description: 'Helpful articles and videos on safe driving practices.',
            icon: <FaCar className="text-blue-600 text-3xl" />,
        },
        {
            title: 'Traffic Laws Overview',
            description: 'Key traffic laws and regulations to know before getting on the road.',
            icon: <FaGavel className="text-blue-600 text-3xl" />,
        },
        {
            title: 'Local Test Centers',
            description: 'Information on nearby driving test centers and how to book a test.',
            icon: <FaMapMarkerAlt className="text-blue-600 text-3xl" />,
        },
    ];

    return (
        <div className="AdditionalResources py-10 px-4 ">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-blue-600">Additional Resources</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {resources.map((resource, index) => (
                    <div key={index} className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                        <div className="mb-4">
                            {resource.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">{resource.title}</h3>
                        <p className="text-gray-600 text-center">{resource.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
