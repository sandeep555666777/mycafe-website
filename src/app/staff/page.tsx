'use client';

import { useState } from 'react';
import { TableManagement } from '@/components/table-management';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  QrCode,
  Settings,
  Bell,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';

export default function StaffDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for dashboard
  const stats = {
    totalOrders: 24,
    pendingOrders: 8,
    completedOrders: 16,
    averageWaitTime: '12 minutes',
    revenue: '₹12,450',
    tablesOccupied: 6,
    tablesAvailable: 4
  };

  const recentOrders = [
    {
      id: '1',
      table: 3,
      items: ['Cappuccino', 'Classic Waffle'],
      total: '₹300',
      status: 'preparing',
      time: '2 minutes ago'
    },
    {
      id: '2',
      table: 1,
      items: ['Margherita Pizza', 'Cold Coffee'],
      total: '₹490',
      status: 'ready',
      time: '5 minutes ago'
    },
    {
      id: '3',
      table: 5,
      items: ['Onion Pakoda', 'Tea'],
      total: '₹200',
      status: 'served',
      time: '8 minutes ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'served': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Staff Dashboard</h1>
              <p className="text-muted-foreground">The Crafty Bean - Table Management</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Link href="/">
                <Button size="sm">
                  Back to Site
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tables">Table Management</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Total Orders</p>
                      <p className="text-2xl font-bold">{stats.totalOrders}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Pending</p>
                      <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Completed</p>
                      <p className="text-2xl font-bold text-green-600">{stats.completedOrders}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Revenue</p>
                      <p className="text-2xl font-bold">{stats.revenue}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start">
                    <QrCode className="h-4 w-4 mr-2" />
                    Generate New QR Codes
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Tables
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Orders
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">Table {order.table}</p>
                        <p className="text-sm text-muted-foreground">{order.items.join(', ')}</p>
                        <p className="text-xs text-muted-foreground">{order.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{order.total}</p>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Table Status Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Table Status Overview</CardTitle>
                <CardDescription>Current status of all tables in the cafe</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((tableNum) => (
                    <div key={tableNum} className="text-center p-4 border rounded-lg">
                      <p className="font-semibold">Table {tableNum}</p>
                      <Badge className={tableNum <= 6 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                        {tableNum <= 6 ? 'Occupied' : 'Available'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tables" className="space-y-6">
            <TableManagement />
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>View and manage all orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">Order #{order.id}</h3>
                          <p className="text-muted-foreground">Table {order.table}</p>
                          <p className="text-sm">{order.items.join(', ')}</p>
                          <p className="text-xs text-muted-foreground">{order.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{order.total}</p>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm" variant="outline">Update Status</Button>
                        <Button size="sm" variant="outline">Contact Customer</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Today's Orders</span>
                      <span className="font-semibold">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Order Value</span>
                      <span className="font-semibold">₹518</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Peak Hours</span>
                      <span className="font-semibold">2-4 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Most Popular Item</span>
                      <span className="font-semibold">Cappuccino</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Table Utilization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Tables</span>
                      <span className="font-semibold">10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Currently Occupied</span>
                      <span className="font-semibold text-red-600">6</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Available</span>
                      <span className="font-semibold text-green-600">4</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Utilization Rate</span>
                      <span className="font-semibold">60%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-green-600">12m</p>
                    <p className="text-sm text-muted-foreground">Average Wait Time</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">95%</p>
                    <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">₹1,245</p>
                    <p className="text-sm text-muted-foreground">Average Daily Revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
