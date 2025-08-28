import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { prisma } from '@/lib/db';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export async function POST(request: NextRequest) {
  try {
    const { orderId, amount } = await request.json();

    const options = {
      amount: amount, // amount in smallest currency unit
      currency: "INR",
      receipt: orderId,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Update the order with the razorpayOrderId
    await prisma.order.update({
      where: { id: orderId },
      data: { paymentGateway: 'RAZORPAY', gatewayId: razorpayOrder.id },
    });

    return NextResponse.json({ paymentUrl: `https://checkout.razorpay.com/v1/checkout.js?key_id=${razorpay.key_id}&order_id=${razorpayOrder.id}` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create Razorpay order' }, { status: 500 });
  }
}
