'use client';

import { useState } from 'react';
import { QRScanner } from '@/components/qr-scanner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { QrCode, Smartphone, Table, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ScannerPage() {
  const [scannedTable, setScannedTable] = useState<string | null>(null);

  const handleScan = (tableNumber: string) => {
    setScannedTable(tableNumber);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center gap-3 mb-4">
            <QrCode className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Table QR Scanner</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Scan the QR code on your table to access our digital menu and place orders instantly
          </p>
        </div>

        {/* Main Scanner */}
        <div className="max-w-md mx-auto mb-8">
          <QRScanner onScan={handleScan} />
        </div>

        {/* Instructions */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <QrCode className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">1. Find Your QR Code</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>
                  Look for the QR code sticker on your table. It's usually placed on the table surface or table number stand.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">2. Scan with Camera</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>
                  Point your phone's camera at the QR code. Make sure it's well-lit and clearly visible.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Table className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">3. Order & Enjoy</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription>
                  Browse our menu, customize your order, and place it directly from your table. No waiting required!
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Manual Entry Option */}
        <div className="max-w-md mx-auto mt-8">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Can't Scan?</CardTitle>
              <CardDescription>
                No worries! You can manually enter your table number
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  const tableNumber = prompt('Enter your table number:');
                  if (tableNumber) {
                    window.location.href = `/order?table=${tableNumber}`;
                  }
                }}
              >
                <Table className="h-4 w-4 mr-2" />
                Enter Table Number
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Success Message */}
        {scannedTable && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-md w-full">
              <CardHeader className="text-center">
                <CardTitle className="text-green-600">Success!</CardTitle>
                <CardDescription>
                  You're now connected to Table {scannedTable}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Redirecting you to our digital menu...
                </p>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setScannedTable(null)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => window.location.href = `/order?table=${scannedTable}`}
                    className="flex-1"
                  >
                    Continue to Menu
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>Having trouble? Ask our staff for assistance</p>
          <p className="mt-2">
            <Link href="/contact" className="text-primary hover:underline">
              Contact Us
            </Link>
            {' • '}
            <Link href="/menu" className="text-primary hover:underline">
              View Menu
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
