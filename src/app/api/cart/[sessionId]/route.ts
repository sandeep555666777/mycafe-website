import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const session = await prisma.tableSession.findUnique({
      where: { sessionId: params.sessionId },
      select: {
        cart: true,
      },
    });

    if (!session) {
      return NextResponse.json({ items: [] });
    }

    return NextResponse.json({ items: session.cart });
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  try {
    const { items, tableId } = await request.json();

    // Upsert session (create or update)
    await prisma.tableSession.upsert({
      where: { sessionId: params.sessionId },
      update: {
        cart: items,
        updatedAt: new Date(),
      },
      create: {
        sessionId: params.sessionId,
        tableId,
        cart: items,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving cart:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
