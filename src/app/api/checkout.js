// /pages/api/checkout.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function POST(req, res) {
    if (req.method === 'POST') {
        try {
            const { amount, lessonPackageName } = req.body;

            // if (!amount || typeof amount !== 'number') {
            //     return res.status(400).json({ error: 'Invalid amount' });
            // }

            // if (!lessonPackageName || typeof lessonPackageName !== 'string') {
            //     return res.status(400).json({ error: 'Invalid lesson package name' });
            // }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: lessonPackageName,
                            },
                            unit_amount: amount,
                        },
                        quantity: 1, 
                    },
                ],
                mode: 'payment',
                amount: amount,
                currency: 'usd',
                success_url: 'http://localhost:3000/payment-success',
                cancel_url: 'http://localhost:3000/',
            });

            res.status(200).json({ id: session.id }); 
        } catch (error) {
            console.error('Error creating session:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
}
