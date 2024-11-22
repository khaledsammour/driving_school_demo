import AdditionalResources from '@/app/components/AdditionalResources'
import Features from '@/app/components/Features'
import HowToUse from '@/app/components/HowToUse'
import Pricing from '@/app/components/Priceing'
import Services from '@/app/components/Services'
import React from 'react'

export const metadata = {
    title: 'Services',
    description: 'services page',
    keywords: ['services', 'features', 'pricing', 'additional resources', 'how to use'],
};


export default function page() {
    return (
        <>
            <div className="services py-7">
                <Features />
                <Services />
                <HowToUse />
                <Pricing />
                <AdditionalResources />
            </div>
        </>
    )
}
