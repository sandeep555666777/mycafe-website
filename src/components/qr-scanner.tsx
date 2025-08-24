'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QrCode, Camera, X, CheckCircle, AlertCircle, Table } from 'lucide-react';
import { useRouter } from 'next/navigation';
import jsQR from 'jsqr';

interface QRScannerProps {
  onScan?: (tableNumber: string) => void;
  onClose?: () => void;
}

export function QRScanner({ onScan, onClose }: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if browser supports camera access
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setIsSupported(true);
    }
  }, []);

  const startScanning = async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
        
        // Start scanning for QR codes
        scanQRCode();
      }
    } catch (err) {
      setError('Camera access denied. Please allow camera permissions.');
      console.error('Camera error:', err);
    }
  };

  const stopScanning = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  const scanQRCode = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    const scanFrame = () => {
      if (video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        
        if (code) {
          // QR code detected!
          handleScannedData(code.data);
          return;
        }
        
        // Continue scanning if no QR code found
        setTimeout(() => {
          if (isScanning) {
            scanFrame();
          }
        }, 100);
      }
    };

    video.addEventListener('loadeddata', () => {
      scanFrame();
    });
  };

  const handleManualEntry = () => {
    const tableNumber = prompt('Enter table number:');
    if (tableNumber) {
      handleScannedData(`/order?table=${tableNumber}`);
    }
  };

  const handleScannedData = (data: string) => {
    setScannedData(data);
    stopScanning();
    
    // Extract table number from QR data
    const tableMatch = data.match(/table=(\d+)/);
    if (tableMatch) {
      const tableNumber = tableMatch[1];
      if (onScan) {
        onScan(tableNumber);
      } else {
        // Navigate to order page with table number
        router.push(`/order?table=${tableNumber}`);
      }
    } else {
      setError('Invalid QR code format');
    }
  };

  const resetScanner = () => {
    setScannedData(null);
    setError(null);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          Table QR Scanner
        </CardTitle>
        <CardDescription>
          Scan the QR code on your table to view the menu and place orders
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!isScanning && !scannedData && !error && (
          <div className="text-center space-y-4">
            <div className="w-32 h-32 mx-auto bg-muted rounded-lg flex items-center justify-center">
              <QrCode className="h-16 w-16 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Point your camera at the QR code on your table
            </p>
            <div className="flex gap-2">
              <Button onClick={startScanning} className="flex-1">
                <Camera className="h-4 w-4 mr-2" />
                Start Scanning
              </Button>
              <Button variant="outline" onClick={handleManualEntry}>
                <Table className="h-4 w-4 mr-2" />
                Manual Entry
              </Button>
            </div>
          </div>
        )}

        {isScanning && (
          <div className="space-y-4">
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 bg-black rounded-lg"
              />
              <div className="absolute inset-0 border-2 border-primary border-dashed rounded-lg m-4 pointer-events-none">
                <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-primary"></div>
                <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-primary"></div>
                <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-primary"></div>
                <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-primary"></div>
              </div>
            </div>
            <canvas ref={canvasRef} className="hidden" />
            <Button onClick={stopScanning} variant="outline" className="w-full">
              <X className="h-4 w-4 mr-2" />
              Stop Scanning
            </Button>
          </div>
        )}

        {scannedData && (
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <div>
              <h3 className="font-semibold">QR Code Scanned!</h3>
              <p className="text-sm text-muted-foreground">{scannedData}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={resetScanner} variant="outline" className="flex-1">
                Scan Again
              </Button>
              <Button onClick={() => router.push(scannedData)} className="flex-1">
                Continue to Menu
              </Button>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center space-y-4">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto" />
            <div>
              <h3 className="font-semibold text-red-600">Scan Error</h3>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
            <div className="flex gap-2">
              <Button onClick={resetScanner} variant="outline" className="flex-1">
                Try Again
              </Button>
              <Button onClick={handleManualEntry} className="flex-1">
                Manual Entry
              </Button>
            </div>
          </div>
        )}

        {!isSupported && (
          <div className="text-center space-y-4">
            <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto" />
            <div>
              <h3 className="font-semibold">Camera Not Supported</h3>
              <p className="text-sm text-muted-foreground">
                Your browser doesn't support camera access. Please use manual entry.
              </p>
            </div>
            <Button onClick={handleManualEntry} className="w-full">
              <Table className="h-4 w-4 mr-2" />
              Enter Table Number
            </Button>
          </div>
        )}

        {onClose && (
          <Button onClick={onClose} variant="ghost" className="w-full">
            Close
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
