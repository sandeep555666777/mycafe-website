'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Smartphone, 
  Wifi, 
  Bluetooth, 
  Camera, 
  Scan, 
  Receipt, 
  CheckCircle, 
  XCircle,
  Loader2,
  QrCode,
  Smartphone as PhoneIcon,
  CreditCard as CardIcon,
  Wifi as WifiIcon
} from 'lucide-react';
import QRCode from 'react-qr-code';

interface ContactlessPaymentProps {
  amount: number;
  orderId: string;
  customerPhone: string;
  onPaymentComplete: (success: boolean, paymentData?: any) => void;
}

const paymentMethods = [
  {
    id: 'upi',
    name: 'UPI Payment',
    icon: PhoneIcon,
    description: 'Pay using UPI apps like Google Pay, PhonePe, Paytm',
    color: 'bg-blue-500',
    features: ['Instant transfer', 'No additional charges', 'Secure']
  },
  {
    id: 'card',
    name: 'Contactless Card',
    icon: CardIcon,
    description: 'Tap your card or use NFC payment',
    color: 'bg-green-500',
    features: ['Tap to pay', 'NFC enabled', 'Secure chip']
  },
  {
    id: 'qr',
    name: 'QR Code Payment',
    icon: QrCode,
    description: 'Scan QR code with your payment app',
    color: 'bg-purple-500',
    features: ['Scan and pay', 'Multiple apps', 'Instant']
  }
];

export function ContactlessPayment({ amount, orderId, customerPhone, onPaymentComplete }: ContactlessPaymentProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [qrCode, setQrCode] = useState('');

  const processPayment = async () => {
    if (!selectedMethod) return;
    
    setPaymentStatus('processing');
    
    try {
      const paymentData = {
        orderId,
        amount,
        method: selectedMethod,
        customerPhone,
        upiId: selectedMethod === 'upi' ? upiId : undefined,
        cardLast4: selectedMethod === 'card' ? cardNumber.slice(-4) : undefined
      };
      
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setPaymentStatus('success');
        onPaymentComplete(true, result.payment);
      } else {
        setPaymentStatus('failed');
        onPaymentComplete(false);
      }
    } catch (error) {
      setPaymentStatus('failed');
      onPaymentComplete(false);
    }
  };

  const generateQRCode = () => {
    const qrData = `upi://pay?pa=${upiId}&pn=MyCafe&am=${amount}&tn=Order ${orderId}`;
    setQrCode(qrData);
  };

  if (paymentStatus === 'success') {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-green-800 mb-2">Payment Successful!</h3>
          <p className="text-green-700 mb-4">Your payment of ₹{amount} has been processed successfully.</p>
          <div className="bg-white rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-600">Transaction ID: TXN{Date.now()}</p>
            <p className="text-sm text-gray-600">Order ID: {orderId}</p>
          </div>
          <Button onClick={() => window.location.reload()} className="w-full">
            Continue
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (paymentStatus === 'failed') {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="pt-6 text-center">
          <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-red-800 mb-2">Payment Failed</h3>
          <p className="text-red-700 mb-4">Please try again with a different payment method.</p>
          <Button onClick={() => setPaymentStatus('idle')} className="w-full">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wifi className="w-5 h-5" />
            Contactless Payment Methods
          </CardTitle>
          <CardDescription>Choose your preferred payment method</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {paymentMethods.map((method) => (
              <Card 
                key={method.id}
                className={`cursor-pointer transition-all ${
                  selectedMethod === method.id 
                    ? 'border-2 border-blue-500 bg-blue-50' 
                    : 'hover:border-gray-300'
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 ${method.color} rounded-full flex items-center justify-center`}>
                      <method.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{method.name}</h3>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    {method.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Details */}
      {selectedMethod && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>Complete your payment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Order Total:</span>
                <span className="text-xl font-bold text-green-600">₹{amount}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-muted-foreground">Order ID:</span>
                <span className="text-sm font-mono">{orderId}</span>
              </div>
            </div>

            {selectedMethod === 'upi' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    placeholder="Enter your UPI ID (e.g., john.doe@upi)"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </div>
                <Button onClick={generateQRCode} variant="outline" className="w-full">
                  <QrCode className="w-4 h-4 mr-2" />
                  Generate UPI QR Code
                </Button>
                {qrCode && (
                  <div className="text-center p-4 bg-white border rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Scan this QR code with your UPI app</p>
                    <div className="flex justify-center">
                      <QRCode value={qrCode} size={150} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input id="expiry" placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" maxLength={4} />
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    💳 Tap your card or use NFC for contactless payment
                  </p>
                </div>
              </div>
            )}

            {selectedMethod === 'qr' && (
              <div className="text-center space-y-4">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <QrCode className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                  <p className="text-purple-800 font-medium">QR Code Payment</p>
                  <p className="text-sm text-purple-600 mt-2">
                    Scan the QR code with your preferred payment app
                  </p>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <QRCode value={`upi://pay?pa=mycafe@upi&pn=MyCafe&am=${amount}&tn=Order ${orderId}`} size={200} />
                </div>
              </div>
            )}

            <Button 
              onClick={processPayment} 
              disabled={paymentStatus === 'processing'}
              className="w-full"
            >
              {paymentStatus === 'processing' ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <Wifi className="w-4 h-4 mr-2" />
                  Pay ₹{amount} Contactlessly
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
