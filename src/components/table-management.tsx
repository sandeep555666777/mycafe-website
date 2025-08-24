'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  Users, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  X, 
  Plus, 
  Edit, 
  Trash2,
  QrCode,
  Download,
  Printer,
  Eye,
  MessageSquare
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface TableOrder {
  id: string;
  tableNumber: number;
  items: Array<{
    name: string;
    quantity: number;
    price: string;
    status: 'pending' | 'preparing' | 'ready' | 'served';
  }>;
  totalAmount: string;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  customerName?: string;
  customerPhone?: string;
  specialInstructions?: string;
}

interface TableStatus {
  id: string;
  tableNumber: number;
  status: 'available' | 'occupied' | 'reserved' | 'cleaning';
  currentOrder?: TableOrder;
  capacity: number;
  location: string;
  lastActivity: Date;
  qrCodeUrl: string;
}

export function TableManagement() {
  const [tables, setTables] = useState<TableStatus[]>([
    {
      id: '1',
      tableNumber: 1,
      status: 'occupied',
      capacity: 4,
      location: 'Window Side',
      lastActivity: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      qrCodeUrl: '/order?table=1',
      currentOrder: {
        id: 'order-1',
        tableNumber: 1,
        items: [
          { name: 'Cappuccino', quantity: 2, price: '₹120', status: 'served' },
          { name: 'Classic Waffle', quantity: 1, price: '₹180', status: 'ready' }
        ],
        totalAmount: '₹420',
        status: 'active',
        createdAt: new Date(Date.now() - 45 * 60 * 1000),
        updatedAt: new Date(Date.now() - 30 * 60 * 1000),
        customerName: 'John Doe',
        customerPhone: '+91 98765 43210'
      }
    },
    {
      id: '2',
      tableNumber: 2,
      status: 'available',
      capacity: 6,
      location: 'Garden View',
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      qrCodeUrl: '/order?table=2'
    },
    {
      id: '3',
      tableNumber: 3,
      status: 'occupied',
      capacity: 2,
      location: 'Corner',
      lastActivity: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      qrCodeUrl: '/order?table=3',
      currentOrder: {
        id: 'order-2',
        tableNumber: 3,
        items: [
          { name: 'Margherita Pizza', quantity: 1, price: '₹350', status: 'preparing' },
          { name: 'Cold Coffee', quantity: 2, price: '₹140', status: 'pending' }
        ],
        totalAmount: '₹630',
        status: 'active',
        createdAt: new Date(Date.now() - 20 * 60 * 1000),
        updatedAt: new Date(Date.now() - 15 * 60 * 1000),
        specialInstructions: 'Extra cheese on pizza'
      }
    },
    {
      id: '4',
      tableNumber: 4,
      status: 'cleaning',
      capacity: 4,
      location: 'Center',
      lastActivity: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      qrCodeUrl: '/order?table=4'
    }
  ]);

  const [selectedTable, setSelectedTable] = useState<TableStatus | null>(null);
  const [showAddTable, setShowAddTable] = useState(false);
  const [newTable, setNewTable] = useState({
    tableNumber: '',
    capacity: 4,
    location: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'occupied': return 'bg-red-100 text-red-800';
      case 'reserved': return 'bg-yellow-100 text-yellow-800';
      case 'cleaning': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'served': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const addTable = () => {
    if (newTable.tableNumber && newTable.location) {
      const table: TableStatus = {
        id: Date.now().toString(),
        tableNumber: parseInt(newTable.tableNumber),
        status: 'available',
        capacity: newTable.capacity,
        location: newTable.location,
        lastActivity: new Date(),
        qrCodeUrl: `/order?table=${newTable.tableNumber}`
      };
      setTables([...tables, table]);
      setNewTable({ tableNumber: '', capacity: 4, location: '' });
      setShowAddTable(false);
    }
  };

  const updateTableStatus = (tableId: string, status: TableStatus['status']) => {
    setTables(tables.map(table => 
      table.id === tableId 
        ? { ...table, status, lastActivity: new Date() }
        : table
    ));
  };

  const updateOrderStatus = (tableId: string, itemIndex: number, status: TableOrder['items'][0]['status']) => {
    setTables(tables.map(table => {
      if (table.id === tableId && table.currentOrder) {
        const updatedOrder = {
          ...table.currentOrder,
          items: table.currentOrder.items.map((item, index) => 
            index === itemIndex ? { ...item, status } : item
          ),
          updatedAt: new Date()
        };
        return { ...table, currentOrder: updatedOrder };
      }
      return table;
    }));
  };

  const completeOrder = (tableId: string) => {
    setTables(tables.map(table => {
      if (table.id === tableId && table.currentOrder) {
        return {
          ...table,
          status: 'available' as const,
          currentOrder: undefined,
          lastActivity: new Date()
        };
      }
      return table;
    }));
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const activeOrders = tables.filter(table => table.currentOrder);
  const availableTables = tables.filter(table => table.status === 'available');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Table Management</h1>
          <p className="text-muted-foreground">Monitor tables and manage orders in real-time</p>
        </div>
        <Dialog open={showAddTable} onOpenChange={setShowAddTable}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Table
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Table</DialogTitle>
              <DialogDescription>
                Add a new table to your cafe's management system
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="tableNumber">Table Number</Label>
                <Input
                  id="tableNumber"
                  type="number"
                  value={newTable.tableNumber}
                  onChange={(e) => setNewTable({ ...newTable, tableNumber: e.target.value })}
                  placeholder="Enter table number"
                />
              </div>
              <div>
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={newTable.capacity}
                  onChange={(e) => setNewTable({ ...newTable, capacity: parseInt(e.target.value) })}
                  placeholder="Number of seats"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newTable.location}
                  onChange={(e) => setNewTable({ ...newTable, location: e.target.value })}
                  placeholder="e.g., Window Side, Garden View"
                />
              </div>
              <Button onClick={addTable} className="w-full">
                Add Table
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Table className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Total Tables</p>
                <p className="text-2xl font-bold">{tables.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Active Orders</p>
                <p className="text-2xl font-bold">{activeOrders.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Available</p>
                <p className="text-2xl font-bold">{availableTables.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Avg Wait Time</p>
                <p className="text-2xl font-bold">12m</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="active-orders">Active Orders</TabsTrigger>
          <TabsTrigger value="tables">All Tables</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tables.map((table) => (
              <Card key={table.id} className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedTable(table)}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Table {table.tableNumber}</CardTitle>
                      <CardDescription>{table.location}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(table.status)}>
                      {table.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Capacity:</span>
                    <span className="font-medium">{table.capacity} seats</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last Activity:</span>
                    <span className="font-medium">{getTimeAgo(table.lastActivity)}</span>
                  </div>
                  {table.currentOrder && (
                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Order Total:</span>
                        <span className="font-medium">{table.currentOrder.totalAmount}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Items:</span>
                        <span className="font-medium">{table.currentOrder.items.length}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active-orders" className="space-y-4">
          {activeOrders.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Active Orders</h3>
                <p className="text-muted-foreground">All tables are currently available</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {activeOrders.map((table) => (
                <Card key={table.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Table {table.tableNumber} - {table.location}</CardTitle>
                        <CardDescription>
                          Order placed {getTimeAgo(table.currentOrder!.createdAt)}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => completeOrder(table.id)}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Complete
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {table.currentOrder!.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity} × {item.price}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getOrderStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                            <select
                              value={item.status}
                              onChange={(e) => updateOrderStatus(table.id, index, e.target.value as any)}
                              className="text-xs border rounded px-2 py-1"
                            >
                              <option value="pending">Pending</option>
                              <option value="preparing">Preparing</option>
                              <option value="ready">Ready</option>
                              <option value="served">Served</option>
                            </select>
                          </div>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-3 border-t">
                        <span className="font-semibold">Total: {table.currentOrder!.totalAmount}</span>
                        {table.currentOrder!.customerName && (
                          <span className="text-sm text-muted-foreground">
                            Customer: {table.currentOrder!.customerName}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="tables" className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">Table</th>
                  <th className="text-left p-3">Location</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Capacity</th>
                  <th className="text-left p-3">Last Activity</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tables.map((table) => (
                  <tr key={table.id} className="border-b hover:bg-muted/50">
                    <td className="p-3 font-medium">Table {table.tableNumber}</td>
                    <td className="p-3">{table.location}</td>
                    <td className="p-3">
                      <Badge className={getStatusColor(table.status)}>
                        {table.status}
                      </Badge>
                    </td>
                    <td className="p-3">{table.capacity} seats</td>
                    <td className="p-3">{getTimeAgo(table.lastActivity)}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <QrCode className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>

      {/* Table Detail Modal */}
      {selectedTable && (
        <Dialog open={!!selectedTable} onOpenChange={() => setSelectedTable(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Table {selectedTable.tableNumber} Details</DialogTitle>
              <DialogDescription>
                {selectedTable.location} • {selectedTable.capacity} seats
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Badge className={getStatusColor(selectedTable.status)}>
                  {selectedTable.status}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Last activity: {getTimeAgo(selectedTable.lastActivity)}
                </span>
              </div>
              
              {selectedTable.currentOrder ? (
                <div className="space-y-3">
                  <h4 className="font-semibold">Current Order</h4>
                  {selectedTable.currentOrder.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} × {item.price}
                        </p>
                      </div>
                      <Badge className={getOrderStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-3 border-t">
                    <span className="font-semibold">Total: {selectedTable.currentOrder.totalAmount}</span>
                    <Button onClick={() => completeOrder(selectedTable.id)}>
                      Complete Order
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Table className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No active order</p>
                </div>
              )}
              
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download QR
                </Button>
                <Button variant="outline" className="flex-1">
                  <Printer className="h-4 w-4 mr-2" />
                  Print QR
                </Button>
                <Button variant="outline" className="flex-1">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
