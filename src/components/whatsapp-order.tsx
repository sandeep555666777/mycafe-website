'use client';

import { useState } from 'react';
import { cafeAddress } from '@/lib/config';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, ShoppingCart, Phone, Clock, MapPin } from 'lucide-react';

interface CartItem {
  name: string;
  price: string;
  quantity: number;
}

interface WhatsAppOrderProps {
  cart: { [key: string]: number };
  menuItems: {
    pizzas: Array<{ name: string; price: string; description: string }>;
    waffles: Array<{ name: string; price: string; description: string }>;
  };
  customerInfo?: {
    name?: string;
    phone?: string;
    tableNumber?: string;
    address?: string;
  };
}

export function WhatsAppOrder({ cart, menuItems, customerInfo }: WhatsAppOrderProps) {
  const [isOrdering, setIsOrdering] = useState(false);
  const [customerName, setCustomerName] = useState(customerInfo?.name || '');
  const [customerPhone, setCustomerPhone] = useState(customerInfo?.phone || '');
  const [customerAddress, setCustomerAddress] = useState(customerInfo?.address || '');

  const allItems = [...menuItems.pizzas, ...menuItems.waffles];
  
  const cartItems: CartItem[] = Object.entries(cart)
    .filter(([_, quantity]) => quantity > 0)
    .map(([itemName, quantity]) => {
      const item = allItems.find(item => item.name === itemName);
      return {
        name: itemName,
        price: item?.price || '₹0',
        quantity
      };
    });

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace('₹', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const formatWhatsAppMessage = () => {
    const cafeName = "The Crafty Bean";
    const phoneNumber = "+91 87701 49314"; // Your cafe's WhatsApp number
    
    let message = `🍽️ *${cafeName} - New Order*\n\n`;
    
    if (customerName) {
      message += `👤 *Customer:* ${customerName}\n`;
    }
    if (customerPhone) {
      message += `📱 *Phone:* ${customerPhone}\n`;
    }
    if (customerAddress) {
      message += `📍 *Delivery Address:* ${customerAddress}\n`;
    } else if (customerInfo?.tableNumber) {
      message += `🪑 *Table:* ${customerInfo.tableNumber}\n`;
    }
    
    message += `\n📋 *Order Details:*\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Price: ${item.price} x ${item.quantity} = ₹${parseInt(item.price.replace('₹', '')) * item.quantity}\n\n`;
    });
    
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `💰 *Total Amount: ₹${calculateTotal()}*\n\n`;
    message += `📍 *Address:* ${cafeAddress}\n`;
    message += `⏰ *Order Time:* ${new Date().toLocaleString('en-IN')}\n\n`;
    message += `Please confirm this order and provide estimated delivery time. Thank you! 🙏`;
    
    return encodeURIComponent(message);
  };

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) {
      alert('Please add items to your cart first!');
      return;
    }

    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      alert('Please fill in all required fields: Name, Phone, and Delivery Address');
      return;
    }

    setIsOrdering(true);
    
    const message = formatWhatsAppMessage();
    const whatsappUrl = `https://wa.me/918770149314?text=${message}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Reset after a short delay
    setTimeout(() => {
      setIsOrdering(false);
    }, 2000);
  };

  const handleCallOrder = () => {
    window.location.href = 'tel:+918770149314';
  };

  if (cartItems.length === 0) {
    return (
      <Card className="text-center p-6">
        <CardContent>
          <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Your Cart is Empty</h3>
          <p className="text-muted-foreground mb-4">
            Add some delicious items to your cart to place an order!
          </p>
          <Button asChild>
            <a href="/menu">Browse Menu</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-green-600" />
          WhatsApp Order
        </CardTitle>
        <CardDescription>
          Order directly through WhatsApp for quick service
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Summary */}
        <div className="space-y-3">
          <h4 className="font-semibold">Order Summary:</h4>
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded">
              <div>
                <span className="font-medium">{item.name}</span>
                <span className="text-sm text-muted-foreground ml-2">x{item.quantity}</span>
              </div>
              <span className="font-semibold">
                ₹{parseInt(item.price.replace('₹', '')) * item.quantity}
              </span>
            </div>
          ))}
          <div className="border-t pt-2 flex justify-between items-center font-bold">
            <span>Total:</span>
            <span className="text-primary">₹{calculateTotal()}</span>
          </div>
        </div>

        {/* Customer Info */}
        <div className="space-y-4">
          <h4 className="font-semibold">Customer Information:</h4>
          
          {/* Input Fields */}
          <div className="space-y-3">
            <div>
              <label className="text-sm text-muted-foreground">Name *</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Phone *</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Delivery Address *</label>
              <textarea
                placeholder="Enter your full delivery address with landmarks"
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 mt-1 resize-none"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button 
            onClick={handleWhatsAppOrder}
            disabled={isOrdering}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            {isOrdering ? 'Opening WhatsApp...' : 'Order via WhatsApp'}
          </Button>
          
          <Button 
            onClick={handleCallOrder}
            variant="outline"
            className="flex-1"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call to Order
          </Button>
        </div>

        {/* Additional Info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>Average delivery time: 15-20 minutes</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            <span>Free delivery for orders above ₹500</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
