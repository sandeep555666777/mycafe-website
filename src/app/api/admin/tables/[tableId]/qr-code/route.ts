import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generateQRCodePNG, generateTableURL } from '@/lib/qr-generator';

// Ensure this API runs on the Node.js runtime and is not prerendered at build time
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { tableId: string } }
) {
  try {
    const table = await prisma.table.findUnique({
      where: { id: params.tableId },
      select: {
        id: true,
        tableNumber: true,
      },
    });

    if (!table) {
      return NextResponse.json(
        { error: 'Table not found' },
        { status: 404 }
      );
    }

    const tableURL = generateTableURL(table.id);
    const qrCodeBuffer = await generateQRCodePNG({
      tableId: table.id,
      tableNumber: table.tableNumber,
      url: tableURL,
    });

    return new NextResponse(qrCodeBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="table-${table.tableNumber}-qr.png"`,
      },
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
