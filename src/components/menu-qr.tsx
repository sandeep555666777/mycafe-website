'use client';

import QRCode from 'react-qr-code';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Printer, QrCode } from 'lucide-react';

export function MenuQR() {
  const menuUrl = `/menu`;

  const downloadQR = () => {
    const canvas = document.createElement('canvas');
    const svg = document.querySelector('#menu-qr svg') as SVGElement;
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        const link = document.createElement('a');
        link.download = 'mycafe-menu-qr.png';
        link.href = canvas.toDataURL();
        link.click();
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  const printQR = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>MyCafe Menu QR Code</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
              .qr-container { margin: 20px 0; }
              .cafe-info { margin: 10px 0; font-size: 18px; font-weight: bold; }
            </style>
          </head>
          <body>
            <h1>MyCafe</h1>
            <div class="cafe-info">Scan to View Menu</div>
            <div class="qr-container">
              ${document.querySelector('#menu-qr')?.outerHTML || ''}
            </div>
            <p>Scan this QR code to view our complete menu and place your order</p>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <QrCode className="w-6 h-6" />
          Scan Our Menu
        </CardTitle>
        <CardDescription>
          Scan this QR code to view our complete menu and place your order
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div id="menu-qr" className="flex justify-center p-4 bg-white rounded-lg">
          <QRCode
            value={menuUrl}
            size={200}
            level="H"
          />
        </div>
        
        <div className="text-center text-sm text-muted-foreground">
          MyCafe - Where Creativity Brews
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={downloadQR}
            className="flex-1"
          >
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
          <Button
            variant="outline"
            onClick={printQR}
            className="flex-1"
          >
            <Printer className="w-4 h-4 mr-1" />
            Print
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
