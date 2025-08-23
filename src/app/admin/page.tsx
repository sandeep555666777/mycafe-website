'use client';

import { useState } from 'react';
import QRCode from 'react-qr-code';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Download, Printer, Copy, QrCode, Table, Users, Clock, Lock, Settings } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TableQR {
  id: string;
  tableNumber: number;
  qrCode: string;
  status: 'active' | 'inactive';
  lastOrder?: string;
  totalOrders: number;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [tables, setTables] = useState<TableQR[]>([
    {
      id: '1',
      tableNumber: 1,
      qrCode: `/order?table=1`,
      status: 'active',
      lastOrder: '2 hours ago',
      totalOrders: 15
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
      totalOrders: 12
    }
  ]);

  const [newTableNumber, setNewTableNumber] = useState('');

  const handleLogin = () => {
    // Simple password check - in production, use proper authentication
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
          <Button 
            variant="outline" 
            onClick={() => setIsAuthenticated(false)}
            className="mt-4"
          >
            Logout
          </Button>
        </div>

        <Tabs defaultValue="qr-generator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="qr-generator">QR Generator</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          </TabsList>

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

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Tables</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-amber-600">{tables.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Active Tables</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">
                    {tables.filter(t => t.status === 'active').length}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Total Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">
                    {tables.reduce((sum, table) => sum + table.totalOrders, 0)}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Table Management</CardTitle>
                <CardDescription>Overview of all tables and their status</CardDescription>
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
