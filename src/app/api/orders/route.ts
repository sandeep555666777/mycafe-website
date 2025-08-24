import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for demo purposes
// In production, use a database like PostgreSQL, MongoDB, or Firebase
let orders: any[] = [
  {
    id: '1',
    tableNumber: 1,
    customerName: 'John Doe',
    customerPhone: '+91 98765 43210',
    items: [
      { id: '1', name: 'Margherita Pizza', price: 299, quantity: 1 },
      { id: '4', name: 'Classic Waffle', price: 199, quantity: 2 }
    ],
    total: 697,
    status: 'preparing',
    timestamp: '2024-01-15T14:30:00Z',
    estimatedTime: '15-20 min',
    paymentStatus: 'paid',
    paymentMethod: 'card'
  }
];

export async function GET() {
  return NextResponse.json({ orders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newOrder = {
      id: Date.now().toString(),
      ...body,
      timestamp: new Date().toISOString(),
      status: 'pending',
      paymentStatus: 'pending'
    };
    
    orders.unshift(newOrder);
    
    return NextResponse.json({ 
      success: true, 
      order: newOrder,
      message: 'Order created successfully' 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, status, paymentStatus } = body;
    
    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }
    
    orders[orderIndex] = { ...orders[orderIndex], ...body };
    
    return NextResponse.json({ 
      success: true, 
      order: orders[orderIndex],
      message: 'Order updated successfully' 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to update order' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('id');
    
    if (!orderId) {
      return NextResponse.json(
        { success: false, message: 'Order ID is required' },
        { status: 400 }
      );
    }
    
    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }
    
    orders.splice(orderIndex, 1);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Order deleted successfully' 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete order' },
      { status: 500 }
    );
  }
}
