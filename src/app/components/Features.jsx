import React from 'react';
import { FaChalkboardTeacher, FaBook, FaCalendarAlt, FaCar, FaBullseye, FaTrophy } from 'react-icons/fa'; // Import icons from react-icons

const cardData = [
    {
        title: 'Experienced Instructors',
        description: 'Our certified instructors bring years of experience to the table, ensuring that each lesson is engaging, informative, and tailored to your learning style.',
        icon: <FaChalkboardTeacher />,
    },
    {
        title: 'Comprehensive Curriculum',
        description: 'From basic driving techniques to advanced road safety practices, our curriculum covers everything you need to become a skilled and responsible driver.',
        icon: <FaBook />,
    },
    {
        title: 'Flexible Scheduling',
        description: 'We understand that life is busy, so we offer flexible scheduling options, including evenings and weekends, to fit your lifestyle.',
        icon: <FaCalendarAlt />,
    },
    {
        title: 'Modern Vehicles',
        description: 'Learn in the comfort of our modern, well-maintained vehicles, equipped with the latest safety features to give you peace of mind while you learn.',
        icon: <FaCar />,
    },
    {
        title: 'Personalized Lessons',
        description: 'Every student is different, which is why we customize our lessons to address your specific needs and goals, helping you progress at your own pace.',
        icon: <FaBullseye />,
    },
    {
        title: 'Success Rate',
        description: 'Our students consistently achieve high pass rates on their driving tests, thanks to our proven teaching methods and supportive learning environment.',
        icon: <FaTrophy />,
    }
];

export default function Features() {
    return (
        <div className="Features py-10">
            <div className="text">
                <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Our Features</h2>
            </div>
            <div className="container mx-auto py-10 px-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {cardData.map((card, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <div className="text-4xl mb-4 text-center flex items-center justify-center text-blue-600">{card.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{card.title}</h3>
                        <p className="text-gray-600">{card.description}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}
