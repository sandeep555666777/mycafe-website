'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WhatsAppOrder } from '@/components/whatsapp-order';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Clock, 
  MapPin, 
  Phone, 
  Star,
  Heart,
  Search,
  Filter,
  Coffee,
  Pizza,
  Dessert,
  GlassWater,
  Table,
  QrCode,
  CheckCircle
} from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  popular: boolean;
  spicy: boolean;
  vegetarian: boolean;
  rating: number;
  preparationTime: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  specialInstructions?: string;
}

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic tomato sauce with mozzarella cheese and fresh basil',
    price: 299,
    category: 'Pizza',
    image: '/images/margherita.jpg',
    popular: true,
    spicy: false,
    vegetarian: true,
    rating: 4.8,
    preparationTime: '15-20 min'
  },
  {
    id: '2',
    name: 'Pepperoni Pizza',
    description: 'Spicy pepperoni with melted cheese and tomato sauce',
    price: 349,
    category: 'Pizza',
    image: '/images/pepperoni.jpg',
    popular: true,
    spicy: true,
    vegetarian: false,
    rating: 4.7,
    preparationTime: '15-20 min'
  },
  {
    id: '3',
    name: 'Veggie Supreme',
    description: 'Fresh vegetables with mozzarella and tomato sauce',
    price: 329,
    category: 'Pizza',
    image: '/images/veggie.jpg',
    popular: false,
    spicy: false,
    vegetarian: true,
    rating: 4.6,
    preparationTime: '15-20 min'
  },
  {
    id: '4',
    name: 'Classic Waffle',
    description: 'Golden waffle served with maple syrup and butter',
    price: 199,
    category: 'Dessert',
    image: '/images/waffle-classic.jpg',
    popular: true,
    spicy: false,
    vegetarian: true,
    rating: 4.9,
    preparationTime: '10-15 min'
  },
  {
    id: '5',
    name: 'Chocolate Waffle',
    description: 'Chocolate waffle with chocolate chips and whipped cream',
    price: 249,
    category: 'Dessert',
    image: '/images/waffle-chocolate.jpg',
    popular: true,
    spicy: false,
    vegetarian: true,
    rating: 4.8,
    preparationTime: '10-15 min'
  },
  {
    id: '6',
    name: 'Berry Waffle',
    description: 'Waffle topped with fresh berries and cream',
    price: 279,
    category: 'Dessert',
    image: '/images/waffle-berry.jpg',
    popular: false,
    spicy: false,
    vegetarian: true,
    rating: 4.7,
    preparationTime: '10-15 min'
  },
  {
    id: '7',
    name: 'Cappuccino',
    description: 'Espresso with steamed milk and milk foam',
    price: 149,
    category: 'Drink',
    image: '/images/margherita.jpg', // Placeholder
    popular: true,
    spicy: false,
    vegetarian: true,
    rating: 4.6,
    preparationTime: '5-8 min'
  },
  {
    id: '8',
    name: 'Latte',
    description: 'Espresso with steamed milk and a small amount of milk foam',
    price: 159,
    category: 'Drink',
    image: '/images/pepperoni.jpg', // Placeholder
    popular: true,
    spicy: false,
    vegetarian: true,
    rating: 4.5,
    preparationTime: '5-8 min'
  }
];

const categories = [
  { name: 'All', icon: Coffee },
  { name: 'Pizza', icon: Pizza },
  { name: 'Dessert', icon: Dessert },
  { name: 'Drink', icon: GlassWater }
];

export default function OrderPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderPageContent />
    </Suspense>
  );
}

function OrderPageContent() {
  const searchParams = useSearchParams();
  const tableNumber = searchParams.get('table');
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCart, setShowCart] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const placeOrder = () => {
    if (cart.length === 0 || !customerName || !customerPhone) return;
    
    // Here you would typically send the order to your backend
    console.log('Order placed:', {
      tableNumber,
      customerName,
      customerPhone,
      items: cart,
      total: getTotalPrice(),
      timestamp: new Date().toISOString()
    });
    
    setOrderPlaced(true);
    setCart([]);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="text-green-600 mb-4">
              <CheckCircle className="w-16 h-16 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Order Placed Successfully!</h2>
            <p className="text-green-700 mb-4">Your order has been received and is being prepared.</p>
            <div className="bg-green-50 rounded-lg p-4 mb-4">
              <p className="text-sm text-green-700">
                <strong>Table {tableNumber}</strong><br />
                Estimated preparation time: 15-20 minutes
              </p>
            </div>
            <Button onClick={() => setOrderPlaced(false)} className="w-full">
              Place Another Order
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-amber-900">The Crafty Bean</h1>
              {tableNumber && (
                <p className="text-sm text-amber-700">Table {tableNumber}</p>
              )}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCart(!showCart)}
              className="relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cart.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Table Banner */}
      {tableNumber && (
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3">
          <div className="max-w-md mx-auto px-4">
            <div className="flex items-center justify-center gap-2">
              <Table className="w-5 h-5" />
              <span className="font-semibold">Table {tableNumber}</span>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <QrCode className="w-3 h-3 mr-1" />
                QR Connected
              </Badge>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-md mx-auto">
        {/* Search and Filters */}
        <div className="p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search menu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-4">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <TabsTrigger key={category.name} value={category.name} className="flex items-center gap-1">
                    <IconComponent className="w-4 h-4" />
                    <span className="hidden sm:inline">{category.name}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
        </div>

        {/* Menu Items */}
        <div className="px-4 pb-20">
          <div className="grid gap-4">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="flex">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          </div>
                      <div className="text-right ml-2">
                        <p className="font-semibold text-amber-600">₹{item.price}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-500">{item.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {item.popular && (
                          <Badge variant="secondary" className="text-xs">Popular</Badge>
                        )}
                        {item.spicy && (
                          <Badge variant="destructive" className="text-xs">Spicy</Badge>
                        )}
                        {item.vegetarian && (
                          <Badge variant="default" className="text-xs">Veg</Badge>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => addToCart(item)}
                        className="bg-amber-600 hover:bg-amber-700"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Cart Sidebar */}
        {showCart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Your Order</h2>
                  <Button variant="ghost" size="sm" onClick={() => setShowCart(false)}>
                    ×
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-600">₹{item.price}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t p-4 space-y-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>₹{getTotalPrice()}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="customerName">Your Name</Label>
                      <Input
                        id="customerName"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="customerPhone">Phone Number</Label>
                      <Input
                        id="customerPhone"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        type="tel"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={placeOrder}
                    disabled={!customerName || !customerPhone}
                    className="w-full bg-amber-600 hover:bg-amber-700"
                  >
                    Place Order - ₹{getTotalPrice()}
                  </Button>
                  
                  {/* WhatsApp Order Option */}
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-3 text-center">
                      Or order directly via WhatsApp
                    </p>
                    <WhatsAppOrder 
                      cart={cart.reduce((acc, item) => ({ ...acc, [item.name]: item.quantity }), {})}
                      menuItems={{
                        pizzas: menuItems.filter(item => item.category === 'Pizza'),
                        waffles: menuItems.filter(item => item.category === 'Dessert')
                      }}
                      customerInfo={{
                        name: customerName,
                        phone: customerPhone,
                        tableNumber: tableNumber || undefined
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
                 </div>
        )}
            </div>
    </div>
  );
}
