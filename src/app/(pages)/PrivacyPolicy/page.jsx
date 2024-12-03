"use client";
import React, { useState } from 'react';

const PrivacyPolicy = () => {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (index) => {
        setOpenSection(openSection === index ? null : index);
    };

    return (
        <div className="bg-white px-4 py-10">
            <div className="max-w-full mx-auto mt-8">
                <ul className="border border-gray-400 rounded-md divide-y bg-gray-100 divide-gray-400">
                    {['Cancellation and Refund Policy', 'Safety Protocols', 'Privacy Policy'].map((section, index) => (
                        <li key={index}>
                            <button
                                className="flex items-center justify-between w-full p-4 focus:outline-none"
                                onClick={() => toggleSection(index)}
                            >
                                <span className="text-lg font-bold">{section}</span>
                                <svg
                                    className={`w-4 h-4 fill-current transition-transform transform ${openSection === index ? 'rotate-180' : ''
                                        }`}
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 13.535l4.95-4.95 1.414 1.414-6.364 6.364-6.364-6.364 1.414-1.414z" />
                                </svg>
                            </button>
                            <div className={`accordion-content ${openSection === index ? 'block' : 'hidden'} p-4`}>
                                {section === 'Cancellation and Refund Policy' && (
                                    <div className='container mx-auto px-4 py-8'>
                                        <h2 className="text-2xl font-bold mb-2">Cancellation and Refund Policy</h2>
                                        <p>We understand that plans can change, and we are committed to providing flexibility while also ensuring our instructors' schedules are respected. Please review our cancellation policy to understand your options for rescheduling or canceling your lessons and packages.</p>

                                        <h3 className="text-lg font-bold mt-4">1. Individual Lesson Cancellations</h3>
                                        <ul className="list-disc list-inside mb-4">
                                            <li><strong>24-Hour Notice Required:</strong> To receive a full refund for a canceled lesson, you must notify us at least 24 hours before the scheduled lesson time.</li>
                                            <li><strong>Cancellations Made Within 24 Hours:</strong> If you cancel less than 24 hours before your lesson, you will only be eligible for a 50% refund of the lesson fee.</li>
                                            <li><strong>No-Show Policy:</strong> If you fail to attend a scheduled lesson without notifying us, no refund will be issued.</li>
                                        </ul>

                                        <h3 className="text-lg font-bold mt-4">2. Package Cancellations</h3>
                                        <ul className="list-disc list-inside mb-4">
                                            <li><strong>Canceling a Lesson Package:</strong> You may cancel a prepaid lesson package at any time. However, a 10% handling fee will be deducted from the total amount of the package before the refund is issued.</li>
                                            <li><strong>Refund Calculations for Used Lessons:</strong> If you cancel a package after using some of the lessons, the used lessons will be charged at the regular single-lesson rate. The remaining amount, minus the 10% handling fee, will be refunded.</li>
                                        </ul>

                                        <h3 className="text-lg font-bold mt-4">3. How to Cancel</h3>
                                        <ul className="list-disc list-inside mb-4">
                                            <li><strong>To cancel a lesson or package:</strong> Please contact us by phone or email. Cancellations must be confirmed by our team to be valid.</li>
                                            <li><strong>Confirmation:</strong> You will receive a confirmation email once your cancellation has been processed.</li>
                                        </ul>

                                        <h3 className="text-lg font-bold mt-4">4. Rescheduling Lessons</h3>
                                        <ul className="list-disc list-inside mb-4">
                                            <li><strong>Rescheduling with 24-Hour Notice:</strong> You may reschedule your lesson at no additional cost if you provide at least 24 hours' notice.</li>
                                            <li><strong>Rescheduling Within 24 Hours:</strong> If you need to reschedule a lesson with less than 24 hours' notice, a rescheduling fee may apply.</li>
                                        </ul>

                                        <h3 className="text-lg font-bold mt-4">5. Exceptions</h3>
                                        <ul className="list-disc list-inside mb-4">
                                            <li><strong>Emergency Circumstances:</strong> We understand that emergencies happen. In exceptional circumstances, such as medical emergencies or severe weather, we may waive the cancellation fees at our discretion. Documentation may be required.</li>
                                        </ul>

                                        <p className="mt-4">Thank you for understanding our policies, which are in place to ensure fair and efficient scheduling for all students and instructors. If you have any questions about our cancellation policy, please don’t hesitate to contact us.</p>
                                    </div>

                                )}
                                {section === 'Safety Protocols' && (
                                    <div className='container mx-auto px-4 py-8'>
                                        <h2 className="text-2xl font-bold mb-2">Safety Protocols</h2>
                                        <p>At Formula One Driving School, the safety of our students, instructors, and the community is our top priority. We have implemented the following safety protocols to ensure a secure and supportive learning environment.</p>

                                        <h3 className="text-lg font-bold mt-4">1. Vehicle Safety Checks</h3>
                                        <ul className="list-disc list-inside mb-4">
                                            <li><strong>Daily Inspections:</strong> Our vehicles undergo thorough safety checks before each lesson, including brakes, lights, tires, mirrors, and seatbelt functionality.</li>
                                            <li><strong>Regular Maintenance:</strong> All vehicles are serviced regularly by certified professionals to ensure optimal performance and safety standards.</li>
                                            <li><strong>Sanitization:</strong> We sanitize all high-touch surfaces, such as door handles, steering wheels, and gear shifts, before and after every lesson.</li>
                                        </ul>

                                        <h3 className="text-lg font-bold mt-4">2. Instructor Qualifications</h3>
                                        <ul className="list-disc list-inside mb-4">
                                            <li><strong>Certified Instructors:</strong> All driving instructors are fully licensed and certified, with extensive training in defensive driving techniques and emergency response.</li>
                                            <li><strong>Background Checks:</strong> Each instructor undergoes a comprehensive background check to ensure they meet our high standards for safety and professionalism.</li>
                                            <li><strong>Ongoing Training:</strong> Instructors participate in regular training sessions to stay updated on the latest road safety practices and driving regulations.</li>
                                        </ul>

                                        <h3 className="text-lg font-bold mt-4">3. Student Safety Measures</h3>
                                        <ul className="list-disc list-inside mb-4">
                                            <li><strong>Seatbelt Policy:</strong> All students and instructors must wear seatbelts at all times. Lessons will not begin until everyone is properly buckled in.</li>
                                            <li><strong>Emergency Procedures:</strong> Students are briefed on emergency procedures before the first lesson, including how to respond to unexpected situations.</li>
                                            <li><strong>Appropriate Footwear:</strong> Students must wear flat, closed-toe shoes for safe operation of the vehicle.</li>
                                        </ul>

                                        <h3 className="text-lg font-bold mt-4">4. Weather Conditions</h3>
                                        <ul className="list-disc list-inside mb-4">
                                            <li><strong>Severe Weather Policy:</strong> Lessons may be canceled or rescheduled if severe weather conditions (e.g., heavy snow, ice, thunderstorms) pose a risk to safety. Students will be notified as soon as possible in these cases.</li>
                                            <li><strong>Driving in Adverse Conditions:</strong> When safe and appropriate, students will be given lessons on how to drive in various weather conditions to prepare for real-world scenarios.</li>
                                        </ul>

                                        <h3 className="text-lg font-bold mt-4">5. COVID-19 and Health Safety</h3>
                                        <ul className="list-disc list-inside mb-4">
                                            <li><strong>Health Screening:</strong> Students and instructors are encouraged to self-monitor for any symptoms of illness. If anyone feels unwell, they are asked to stay home and reschedule their lesson.</li>
                                            <li><strong>Face Masks:</strong> Instructors and students may be required to wear face masks during lessons based on local health regulations or during flu seasons.</li>
                                            <li><strong>Hand Sanitizer:</strong> Hand sanitizer is available in all vehicles for use before and after lessons.</li>
                                        </ul>

                                        <h3 className="text-lg font-bold mt-4">6. Emergency Situations</h3>
                                        <ul className="list-disc list-inside mb-4">
                                            <li><strong>First Aid:</strong> Instructors are trained in basic first aid and carry a first aid kit in every vehicle.</li>
                                            <li><strong>Breakdown Procedures:</strong> In case of vehicle breakdown, instructors are trained to handle the situation safely, including moving the car to a secure location and notifying emergency services if needed.</li>
                                        </ul>

                                        <h3 className="text-lg font-bold mt-4">7. Safety During Lessons</h3>
                                        <ul className="list-disc list-inside mb-4">
                                            <li><strong>Hands-on Guidance:</strong> Instructors use dual controls (brakes) to assist and ensure safety when necessary.</li>
                                            <li><strong>Distraction-Free Environment:</strong> Students are not allowed to use mobile phones or other distractions during lessons. Instructors will also ensure a focused and calm learning environment.</li>
                                        </ul>

                                        <h3 className="text-lg font-bold mt-4">8. Reporting and Feedback</h3>
                                        <ul className="list-disc list-inside mb-4">
                                            <li><strong>Incident Reporting:</strong> Any safety incidents, near misses, or vehicle concerns must be reported immediately to our management team.</li>
                                            <li><strong>Feedback:</strong> We value feedback from students and parents regarding safety. Please feel free to reach out with any concerns or suggestions.</li>
                                        </ul>

                                        <p className="mt-4">Our commitment to safety ensures that everyone who learns with us can do so with confidence and peace of mind. If you have any questions about our safety protocols, please contact us.</p>
                                    </div>
                                )}
                                {section === 'Privacy Policy' && (
                                    <div className="container mx-auto px-4 py-8">
                                        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                                        <p className="mb-4">
                                            At Formula One Driving School, we respect your privacy and are committed to protecting the personal information you share with us.
                                        </p>
                                        <h2 className="text-2xl font-bold mb-2">1. Information We Collect</h2>
                                        <ul className="list-disc list-inside mb-4">
                                            <li>
                                                <strong>Personal Information:</strong> We collect personal information you provide, such as your name, phone number, email, home address, and date of birth.
                                            </li>
                                            <li>
                                                <strong>Payment Information:</strong> All payment details are handled by secure terminal Stripe to process transactions securely.
                                            </li>
                                            <li>
                                                <strong>Driving Records:</strong> Information about your driving experience and records.
                                            </li>
                                            <li>
                                                <strong>Technical Information:</strong> Collected via cookies, such as IP address, browser type, and device info.
                                            </li>
                                        </ul>

                                        <h2 className="text-2xl font-bold mb-2">2. How We Use Your Information</h2>
                                        <ul className="list-disc list-inside mb-4">
                                            <li>To provide services and manage driving lessons.</li>
                                            <li>To improve customer experience and analyze usage data.</li>
                                            <li>
                                                <strong>Marketing:</strong> We may send you promotional materials with your consent.
                                            </li>
                                            <li>
                                                <strong>Safety and Compliance:</strong> For legal compliance and security.
                                            </li>
                                        </ul>

                                        <h2 className="text-2xl font-bold mb-2">3. How We Share Your Information</h2>
                                        <ul className="list-disc list-inside mb-4">
                                            <li>
                                                <strong>Third-Party Service Providers:</strong> To trusted providers like payment processors.
                                            </li>
                                            <li>
                                                <strong>Legal Requirements:</strong> When legally required to disclose your information.
                                            </li>
                                            <li>
                                                <strong>Business Transfers:</strong> Information may be transferred in case of mergers or acquisitions.
                                            </li>
                                        </ul>

                                        <h2 className="text-2xl font-bold mb-2">4. Data Security</h2>
                                        <p className="mb-4">
                                            We implement security measures, including encryption and firewalls.
                                        </p>

                                        <h2 className="text-2xl font-bold mb-2">5. Your Rights and Choices</h2>
                                        <ul className="list-disc list-inside mb-4">
                                            <li>Access and correction of your data.</li>
                                            <li>Request data deletion.</li>
                                            <li>Opt-out of marketing communications.</li>
                                        </ul>

                                        <h2 className="text-2xl font-bold mb-2">6. Cookies and Tracking Technologies</h2>
                                        <ul className="list-disc list-inside mb-4">
                                            <li>Adjust cookie settings in your browser.</li>
                                            <li>Third-party analytics tools may collect data.</li>
                                        </ul>

                                        <h2 className="text-2xl font-bold mb-2">7. Children's Privacy</h2>
                                        <p className="mb-4">
                                            Services are not intended for children under 13.
                                        </p>

                                        <h2 className="text-2xl font-bold mb-2">8. Changes to This Policy</h2>
                                        <p className="mb-4">
                                            We may update this Privacy Policy, and changes will be posted on this page.
                                        </p>

                                        <h2 className="text-2xl font-bold mb-2">9. Contact Us</h2>
                                        <p className="mb-4">
                                            For questions, please contact us.
                                        </p>
                                        <p className="mb-4">
                                            By using our services, you consent to this Privacy Policy.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
