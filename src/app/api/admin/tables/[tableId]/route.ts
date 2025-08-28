import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { tableId: string } }
) {
  try {
    const { isActive, tableNumber } = await request.json();

    const updateData: any = {};
    if (typeof isActive === 'boolean') updateData.isActive = isActive;
    if (tableNumber) updateData.tableNumber = tableNumber;

    const table = await prisma.table.update({
      where: { id: params.tableId },
      data: updateData,
      select: {
        id: true,
        tableNumber: true,
        qrCode: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(table);
  } catch (error) {
    console.error('Error updating table:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { tableId: string } }
) {
  try {
    // Check if table has any orders
    const orders = await prisma.order.findMany({
      where: { tableId: params.tableId },
      take: 1,
    });

    if (orders.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete table with existing orders' },
        { status: 400 }
      );
    }

    // Delete table sessions
    await prisma.tableSession.deleteMany({
      where: { tableId: params.tableId },
    });

    // Delete table
    await prisma.table.delete({
      where: { id: params.tableId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting table:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
