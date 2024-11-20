// /pages/api/checkout.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { amount } = req.body;

            if (!amount || typeof amount !== 'number') {
                return res.status(400).json({ error: 'Invalid amount' });
            }

            const session = await stripe.checkout.sessions.create({
                mode: 'payment',
                amount: amount * 100,
                currency: 'usd',
                success_url: 'http://localhost:3000/payment-success',
                cancel_url: 'http://localhost:3000/',
            });

            res.status(200).json({ clientSecret: session.client_secret });
        } catch (error) {
            console.error('Error creating session:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
