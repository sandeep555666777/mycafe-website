import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { prisma } from '@/lib/db';

// Initialize Razorpay lazily inside the request handler to avoid build-time errors
function createRazorpayClient() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return null;
  }
  return { client: new Razorpay({ key_id: keyId, key_secret: keySecret }), keyId } as const;
}

export async function POST(request: NextRequest) {
  try {
    const { orderId, amount } = await request.json();

    const razorpayBundle = createRazorpayClient();
    if (!razorpayBundle) {
      console.error('Razorpay environment variables are not configured');
      return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 500 });
    }
    const { client: razorpay, keyId } = razorpayBundle;

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

    return NextResponse.json({ paymentUrl: `https://checkout.razorpay.com/v1/checkout.js?key_id=${keyId}&order_id=${razorpayOrder.id}` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create Razorpay order' }, { status: 500 });
  }
}
