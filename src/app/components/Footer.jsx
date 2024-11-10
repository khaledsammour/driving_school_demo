import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <>
            <footer className="flex flex-col space-y-10 justify-center bg-gray-200 py-10 px-5">
                {/* Navigation links using Next.js Link component */}
                <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
                    <Link href="/" className="hover:text-gray-900">Home</Link>
                    <Link href="/AboutUs" className="hover:text-gray-900">About us</Link>
                    <Link href="/Services" className="hover:text-gray-900">Services</Link>
                    <Link href="/Pricing" className="hover:text-gray-900">Pricing</Link>
                    <Link href="/contactUs" className="hover:text-gray-900">Contact</Link>
                    <Link href="/PrivacyPolicy" className="hover:text-gray-900">Policies</Link>
                </nav>

                {/* Social media icons */}
                <div className="flex justify-center space-x-5">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/facebook-new.png" alt="Facebook" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/linkedin-2.png" alt="LinkedIn" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/instagram-new.png" alt="Instagram" />
                    </a>
                    <a href="https://messenger.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/facebook-messenger--v2.png" alt="Messenger" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/twitter.png" alt="Twitter" />
                    </a>
                    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.icons8.com/fluent/30/000000/tiktok.png" alt="TikTok" />
                    </a>
                </div>

                <p className="text-center text-gray-700 font-medium">&copy; 2024 FormulaOne Driving School. All Rights Reserved.</p>
            </footer>
        </>
    )
}
