import Link from 'next/link'
import React from 'react'

export default function ReadyToLearnDriving() {
    return (
        <>
            <div className="ReadyToLearnDriving">
                <section className="py-24 flex items-center min-h-screen justify-center bg-white">
                    <div className="mx-auto max-w-[43rem]">
                        <div className="text-center">
                            <p className="text-xl font-medium leading-8 text-indigo-600/95">Ready to learn driving?</p>
                            <h1 className="mt-3 text-[2.5rem] font-bold leading-[4rem] tracking-tight text-black">
                                Ready to get started? Contact us to discuss the best package for you and schedule your first lesson today!
                            </h1>
                            <p className="mt-3 text-lg leading-relaxed text-slate-500">
                                Our team is here to help you make the right choice and start your journey to safe and confident driving.
                            </p>
                        </div>

                        <div className="mt-6 flex items-center justify-center gap-4">
                            <Link href="/MapDriver"
                                className="transform rounded-md bg-blue-600/95 px-5 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                            >
                                Ready to start your journey?
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
