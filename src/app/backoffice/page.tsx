'use client';

import { useState, useEffect, useCallback } from 'react';
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
  RefreshCw,
  Wifi,
  WifiOff,
  Zap,
  Activity,
  BarChart3,
  Calendar,
  Timer,
  CreditCard,
  Smartphone,
  Wifi as WifiIcon,
  Bluetooth,
  Camera,
  Scan,
  Receipt,
  Package,
  Truck,
  CheckSquare,
  Square,
  Play,
  Pause,
  Square as SquareIcon
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RealTimeOrders } from '@/components/real-time-orders';

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
  const [isOnline, setIsOnline] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [notifications, setNotifications] = useState<string[]>([]);
  
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

  // Real-time updates and live functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      
      // Simulate new orders coming in
      const shouldAddNewOrder = Math.random() > 0.7; // 30% chance
      if (shouldAddNewOrder && orders.length < 10) {
        const newOrder: Order = {
          id: Date.now().toString(),
          tableNumber: Math.floor(Math.random() * 8) + 1,
          customerName: `Customer ${Math.floor(Math.random() * 100)}`,
          customerPhone: `+91 ${Math.floor(Math.random() * 9000000000) + 1000000000}`,
          items: [
            {
              id: '1',
              name: 'Margherita Pizza',
              price: 299,
              quantity: Math.floor(Math.random() * 2) + 1
            }
          ],
          total: 299,
          status: 'pending',
          timestamp: new Date().toISOString(),
          estimatedTime: '15-20 min',
          paymentStatus: 'pending'
        };
        
        setOrders(prev => [newOrder, ...prev]);
        setNotifications(prev => [`New order received from Table ${newOrder.tableNumber}`, ...prev.slice(0, 4)]);
      }
      
      // Update order statuses randomly
      setOrders(prev => prev.map(order => {
        if (order.status === 'pending' && Math.random() > 0.8) {
          return { ...order, status: 'preparing' };
        } else if (order.status === 'preparing' && Math.random() > 0.7) {
          return { ...order, status: 'ready' };
        } else if (order.status === 'ready' && Math.random() > 0.6) {
          return { ...order, status: 'completed' };
        }
        return order;
      }));
      
    }, 5000); // Update every 5 seconds for real-time feel

    return () => clearInterval(interval);
  }, [orders.length]);

  // Simulate network status
  useEffect(() => {
    const networkInterval = setInterval(() => {
      setIsOnline(Math.random() > 0.1); // 90% uptime
    }, 10000);
    
    return () => clearInterval(networkInterval);
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
        qrCode: `${window.location.origin}/order?table=${newTableNumber}`,
        status: 'active',
        totalOrders: 0
      };
      setTables([...tables, newTable]);
      setNewTableNumber('');
      setNotifications(prev => [`New table ${newTableNumber} added successfully`, ...prev.slice(0, 4)]);
    }
  };

  const deleteTable = (tableId: string) => {
    setTables(prev => prev.filter(table => table.id !== tableId));
    setNotifications(prev => ['Table deleted successfully', ...prev.slice(0, 4)]);
  };

  const generateBulkQR = () => {
    const newTables: TableQR[] = [];
    const startTable = tables.length + 1;
    for (let i = 0; i < 5; i++) {
      const tableNumber = startTable + i;
      newTables.push({
        id: Date.now().toString() + i,
        tableNumber,
        qrCode: `${window.location.origin}/order?table=${tableNumber}`,
        status: 'active' as const,
        totalOrders: 0
      });
    }
    setTables(prev => [...prev, ...newTables]);
    setNotifications(prev => ['5 new tables added with QR codes', ...prev.slice(0, 4)]);
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
        {/* Header with Live Status */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Settings className="w-8 h-8 text-amber-600" />
            <h1 className="text-4xl font-bold text-amber-900">Admin Panel</h1>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
              <span className="text-sm text-muted-foreground">
                {isOnline ? 'Live' : 'Offline'}
              </span>
            </div>
          </div>
          <p className="text-amber-700 text-lg">Manage your cafe operations</p>
          
          {/* Live Status Bar */}
          <div className="flex items-center justify-center gap-6 mt-4 p-3 bg-white/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-green-500" />
              <span className="text-sm">Last Update: {lastUpdate.toLocaleTimeString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-500" />
              <span className="text-sm">{notifications.length} notifications</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm">Real-time updates</span>
            </div>
          </div>

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
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="qr-generator">QR Generator</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Notifications Panel */}
            {notifications.length > 0 && (
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-blue-500" />
                    Live Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {notifications.map((notification, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-blue-800">{notification}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

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
            <RealTimeOrders onOrderUpdate={(orderId, status) => {
              console.log(`Order ${orderId} updated to ${status}`);
            }} />
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
            {/* Enhanced Table Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Table className="w-5 h-5" />
                  Table Management
                </CardTitle>
                <CardDescription>Create and manage QR codes for tables</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="tableNumber">Single Table</Label>
                    <Input
                      id="tableNumber"
                      type="number"
                      placeholder="Enter table number"
                      value={newTableNumber}
                      onChange={(e) => setNewTableNumber(e.target.value)}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button onClick={addTable} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Single Table
                    </Button>
                  </div>
                  <div className="flex items-end">
                    <Button onClick={generateBulkQR} variant="outline" className="w-full">
                      <QrCode className="w-4 h-4 mr-2" />
                      Generate 5 Tables
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-amber-50 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Quick Setup:</strong> Use "Generate 5 Tables" to quickly create QR codes for multiple tables. 
                    Each QR code will be unique and link directly to your menu ordering system.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced QR Codes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tables.map((table) => (
                <Card key={table.id} className="relative group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <QrCode className="w-5 h-5" />
                        Table {table.tableNumber}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant={table.status === 'active' ? 'default' : 'secondary'}>
                          {table.status === 'active' ? <Wifi className="w-3 h-3 mr-1" /> : <WifiOff className="w-3 h-3 mr-1" />}
                          {table.status}
                        </Badge>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteTable(table.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    <CardDescription>
                      <div className="flex items-center justify-between">
                        <span>Orders: {table.totalOrders}</span>
                        {table.lastOrder && <span>Last: {table.lastOrder}</span>}
                      </div>
                      {table.currentOrder && (
                        <div className="mt-2 p-2 bg-green-50 rounded text-xs">
                          <span className="font-medium text-green-800">Active Order</span>
                          <div className="text-green-700">{table.currentOrder.customerName}</div>
                        </div>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div id={`qr-${table.id}`} className="flex justify-center p-4 bg-white rounded-lg border-2 border-dashed border-gray-200 hover:border-amber-300 transition-colors">
                      <QRCode
                        value={table.qrCode}
                        size={150}
                        level="H"
                        bgColor="#ffffff"
                        fgColor="#000000"
                      />
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-900">
                        Table {table.tableNumber}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Scan to order • Contactless dining
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => downloadQR(table)}
                        className="w-full"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => printQR(table)}
                        className="w-full"
                      >
                        <Printer className="w-4 h-4 mr-1" />
                        Print
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyQRUrl(table)}
                        className="w-full"
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy URL
                      </Button>
                      <Button
                        variant={table.status === 'active' ? 'destructive' : 'default'}
                        size="sm"
                        onClick={() => toggleTableStatus(table.id)}
                        className="w-full"
                      >
                        {table.status === 'active' ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Analytics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Daily Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">₹{stats.totalRevenue}</div>
                  <p className="text-sm text-muted-foreground">Today's total revenue</p>
                  <div className="mt-2 flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">+12% from yesterday</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Customer Traffic
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">{stats.totalOrders}</div>
                  <p className="text-sm text-muted-foreground">Orders today</p>
                  <div className="mt-2 flex items-center gap-1 text-blue-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">+8% from yesterday</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Timer className="w-5 h-5" />
                    Average Order Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">18 min</div>
                  <p className="text-sm text-muted-foreground">Preparation time</p>
                  <div className="mt-2 flex items-center gap-1 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">-2 min from last week</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Popular Items */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Menu Items</CardTitle>
                <CardDescription>Most ordered items today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center">
                        <span className="text-amber-800 font-bold">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Margherita Pizza</p>
                        <p className="text-sm text-muted-foreground">15 orders today</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹4,485</p>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-800 font-bold">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Classic Waffle</p>
                        <p className="text-sm text-muted-foreground">12 orders today</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹2,388</p>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-gray-800 font-bold">3</span>
                      </div>
                      <div>
                        <p className="font-medium">Cappuccino</p>
                        <p className="text-sm text-muted-foreground">10 orders today</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹1,490</p>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Table Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Table Performance</CardTitle>
                <CardDescription>Order volume by table</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {tables.slice(0, 4).map((table) => (
                    <div key={table.id} className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-amber-600">Table {table.tableNumber}</div>
                      <div className="text-sm text-muted-foreground">{table.totalOrders} orders</div>
                      <div className={`mt-2 text-xs px-2 py-1 rounded-full ${
                        table.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {table.status}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
