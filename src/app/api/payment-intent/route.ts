import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// import api from '@/lib/pegaso';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-08-16',
  typescript: true,
});

export async function POST(_request: NextRequest) {
  // const data = await request.json();
  // const res = await api.post(`/create-payment-intent`, data);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
    currency: 'usd',
  });

  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  });
}
