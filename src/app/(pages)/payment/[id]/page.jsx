"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "@/app/components/CheckoutPage";
import { db } from "@/app/firebase";
import { doc, getDoc } from "firebase/firestore";
import Loader from "@/app/components/loader";
import { useRouter } from "next/navigation";
if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Page({ params }) {
    const { id } = params;
    const [dataPackage, setDataPackage] = useState(null);
    if (window !== undefined) {
        localStorage.setItem("id", id);
    }
    const router = useRouter();
    if (!id) {
        router.push("/not-found");
    }

    useEffect(() => {        
        const fetchPackage = async () => {
            if (!id) return;
            localStorage.removeItem('selectedPackage')
            try {
                const docRef = doc(db, "packages", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const PackageData = docSnap.data();
                    setDataPackage(PackageData);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching PackageData:", error);
            }
        };

        fetchPackage();
    }, [id]);

    if (!dataPackage) {
        return <Loader />;
    }

    return (
        <div className="font-sans bg-white/20 p-4 py-10">
            <div className="md:max-w-5xl max-w-xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 order-1">
                        <h2 className="text-3xl font-extrabold text-gray-800">Make a Payment</h2>
                        <p className="text-gray-800 text-sm mt-4">
                            Complete your transaction swiftly and securely with our easy-to-use payment process.
                        </p>
                        <div className="mt-8">
                            <Elements stripe={stripePromise}>
                                <CheckoutPage amount={dataPackage.price} lessonPackageName={dataPackage.name} />
                            </Elements>
                        </div>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-md">
                        <h2 className="text-3xl font-extrabold text-gray-800">Order Summary</h2>
                        <ul className="text-gray-800 mt-8 space-y-4">
                            <li className="flex flex-wrap gap-4 text-sm">
                                Package Name <span className="ml-auto font-bold">{dataPackage.name}</span>
                            </li>
                            <li className="flex flex-wrap gap-4 text-sm">
                                Package Price <span className="ml-auto font-bold">${dataPackage.price.toFixed(2)}</span>
                            </li>
                            <li className="flex flex-wrap gap-4 text-sm">
                                Tax <span className="ml-auto font-bold">$0.00</span>
                            </li>
                            <li className="flex flex-wrap gap-4 text-sm font-bold border-t-2 pt-4">
                                Total <span className="ml-auto">${dataPackage.price.toFixed(2)}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
