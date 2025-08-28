import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generateQRCode, generateTableURL } from '@/lib/qr-generator';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const tables = await prisma.table.findMany({
      orderBy: { tableNumber: 'asc' },
      select: {
        id: true,
        tableNumber: true,
        qrCode: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(tables);
  } catch (error) {
    console.error('Error fetching tables:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { tableNumber } = await request.json();

    if (!tableNumber || tableNumber < 1) {
      return NextResponse.json(
        { error: 'Valid table number is required' },
        { status: 400 }
      );
    }

    // Check if table number already exists
    const existingTable = await prisma.table.findUnique({
      where: { tableNumber },
    });

    if (existingTable) {
      return NextResponse.json(
        { error: 'Table number already exists' },
        { status: 400 }
      );
    }

    // Create table
    const table = await prisma.table.create({
      data: {
        tableNumber,
        qrCode: '', // Will be generated below
      },
    });

    // Generate QR code
    const tableURL = generateTableURL(table.id);
    const qrCodeDataURL = await generateQRCode({
      tableId: table.id,
      tableNumber: table.tableNumber,
      url: tableURL,
    });

    // Update table with QR code
    const updatedTable = await prisma.table.update({
      where: { id: table.id },
      data: { qrCode: qrCodeDataURL },
      select: {
        id: true,
        tableNumber: true,
        qrCode: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(updatedTable);
  } catch (error) {
    console.error('Error creating table:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
