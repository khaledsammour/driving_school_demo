import Services from '@/app/components/Services'
import Testimonials from '@/app/components/Testimonials'
import React from 'react'

export default function page() {
    return (
        <>
            <div className="services py-7">
                <Services />
                <Testimonials />
            </div>
        </>
    )
}
