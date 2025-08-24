import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for demo purposes
let payments: any[] = [
  {
    id: '1',
    orderId: '1',
    amount: 697,
    method: 'upi',
    status: 'completed',
    timestamp: '2024-01-15T14:30:00Z',
    transactionId: 'TXN123456',
    customerPhone: '+91 98765 43210',
    upiId: 'john.doe@upi'
  },
  {
    id: '2',
    orderId: '3',
    amount: 567,
    method: 'card',
    status: 'completed',
    timestamp: '2024-01-15T14:20:00Z',
    transactionId: 'TXN123457',
    customerPhone: '+91 98765 43212',
    cardLast4: '1234'
  }
];

export async function GET() {
  return NextResponse.json({ payments });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, amount, method, customerPhone, upiId, cardLast4 } = body;
    
    // Simulate payment processing
    const isSuccess = Math.random() > 0.1; // 90% success rate
    
    const newPayment = {
      id: Date.now().toString(),
      orderId,
      amount,
      method,
      status: isSuccess ? 'completed' : 'failed',
      timestamp: new Date().toISOString(),
      transactionId: `TXN${Date.now()}`,
      customerPhone,
      upiId: method === 'upi' ? upiId : undefined,
      cardLast4: method === 'card' ? cardLast4 : undefined
    };
    
    payments.unshift(newPayment);
    
    return NextResponse.json({ 
      success: isSuccess, 
      payment: newPayment,
      message: isSuccess ? 'Payment processed successfully' : 'Payment failed'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to process payment' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { paymentId, status } = body;
    
    const paymentIndex = payments.findIndex(payment => payment.id === paymentId);
    if (paymentIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Payment not found' },
        { status: 404 }
      );
    }
    
    payments[paymentIndex] = { ...payments[paymentIndex], status };
    
    return NextResponse.json({ 
      success: true, 
      payment: payments[paymentIndex],
      message: 'Payment updated successfully' 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to update payment' },
      { status: 500 }
    );
  }
}
