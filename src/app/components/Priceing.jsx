"use client";
import React, { useEffect, useState } from 'react';
import PricingCard from './PricingCard';
import Loader from './loader';
import { fetchPackagesFromFirestore } from '@/app/services/packageService';

export default function Pricing() {
    const [Packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPackages = async () => {
            try {
                const AllPackages = await fetchPackagesFromFirestore();
                console.log("Fetched Packages:", AllPackages);

                setPackages(AllPackages);
            } catch (err) {
                setError("Failed to fetch users.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getPackages();
    }, []);

    console.log("Packages:", Packages);

    if (loading) return <Loader />;
    if (error) return toast.error(error);

    return (
        <div className="pricing py-10">
            <div className="text">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Pricing</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-3 my-5">
                {Packages.map((item) => (
                    <PricingCard
                        key={item.id}
                        Tittle={item.name}
                        price={item.price}
                        discount={item.discount}
                        features={item.include}
                    />
                ))}
            </div>
        </div>
    );
}
