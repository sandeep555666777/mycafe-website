import QRCode from 'qrcode';

export interface QRCodeData {
  tableId: string;
  tableNumber: number;
  url: string;
}

export async function generateQRCode(data: QRCodeData): Promise<string> {
  try {
    const qrData = JSON.stringify({
      tableId: data.tableId,
      tableNumber: data.tableNumber,
      url: data.url,
      timestamp: new Date().toISOString(),
    });

    const qrCodeDataURL = await QRCode.toDataURL(qrCodeData, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });

    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

export async function generateQRCodePNG(data: QRCodeData): Promise<Buffer> {
  try {
    const qrData = JSON.stringify({
      tableId: data.tableId,
      tableNumber: data.tableNumber,
      url: data.url,
      timestamp: new Date().toISOString(),
    });

    const qrCodeBuffer = await QRCode.toBuffer(qrCodeData, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      quality: 0.92,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });

    return qrCodeBuffer;
  } catch (error) {
    console.error('Error generating QR code PNG:', error);
    throw new Error('Failed to generate QR code PNG');
  }
}

export function generateTableURL(tableId: string, baseURL: string = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'): string {
  return `${baseURL}/t/${tableId}`;
}
