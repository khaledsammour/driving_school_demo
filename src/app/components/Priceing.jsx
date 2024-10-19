import React from 'react';
import PricingCard from './PricingCard';
import { PricingData } from '@/app/utils/dataPricing';

export default function Pricing() {
    console.log(PricingData);

    return (
        <div className="pricing py-10">
            <div className="text">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Pricing</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-3 my-5">
                {PricingData.map((item) => (
                    <PricingCard
                        key={item.id}
                        id={item.id}
                        Tittle={item.title}
                        price={item.price}
                        features={item.features}
                    />
                ))}
            </div>
        </div>
    );
}
