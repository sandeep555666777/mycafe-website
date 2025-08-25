'use client';

import QRCode from 'react-qr-code';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Printer, QrCode, Smartphone, ExternalLink, Share2, Copy, Check, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cafeAddress } from '@/lib/config';
import Link from 'next/link';

export function MenuQR() {
  const [copied, setCopied] = useState(false);
  const [showCopied, setShowCopied] = useState(false);
  const [menuUrl, setMenuUrl] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  
  useEffect(() => {
    // Set URLs only on client side
    setMenuUrl(`${window.location.origin}/menu`);
    setWhatsappUrl(`https://wa.me/918770149314?text=${encodeURIComponent(
      `🍽️ *The Crafty Bean - Menu Access*\n\n` +
      `Hi! I'd like to view your menu and place an order.\n\n` +
      `📍 *Address:* ${cafeAddress}\n` +
      `⏰ *Time:* ${new Date().toLocaleString('en-IN')}\n\n` +
      `Please share your menu and help me place an order. Thank you! 🙏`
    )}`);
  }, []);

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
        link.download = 'crafty-bean-menu-qr.png';
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
            <title>The Crafty Bean - Menu QR Code</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                text-align: center; 
                padding: 20px; 
                background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
              }
              .header { 
                margin-bottom: 20px; 
                color: #92400e;
              }
              .qr-container { 
                margin: 20px 0; 
                padding: 20px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .cafe-info { 
                margin: 15px 0; 
                font-size: 18px; 
                font-weight: bold; 
                color: #92400e;
              }
              .instructions {
                margin: 20px 0;
                color: #6b7280;
                line-height: 1.6;
              }
              .contact-info {
                margin-top: 20px;
                padding: 15px;
                background: #fef3c7;
                border-radius: 8px;
                color: #92400e;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>☕ The Crafty Bean</h1>
              <p>Artistic Café in Siddharth Nagar</p>
            </div>
            <div class="cafe-info">Scan to View Complete Menu</div>
            <div class="qr-container">
              ${document.querySelector('#menu-qr')?.outerHTML || ''}
            </div>
            <div class="instructions">
              <p><strong>How to use:</strong></p>
              <p>1. Open your phone's camera app</p>
              <p>2. Point it at this QR code</p>
              <p>3. Tap the notification to open our menu</p>
              <p>4. Browse and place your order!</p>
            </div>
            <div class="contact-info">
              <p><strong>📍 Address:</strong> ${cafeAddress}</p>
              <p><strong>📱 WhatsApp:</strong> +91 8770149314</p>
              <p><strong>⏰ Hours:</strong> Open Daily 8AM-8PM</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const copyMenuUrl = async () => {
    try {
      await navigator.clipboard.writeText(menuUrl);
      setCopied(true);
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'The Crafty Bean Menu',
          text: 'Scan this QR code to view our complete menu and place your order!',
          url: menuUrl,
        });
      } catch (err) {
        console.error('Error sharing: ', err);
      }
    } else {
      copyMenuUrl();
    }
  };

  // Don't render until URLs are set (client-side only)
  if (!menuUrl) {
    return (
      <Card className="max-w-md mx-auto bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-primary/20">
        <CardContent className="p-8 text-center">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-gray-300 rounded-2xl mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-primary/20">
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-3">
          <QrCode className="w-8 h-8 text-primary-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold text-foreground">
          Quick Menu Access
        </CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Scan this QR code to instantly view our complete menu and place your order
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* QR Code Display */}
        <div className="text-center">
          <div id="menu-qr" className="inline-block p-6 bg-white rounded-2xl shadow-lg border-2 border-primary/10">
            <QRCode
              value={menuUrl}
              size={180}
              level="H"
              bgColor="#ffffff"
              fgColor="#000000"
            />
          </div>
          
          {/* Branding below QR */}
          <div className="mt-3 text-center">
            <div className="text-lg font-bold text-primary">The Crafty Bean</div>
            <div className="text-sm text-muted-foreground">Where Creativity Brews</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/menu" className="flex items-center justify-center gap-2">
              <ExternalLink className="w-4 h-4" />
              View Menu Online
            </Link>
          </Button>
          
          <Button 
            onClick={() => window.open(whatsappUrl, '_blank')}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Order via WhatsApp
          </Button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={downloadQR}
            className="flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download QR
          </Button>
          
          <Button
            variant="outline"
            onClick={printQR}
            className="flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print QR
          </Button>
        </div>

        {/* Additional Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={shareQR}
            className="flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          
          <Button
            variant="outline"
            onClick={copyMenuUrl}
            className="flex items-center justify-center gap-2"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Link'}
          </Button>
        </div>

        {/* Instructions */}
        <div className="bg-white/60 rounded-lg p-4 border border-primary/10">
          <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-primary" />
            How to Use
          </h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>1. Open your phone's camera app</p>
            <p>2. Point it at this QR code</p>
            <p>3. Tap the notification to open our menu</p>
            <p>4. Browse and place your order!</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>📍 Gobrahwa Bazar Road, Siddharth Nagar, UP</p>
          <p>📱 +91 8770149314 | ⏰ Open Daily 8AM-8PM</p>
        </div>
      </CardContent>
    </Card>
  );
}
