import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for demo purposes
let tables: any[] = [
  {
    id: '1',
    tableNumber: 1,
    qrCode: '/order?table=1',
    status: 'active',
    lastOrder: '2 hours ago',
    totalOrders: 15,
    currentOrder: null
  },
  {
    id: '2',
    tableNumber: 2,
    qrCode: '/order?table=2',
    status: 'active',
    lastOrder: '1 hour ago',
    totalOrders: 8,
    currentOrder: null
  },
  {
    id: '3',
    tableNumber: 3,
    qrCode: '/order?table=3',
    status: 'inactive',
    totalOrders: 0,
    currentOrder: null
  },
  {
    id: '4',
    tableNumber: 4,
    qrCode: '/order?table=4',
    status: 'active',
    lastOrder: '30 minutes ago',
    totalOrders: 12,
    currentOrder: null
  }
];

export async function GET() {
  return NextResponse.json({ tables });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tableNumber } = body;
    
    // Check if table number already exists
    const existingTable = tables.find(table => table.tableNumber === tableNumber);
    if (existingTable) {
      return NextResponse.json(
        { success: false, message: 'Table number already exists' },
        { status: 400 }
      );
    }
    
    const newTable = {
      id: Date.now().toString(),
      tableNumber,
      qrCode: `/order?table=${tableNumber}`,
      status: 'active',
      totalOrders: 0,
      currentOrder: null
    };
    
    tables.push(newTable);
    
    return NextResponse.json({ 
      success: true, 
      table: newTable,
      message: 'Table created successfully' 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to create table' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { tableId, status, currentOrder } = body;
    
    const tableIndex = tables.findIndex(table => table.id === tableId);
    if (tableIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Table not found' },
        { status: 404 }
      );
    }
    
    tables[tableIndex] = { ...tables[tableIndex], ...body };
    
    return NextResponse.json({ 
      success: true, 
      table: tables[tableIndex],
      message: 'Table updated successfully' 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to update table' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tableId = searchParams.get('id');
    
    if (!tableId) {
      return NextResponse.json(
        { success: false, message: 'Table ID is required' },
        { status: 400 }
      );
    }
    
    const tableIndex = tables.findIndex(table => table.id === tableId);
    if (tableIndex === -1) {
      return NextResponse.json(
        { success: false, message: 'Table not found' },
        { status: 404 }
      );
    }
    
    tables.splice(tableIndex, 1);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Table deleted successfully' 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete table' },
      { status: 500 }
    );
  }
}
