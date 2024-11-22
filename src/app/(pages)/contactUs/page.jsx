import React from 'react';

export const metadata = {
    title: 'Contact Us',
    description: 'contact page',
    keywords: ['contact', 'contact us', 'contact us page'],
};


export default function ContactPage() {
    return (
        <div className="contactUS">
            <div className="relative flex items-top justify-center min-h-screen bg-white dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="mt-8 overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* Contact Info Section */}
                            <div className="p-6 mr-2 bg-gray-100 dark:bg-gray-800 sm:rounded-lg">
                                <h1 className="text-4xl sm:text-4xl mb-3 text-gray-800 dark:text-white font-extrabold tracking-tight">
                                    Get in touch
                                </h1>
                                <p className="text-normal text-lg sm:text-lg font-medium text-gray-600 dark:text-gray-400 mt-2">
                                    We’re here to help you with any questions you might have or to get you started on your driving journey. Reach out to us today!
                                </p>

                                <div className="flex items-center mt-8 text-gray-600 dark:text-gray-400">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        className="w-8 h-8 text-gray-500"
                                    >
                                        <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <div className="ml-4 w-auto text-md tracking-wide font-semibold ">
                                        Mississauga, ON. Canada
                                    </div>
                                </div>

                                <div className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        className="w-8 h-8 text-gray-500"
                                    >
                                        <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                        1-416-616-4715
                                    </div>
                                </div>

                                <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        className="w-8 h-8 text-gray-500"
                                    >
                                        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <div className="ml-4 text-md tracking-wide font-semibold w-40">
                                        info@formulaonedriving.com
                                    </div>
                                </div>

                                {/* Google Maps Iframe */}
                                <div className="mt-6">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.637767888967!2d-79.64411998450099!3d43.58904587912464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3c1bc4a8fd49%3A0x715e7af722d1e143!2sMississauga%2C%20ON!5e0!3m2!1sen!2sca!4v1635436789672!5m2!1sen!2sca"
                                        width="100%"
                                        height="300"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        title="Mississauga Location"
                                    ></iframe>
                                </div>
                            </div>

                            {/* Form Section */}
                            <form className="p-6 flex flex-col justify-center">
                                <div className="flex flex-col">
                                    <label htmlFor="name" className="hidden">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Full Name"
                                        className="w-full mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                                    />
                                </div>

                                <div className="flex flex-col mt-2">
                                    <label htmlFor="email" className="hidden">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Email"
                                        className="w-full mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                                    />
                                </div>

                                <div className="flex flex-col mt-2">
                                    <label htmlFor="tel" className="hidden">Telephone Number</label>
                                    <input
                                        type="tel"
                                        name="tel"
                                        id="tel"
                                        placeholder="Telephone Number"
                                        className="w-full mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                                    />
                                </div>

                                <div className="flex flex-col mt-2">
                                    <textarea
                                        name="message"
                                        id="message"
                                        placeholder="Message"
                                        rows="4"
                                        className="w-full mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 font-semibold focus:border-indigo-500 focus:outline-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="md:w-32 bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-indigo-500 transition ease-in-out duration-300"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
