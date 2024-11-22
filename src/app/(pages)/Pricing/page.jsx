import Pricing from '@/app/components/Priceing'
import React from 'react'

export const metadata = {
    title: 'Pricing',
    description: 'Pricing page',
    keywords: ['pricing', 'features', 'pricing page'],
};

export default function page() {
    return (
        <>
            <div className="Pricing py-7">
                <Pricing />
            </div>
        </>
    )
}
