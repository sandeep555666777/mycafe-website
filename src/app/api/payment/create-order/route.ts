import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function createRazorpayClient() {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return null;
  return { client: new Razorpay({ key_id: keyId, key_secret: keySecret }), keyId } as const;
}

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();
    if (!orderId) return NextResponse.json({ error: 'orderId required' }, { status: 400 });

    const orderRef = doc(db, 'orders', orderId);
    const snap = await getDoc(orderRef);
    if (!snap.exists()) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    const data = snap.data() as any;
    const amountPaise = Math.round((data.totalAmount || 0) * 100);
    if (!amountPaise || amountPaise <= 0) return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });

    const bundle = createRazorpayClient();
    if (!bundle) return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 500 });
    const { client, keyId } = bundle;

    const rpOrder = await client.orders.create({ amount: amountPaise, currency: 'INR', receipt: orderId });
    await updateDoc(orderRef, { paymentGateway: 'RAZORPAY', gatewayId: rpOrder.id });
    return NextResponse.json({ razorpayOrderId: rpOrder.id, key: keyId });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to create payment order' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { orderId } = await request.json();
    if (!orderId) return NextResponse.json({ error: 'orderId required' }, { status: 400 });
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, { status: 'paid' });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}


