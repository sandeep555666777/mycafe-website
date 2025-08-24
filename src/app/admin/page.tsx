'use client';

import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Printer, 
  Copy, 
  QrCode, 
  Table, 
  Users, 
  Clock, 
  Lock, 
  Settings,
  DollarSign,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Bell,
  Phone,
  MapPin,
  Eye,
  Edit,
  Trash2,
  Plus,
  RefreshCw
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TableQR {
  id: string;
  tableNumber: number;
  qrCode: string;
  status: 'active' | 'inactive';
  lastOrder?: string;
  totalOrders: number;
  currentOrder?: Order;
}

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
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod?: 'cash' | 'card' | 'upi' | 'online';
}

interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: 'cash' | 'card' | 'upi' | 'online';
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
  transactionId?: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [tables, setTables] = useState<TableQR[]>([
    {
      id: '1',
      tableNumber: 1,
      qrCode: `/order?table=1`,
      status: 'active',
      lastOrder: '2 hours ago',
      totalOrders: 15,
      currentOrder: {
        id: '1',
        tableNumber: 1,
        customerName: 'John Doe',
        customerPhone: '+91 98765 43210',
        items: [
          { id: '1', name: 'Margherita Pizza', price: 299, quantity: 1 },
          { id: '4', name: 'Classic Waffle', price: 199, quantity: 2 }
        ],
        total: 697,
        status: 'preparing',
        timestamp: '2024-01-15T14:30:00Z',
        estimatedTime: '15-20 min',
        paymentStatus: 'paid',
        paymentMethod: 'card'
      }
    },
    {
      id: '2',
      tableNumber: 2,
      qrCode: `/order?table=2`,
      status: 'active',
      lastOrder: '1 hour ago',
      totalOrders: 8
    },
    {
      id: '3',
      tableNumber: 3,
      qrCode: `/order?table=3`,
      status: 'inactive',
      totalOrders: 0
    },
    {
      id: '4',
      tableNumber: 4,
      qrCode: `/order?table=4`,
      status: 'active',
      lastOrder: '30 minutes ago',
      totalOrders: 12,
      currentOrder: {
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
        estimatedTime: '5-8 min',
        paymentStatus: 'paid',
        paymentMethod: 'upi'
      }
    }
  ]);

  const [orders, setOrders] = useState<Order[]>([
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
      status: 'preparing',
      timestamp: '2024-01-15T14:30:00Z',
      estimatedTime: '15-20 min',
      paymentStatus: 'paid',
      paymentMethod: 'card'
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
      status: 'pending',
      timestamp: '2024-01-15T14:25:00Z',
      estimatedTime: '10-15 min',
      paymentStatus: 'pending'
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
      estimatedTime: '5-8 min',
      paymentStatus: 'paid',
      paymentMethod: 'upi'
    }
  ]);

  const [payments, setPayments] = useState<Payment[]>([
    {
      id: '1',
      orderId: '1',
      amount: 697,
      method: 'card',
      status: 'completed',
      timestamp: '2024-01-15T14:30:00Z',
      transactionId: 'TXN123456'
    },
    {
      id: '2',
      orderId: '3',
      amount: 567,
      method: 'upi',
      status: 'completed',
      timestamp: '2024-01-15T14:20:00Z',
      transactionId: 'TXN123457'
    }
  ]);

  const [newTableNumber, setNewTableNumber] = useState('');

  // Auto-refresh orders every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new orders coming in
      console.log('Refreshing orders...');
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    // Change 'admin123' to your desired password
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const addTable = () => {
    if (newTableNumber && !tables.find(t => t.tableNumber === parseInt(newTableNumber))) {
      const newTable: TableQR = {
        id: Date.now().toString(),
        tableNumber: parseInt(newTableNumber),
        qrCode: `/order?table=${newTableNumber}`,
        status: 'active',
        totalOrders: 0
      };
      setTables([...tables, newTable]);
      setNewTableNumber('');
    }
  };

  const toggleTableStatus = (id: string) => {
    setTables(tables.map(table => 
      table.id === id 
        ? { ...table, status: table.status === 'active' ? 'inactive' : 'active' }
        : table
    ));
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    
    // Update table current order if exists
    setTables(prev => prev.map(table => 
      table.currentOrder?.id === orderId 
        ? { ...table, currentOrder: { ...table.currentOrder, status: newStatus } }
        : table
    ));
  };

  const updatePaymentStatus = (orderId: string, paymentStatus: Order['paymentStatus'], method?: Order['paymentMethod']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, paymentStatus, paymentMethod: method }
        : order
    ));
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

  const getPaymentStatusColor = (status: Order['paymentStatus']) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
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

  const downloadQR = (table: TableQR) => {
    const canvas = document.createElement('canvas');
    const svg = document.querySelector(`#qr-${table.id} svg`) as SVGElement;
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);
        const link = document.createElement('a');
        link.download = `table-${table.tableNumber}-qr.png`;
        link.href = canvas.toDataURL();
        link.click();
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  const copyQRUrl = (table: TableQR) => {
    navigator.clipboard.writeText(table.qrCode);
  };

  const printQR = (table: TableQR) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Table ${table.tableNumber} QR Code</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
              .qr-container { margin: 20px 0; }
              .table-info { margin: 10px 0; font-size: 18px; font-weight: bold; }
            </style>
          </head>
          <body>
            <h1>MyCafe - Table ${table.tableNumber}</h1>
            <div class="table-info">Scan to Order</div>
            <div class="qr-container">
              ${document.querySelector(`#qr-${table.id}`)?.outerHTML || ''}
            </div>
            <p>Scan this QR code to view our menu and place your order</p>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.tableNumber.toString().includes(searchTerm) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalTables: tables.length,
    activeTables: tables.filter(t => t.status === 'active').length,
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    preparingOrders: orders.filter(o => o.status === 'preparing').length,
    readyOrders: orders.filter(o => o.status === 'ready').length,
    completedOrders: orders.filter(o => o.status === 'completed').length,
    totalRevenue: orders.filter(o => o.paymentStatus === 'paid').reduce((sum, o) => sum + o.total, 0),
    pendingPayments: orders.filter(o => o.paymentStatus === 'pending').length
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>Enter password to access admin panel</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Settings className="w-8 h-8 text-amber-600" />
            <h1 className="text-4xl font-bold text-amber-900">Admin Panel</h1>
          </div>
          <p className="text-amber-700 text-lg">Manage your cafe operations</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Button 
              variant="outline" 
              onClick={() => setIsAuthenticated(false)}
            >
              Logout
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/dashboard'}
            >
              Staff Dashboard
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="qr-generator">QR Generator</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Tables</p>
                      <p className="text-2xl font-bold">{stats.totalTables}</p>
                    </div>
                    <Table className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Tables</p>
                      <p className="text-2xl font-bold text-green-600">{stats.activeTables}</p>
                    </div>
                    <Users className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Orders</p>
                      <p className="text-2xl font-bold">{stats.totalOrders}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-500" />
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
                    <DollarSign className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Live Table Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Table className="w-5 h-5" />
                  Live Table Status
                </CardTitle>
                <CardDescription>Real-time status of all tables</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tables.map((table) => (
                    <div key={table.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Table {table.tableNumber}</h3>
                        <Badge variant={table.status === 'active' ? 'default' : 'secondary'}>
                          {table.status}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {table.totalOrders} orders
                        </div>
                        {table.lastOrder && (
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Last: {table.lastOrder}
                          </div>
                        )}
                        {table.currentOrder && (
                          <div className="mt-2 p-2 bg-amber-50 rounded">
                            <p className="text-xs font-medium text-amber-800">Current Order</p>
                            <p className="text-xs text-amber-700">{table.currentOrder.customerName}</p>
                            <Badge className={`text-xs ${getStatusColor(table.currentOrder.status)}`}>
                              {table.currentOrder.status}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest orders and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          Table {order.tableNumber} • {order.customerName}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{order.total}</p>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            {/* Order Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>Monitor and manage all orders</CardDescription>
              </CardHeader>
              <CardContent>
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
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
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
                                <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                                  {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
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
                                    <span className="font-medium">{item.name}</span>
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

                            {/* Payment Actions */}
                            {order.paymentStatus === 'pending' && (
                              <div className="border-t pt-2 mt-2">
                                <p className="text-xs text-muted-foreground mb-2">Payment Actions</p>
                                <div className="flex gap-1">
                                  <Button
                                    size="sm"
                                    onClick={() => updatePaymentStatus(order.id, 'paid', 'cash')}
                                    className="flex-1 text-xs"
                                  >
                                    Cash
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => updatePaymentStatus(order.id, 'paid', 'card')}
                                    className="flex-1 text-xs"
                                  >
                                    Card
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() => updatePaymentStatus(order.id, 'paid', 'upi')}
                                    className="flex-1 text-xs"
                                  >
                                    UPI
                                  </Button>
                                </div>
                              </div>
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
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Management</CardTitle>
                <CardDescription>Track all payments and transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Total Revenue</p>
                          <p className="text-2xl font-bold text-green-600">₹{stats.totalRevenue}</p>
                        </div>
                        <DollarSign className="w-8 h-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Pending Payments</p>
                          <p className="text-2xl font-bold text-yellow-600">{stats.pendingPayments}</p>
                        </div>
                        <Clock className="w-8 h-8 text-yellow-500" />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Completed Orders</p>
                          <p className="text-2xl font-bold text-blue-600">{stats.completedOrders}</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  {payments.map((payment) => (
                    <Card key={payment.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Payment #{payment.id}</p>
                            <p className="text-sm text-muted-foreground">
                              Order #{payment.orderId} • {payment.method.toUpperCase()}
                            </p>
                            {payment.transactionId && (
                              <p className="text-xs text-muted-foreground">
                                TXN: {payment.transactionId}
                              </p>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">₹{payment.amount}</p>
                            <Badge className={payment.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                              {payment.status}
                            </Badge>
                            <p className="text-xs text-muted-foreground">
                              {new Date(payment.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="qr-generator" className="space-y-6">
            {/* Add New Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Table className="w-5 h-5" />
                  Add New Table
                </CardTitle>
                <CardDescription>Create a new QR code for a table</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="tableNumber">Table Number</Label>
                    <Input
                      id="tableNumber"
                      type="number"
                      placeholder="Enter table number"
                      value={newTableNumber}
                      onChange={(e) => setNewTableNumber(e.target.value)}
                    />
                  </div>
                  <Button onClick={addTable} className="mt-6">
                    Add Table
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* QR Codes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tables.map((table) => (
                <Card key={table.id} className="relative">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <QrCode className="w-5 h-5" />
                        Table {table.tableNumber}
                      </CardTitle>
                      <Badge variant={table.status === 'active' ? 'default' : 'secondary'}>
                        {table.status}
                      </Badge>
                    </div>
                    <CardDescription>
                      Total Orders: {table.totalOrders}
                      {table.lastOrder && ` • Last: ${table.lastOrder}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div id={`qr-${table.id}`} className="flex justify-center p-4 bg-white rounded-lg">
                      <QRCode
                        value={table.qrCode}
                        size={150}
                        level="H"
                      />
                    </div>
                    
                    <div className="text-center text-sm text-muted-foreground">
                      Scan to order from Table {table.tableNumber}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadQR(table)}
                        className="flex-1"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => printQR(table)}
                        className="flex-1"
                      >
                        <Printer className="w-4 h-4 mr-1" />
                        Print
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyQRUrl(table)}
                        className="flex-1"
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy URL
                      </Button>
                    </div>

                    <Button
                      variant={table.status === 'active' ? 'destructive' : 'default'}
                      size="sm"
                      onClick={() => toggleTableStatus(table.id)}
                      className="w-full"
                    >
                      {table.status === 'active' ? 'Deactivate' : 'Activate'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
