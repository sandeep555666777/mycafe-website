'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
  CheckCircle,
  AlertCircle,
  Coffee,
  Pizza,
  Dessert,
  GlassWater,
  Utensils,
  Receipt,
  CreditCard,
  Phone
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: {
    name: string;
  };
  isAvailable: boolean;
  isVegetarian: boolean;
  isSpicy: boolean;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
}

interface TableInfo {
  id: string;
  tableNumber: number;
  qrCode: string;
}

export default function TablePage() {
  const params = useParams();
  const router = useRouter();
  const tableId = params.tableId as string;
  
  const [tableInfo, setTableInfo] = useState<TableInfo | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [sessionId, setSessionId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState<'idle' | 'ordering' | 'ordered'>('idle');
  const [currentOrder, setCurrentOrder] = useState<any>(null);

  // Load table info and menu on mount
  useEffect(() => {
    loadTableData();
    loadMenu();
    initializeSession();
  }, [tableId]);

  const loadTableData = async () => {
    try {
      const response = await fetch(`/api/tables/${tableId}`);
      if (response.ok) {
        const data = await response.json();
        setTableInfo(data);
      }
    } catch (error) {
      console.error('Error loading table data:', error);
    }
  };

  const loadMenu = async () => {
    try {
      const response = await fetch('/api/menu');
      if (response.ok) {
        const data = await response.json();
        setMenuItems(data.menuItems);
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Error loading menu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const initializeSession = () => {
    const existingSessionId = localStorage.getItem(`table-session-${tableId}`);
    if (existingSessionId) {
      setSessionId(existingSessionId);
      loadCart(existingSessionId);
    } else {
      const newSessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      setSessionId(newSessionId);
      localStorage.setItem(`table-session-${tableId}`, newSessionId);
    }
  };

  const loadCart = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/cart/${sessionId}`);
      if (response.ok) {
        const data = await response.json();
        setCart(data.items || []);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const addToCart = async (item: MenuItem) => {
    if (!item.isAvailable) {
      toast({
        title: "Item Unavailable",
        description: "This item is currently not available.",
        variant: "destructive",
      });
      return;
    }

    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      const updatedCart = cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      const newItem: CartItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      };
      setCart([...cart, newItem]);
    }

    // Save cart to server
    await saveCart();
    
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const removeFromCart = async (itemId: string) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
    await saveCart();
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const updatedCart = cart.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );
    setCart(updatedCart);
    await saveCart();
  };

  const saveCart = async () => {
    try {
      await fetch(`/api/cart/${sessionId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, tableId }),
      });
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const placeOrder = async (customerName: string, customerPhone: string) => {
    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive",
      });
      return;
    }

    setOrderStatus('ordering');

    try {
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tableId,
          sessionId,
          customerName,
          customerPhone,
          items: cart,
          total: getCartTotal(),
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await orderResponse.json();

      // Create Razorpay order
      const razorpayResponse = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: orderData.id,
          amount: getCartTotal() * 100, // Amount in paise
        }),
      });

      if (!razorpayResponse.ok) {
        throw new Error('Failed to create Razorpay order');
      }

      const razorpayData = await razorpayResponse.json();

      // Redirect to Razorpay payment page
      router.push(razorpayData.paymentUrl);

    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Order Failed",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setOrderStatus('idle');
    }
  };

  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes('pizza')) return <Pizza className="w-4 h-4" />;
    if (name.includes('coffee') || name.includes('tea')) return <Coffee className="w-4 h-4" />;
    if (name.includes('waffle') || name.includes('dessert')) return <Dessert className="w-4 h-4" />;
    if (name.includes('burger') || name.includes('sandwich')) return <Utensils className="w-4 h-4" />;
    return <GlassWater className="w-4 h-4" />;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-700">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (orderStatus === 'ordered' && currentOrder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4">
        <div className="max-w-md mx-auto">
          <Card className="text-center">
            <CardHeader>
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-2xl text-green-700">Order Confirmed!</CardTitle>
              <CardDescription>
                Your order has been placed successfully
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-lg font-semibold">Order #{currentOrder.orderNumber}</p>
                <p className="text-sm text-green-600">Estimated time: 15-20 minutes</p>
              </div>
              
              <div className="text-left space-y-2">
                <h3 className="font-semibold">Order Summary:</h3>
                {currentOrder.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>₹{currentOrder.total}</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => window.location.reload()}
                className="w-full"
              >
                Order Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-amber-900">
                {tableInfo ? `Table ${tableInfo.tableNumber}` : 'Loading...'}
              </h1>
              <p className="text-amber-700">Scan & Order</p>
            </div>
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-amber-600" />
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4">
        <Tabs defaultValue="menu" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="cart">
              Cart ({cart.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="space-y-6">
            {categories.map((category) => {
              const categoryItems = menuItems.filter(item => item.category.name === category.name);
              if (categoryItems.length === 0) return null;

              return (
                <Card key={category.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {getCategoryIcon(category.name)}
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {categoryItems.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                          <div className="aspect-video bg-gray-100 relative">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Utensils className="w-12 h-12" />
                              </div>
                            )}
                            {!item.isAvailable && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <Badge variant="destructive">Unavailable</Badge>
                              </div>
                            )}
                          </div>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-lg">{item.name}</h3>
                              <div className="flex gap-1">
                                {item.isVegetarian && (
                                  <Badge variant="outline" className="text-green-600">Veg</Badge>
                                )}
                                {item.isSpicy && (
                                  <Badge variant="outline" className="text-red-600">Spicy</Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-lg font-bold text-amber-600">₹{item.price}</span>
                              <Button
                                onClick={() => addToCart(item)}
                                disabled={!item.isAvailable}
                                size="sm"
                                className="bg-amber-600 hover:bg-amber-700"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="cart" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Your Cart
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                    <p className="text-sm text-gray-400">Add some delicious items from our menu!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-gray-600">₹{item.price} each</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total:</span>
                        <span>₹{getCartTotal()}</span>
                      </div>
                    </div>

                    <OrderForm onPlaceOrder={placeOrder} isLoading={orderStatus === 'ordering'} />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function OrderForm({ onPlaceOrder, isLoading }: { onPlaceOrder: (name: string, phone: string) => void; isLoading: boolean }) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide your name and phone number.",
        variant: "destructive",
      });
      return;
    }
    onPlaceOrder(customerName.trim(), customerPhone.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Your Name</Label>
        <Input
          id="name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Enter your name"
          required
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          placeholder="Enter your phone number"
          required
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-amber-600 hover:bg-amber-700"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Placing Order...
          </>
        ) : (
          <>
            <Receipt className="w-4 h-4 mr-2" />
            Place Order
          </>
        )}
      </Button>
    </form>
  );
}
