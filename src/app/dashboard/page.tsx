'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Users, 
  TrendingUp,
  Coffee,
  Pizza,
  Dessert,
  GlassWater,
  Search,
  Filter,
  Bell,
  Phone,
  MapPin
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Order {
  id: string;
  tableNumber: number;
  customerName: string;
  customerPhone: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  timestamp: string;
  estimatedTime: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    tableNumber: 1,
    customerName: 'John Doe',
    customerPhone: '+91 98765 43210',
    items: [
      { id: '1', name: 'Margherita Pizza', price: 299, quantity: 1 },
      { id: '4', name: 'Classic Waffle', price: 199, quantity: 2 }
    ],
    total: 697,
    status: 'pending',
    timestamp: '2024-01-15T14:30:00Z',
    estimatedTime: '15-20 min'
  },
  {
    id: '2',
    tableNumber: 2,
    customerName: 'Jane Smith',
    customerPhone: '+91 98765 43211',
    items: [
      { id: '2', name: 'Pepperoni Pizza', price: 349, quantity: 1 },
      { id: '7', name: 'Cappuccino', price: 149, quantity: 1 }
    ],
    total: 498,
    status: 'preparing',
    timestamp: '2024-01-15T14:25:00Z',
    estimatedTime: '10-15 min'
  },
  {
    id: '3',
    tableNumber: 4,
    customerName: 'Mike Johnson',
    customerPhone: '+91 98765 43212',
    items: [
      { id: '5', name: 'Chocolate Waffle', price: 249, quantity: 1 },
      { id: '8', name: 'Latte', price: 159, quantity: 2 }
    ],
    total: 567,
    status: 'ready',
    timestamp: '2024-01-15T14:20:00Z',
    estimatedTime: '5-8 min'
  }
];

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        // Transform the data to match our interface
        const transformedOrders = data.map((order: any) => ({
          id: order.id,
          tableNumber: order.table.tableNumber,
          customerName: order.customerName || 'Anonymous',
          customerPhone: order.customerPhone || 'N/A',
          items: order.items.map((item: any) => ({
            id: item.menuItem.id,
            name: item.menuItem.name,
            price: item.unitPrice,
            quantity: item.quantity,
          })),
          total: order.total,
          status: order.status.toLowerCase(),
          timestamp: order.createdAt,
          estimatedTime: order.estimatedTime || '15-20 min',
        }));
        setOrders(transformedOrders);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      toast({
        title: "Error",
        description: "Failed to load orders",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.tableNumber.toString().includes(searchTerm) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders(prev => prev.map(order => 
          order.id === orderId ? updatedOrder : order
        ));
        
        toast({
          title: "Order Updated",
          description: `Order status updated to ${newStatus}`,
        });
      } else {
        throw new Error('Failed to update order');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'preparing': return <AlertCircle className="w-4 h-4" />;
      case 'ready': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (itemName: string) => {
    if (itemName.toLowerCase().includes('pizza')) return <Pizza className="w-4 h-4" />;
    if (itemName.toLowerCase().includes('waffle')) return <Dessert className="w-4 h-4" />;
    if (itemName.toLowerCase().includes('cappuccino') || itemName.toLowerCase().includes('latte')) return <Coffee className="w-4 h-4" />;
    return <GlassWater className="w-4 h-4" />;
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    preparing: orders.filter(o => o.status === 'preparing').length,
    ready: orders.filter(o => o.status === 'ready').length,
    completed: orders.filter(o => o.status === 'completed').length,
    totalRevenue: orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.total, 0)
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-700">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-900 mb-2">Staff Dashboard</h1>
          <p className="text-amber-700">Manage orders and monitor cafe operations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Preparing</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.preparing}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ready</p>
                  <p className="text-2xl font-bold text-green-600">{stats.ready}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-gray-600">{stats.completed}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-gray-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold text-green-600">₹{stats.totalRevenue}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Management */}
        <Card>
          <CardHeader>
            <CardTitle>Order Management</CardTitle>
            <CardDescription>Monitor and update order status</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Label htmlFor="search">Search Orders</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="search"
                    placeholder="Search by customer, table, or item..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="status">Filter by Status</Label>
                <select
                  id="status"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="border-l-4 border-l-amber-500">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-4">
                            <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                            <Badge className={getStatusColor(order.status)}>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(order.status)}
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </div>
                            </Badge>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-lg">₹{order.total}</p>
                            <p className="text-sm text-muted-foreground">{order.estimatedTime}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Customer Details</p>
                            <p className="font-medium">{order.customerName}</p>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Phone className="w-3 h-3" />
                              {order.customerPhone}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Table & Time</p>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span className="font-medium">Table {order.tableNumber}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-muted-foreground mb-2">Order Items</p>
                          <div className="space-y-2">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                                <div className="flex items-center gap-2">
                                  {getCategoryIcon(item.name)}
                                  <span className="font-medium">{item.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm text-muted-foreground">x{item.quantity}</span>
                                  <span className="font-medium">₹{item.price * item.quantity}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 lg:w-48">
                        {order.status === 'pending' && (
                          <>
                            <Button 
                              onClick={() => updateOrderStatus(order.id, 'preparing')}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Start Preparing
                            </Button>
                            <Button 
                              variant="destructive"
                              onClick={() => updateOrderStatus(order.id, 'cancelled')}
                            >
                              Cancel Order
                            </Button>
                          </>
                        )}
                        
                        {order.status === 'preparing' && (
                          <>
                            <Button 
                              onClick={() => updateOrderStatus(order.id, 'ready')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Mark Ready
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => updateOrderStatus(order.id, 'pending')}
                            >
                              Back to Pending
                            </Button>
                          </>
                        )}
                        
                        {order.status === 'ready' && (
                          <>
                            <Button 
                              onClick={() => updateOrderStatus(order.id, 'completed')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Mark Delivered
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => updateOrderStatus(order.id, 'preparing')}
                            >
                              Back to Preparing
                            </Button>
                          </>
                        )}
                        
                        {order.status === 'completed' && (
                          <Button variant="outline" disabled>
                            Order Completed
                          </Button>
                        )}
                        
                        {order.status === 'cancelled' && (
                          <Button variant="outline" disabled>
                            Order Cancelled
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredOrders.length === 0 && (
                <div className="text-center py-8">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No orders found</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
