"use client";

import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";

export default function CheckoutPage({ amount, lessonPackageName }) {
    const stripe = useStripe();
    const elements = useElements();

    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function initializePayment() {
            try {
                const res = await fetch("http://localhost:3000//api/checkout", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ amount, lessonPackageName }),
                });

                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                setClientSecret(data.id);
            } catch (error) {
                console.error("Error initializing payment:", error.message);
                toast.error("Failed to initialize payment. Please try again.");
            }
        }

        if (amount && lessonPackageName) {
            initializePayment();
        }
    }, [amount, lessonPackageName]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements || !clientSecret) return;

        setLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `http://localhost:3000/payment-success?amount=${amount}&lessonPackageName=${lessonPackageName}`,
            },
        });

        if (error) {
            setLoading(false);
            toast.error(error.message || "Payment confirmation failed.");
        }
    };

    if (!clientSecret || !stripe || !elements) {
        return (
            <div className="flex items-center justify-center">
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-blue-500"
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="CheckoutPage">
            <h2 className="text-center text-2xl mb-4">{`Pay for ${lessonPackageName}`}</h2>
            <form onSubmit={handleSubmit}>
                <PaymentElement />
                <button
                    disabled={!stripe || loading}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 disabled:opacity-50"
                >
                    {loading ? "Processing..." : `Pay $${amount}`}
                </button>
            </form>
        </div>
    );
}
