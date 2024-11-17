import AboutSection from '@/app/components/AboutSection'
import AlreadyAStudent from '@/app/components/AlreadyAstudent'
import OurCore from '@/app/components/OurCore'
import ReadyToLearnDriving from '@/app/components/ReadyToLearnDriving'
import WhyChooseUs from '@/app/components/WhyChooseUs'
import React from 'react'

export default function page() {
    return (
        <>
            <div className="aboutUs">

                <AboutSection />
                <AlreadyAStudent />
                <OurCore />
                <WhyChooseUs />
                <ReadyToLearnDriving />
            </div>
        </>
    )
}
