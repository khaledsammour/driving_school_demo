"use client";

import React from "react";
import {
    PaymentElement,
    Elements,
    ElementsConsumer
} from '@stripe/react-stripe-js';
import toast from "react-hot-toast";
import Stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';

class CheckoutForm extends React.Component {
    handleSubmit = async (event) => {
        event.preventDefault();
        const { stripe, elements, amount } = this.props;

        if (elements == null) {
            return;
        }

        const { error: submitError } = await elements.submit();
        if (submitError) {
            return;
        }

        const stripexx = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
        const checkoutSession =
            await stripexx.paymentIntents.create({
                currency: 'usd',
                amount: amount * 100
            });

        const { client_secret: clientSecret } = { client_secret: checkoutSession.client_secret }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: 'https://master-lake.vercel.app/paymentSuccess',
            },

        });

        if (error) {
            toast.error(error);
        }
    };

    render() {
        const { stripe, amount } = this.props;
        return (
            <form onSubmit={this.handleSubmit}>
                <PaymentElement />
                <button
                    disabled={!stripe}
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 disabled:opacity-50"
                >
                    Pay ${amount}
                </button>
            </form>
        );
    }
}
const InjectedCheckoutForm = ({ amount }) => (
    <ElementsConsumer>
        {({ stripe, elements }) => (
            <CheckoutForm stripe={stripe} elements={elements} amount={amount} />
        )}
    </ElementsConsumer>
);

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


export default function CheckoutPage({ amount, lessonPackageName }) {
    const options = {
        mode: 'payment',
        amount: amount,
        currency: 'usd',
        payment_method_types : ['card'],
        appearance: {},
    };

    return (
        <Elements stripe={stripePromise} options={options} >
            <InjectedCheckoutForm amount={amount} />
        </Elements>
    );
}
