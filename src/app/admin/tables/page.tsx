'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  QrCode, 
  Download, 
  Edit, 
  Trash2, 
  Table as TableIcon,
  CheckCircle,
  XCircle,
  Eye
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Table {
  id: string;
  tableNumber: number;
  qrCode: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function TablesManagementPage() {
  const [tables, setTables] = useState<Table[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newTableNumber, setNewTableNumber] = useState('');
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [showQRDialog, setShowQRDialog] = useState(false);

  useEffect(() => {
    loadTables();
  }, []);

  const loadTables = async () => {
    try {
      const response = await fetch('/api/admin/tables');
      if (response.ok) {
        const data = await response.json();
        setTables(data);
      }
    } catch (error) {
      console.error('Error loading tables:', error);
      toast({
        title: "Error",
        description: "Failed to load tables",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createTable = async () => {
    if (!newTableNumber.trim()) {
      toast({
        title: "Error",
        description: "Please enter a table number",
        variant: "destructive",
      });
      return;
    }

    setIsCreating(true);
    try {
      const response = await fetch('/api/admin/tables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableNumber: parseInt(newTableNumber) }),
      });

      if (response.ok) {
        const newTable = await response.json();
        setTables([...tables, newTable]);
        setNewTableNumber('');
        toast({
          title: "Success",
          description: `Table ${newTable.tableNumber} created successfully`,
        });
      } else {
        throw new Error('Failed to create table');
      }
    } catch (error) {
      console.error('Error creating table:', error);
      toast({
        title: "Error",
        description: "Failed to create table",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const toggleTableStatus = async (tableId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/tables/${tableId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !isActive }),
      });

      if (response.ok) {
        setTables(tables.map(table => 
          table.id === tableId ? { ...table, isActive: !isActive } : table
        ));
        toast({
          title: "Success",
          description: `Table ${isActive ? 'deactivated' : 'activated'} successfully`,
        });
      } else {
        throw new Error('Failed to update table');
      }
    } catch (error) {
      console.error('Error updating table:', error);
      toast({
        title: "Error",
        description: "Failed to update table",
        variant: "destructive",
      });
    }
  };

  const deleteTable = async (tableId: string) => {
    if (!confirm('Are you sure you want to delete this table? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/tables/${tableId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTables(tables.filter(table => table.id !== tableId));
        toast({
          title: "Success",
          description: "Table deleted successfully",
        });
      } else {
        throw new Error('Failed to delete table');
      }
    } catch (error) {
      console.error('Error deleting table:', error);
      toast({
        title: "Error",
        description: "Failed to delete table",
        variant: "destructive",
      });
    }
  };

  const downloadQRCode = async (table: Table) => {
    try {
      const response = await fetch(`/api/admin/tables/${table.id}/qr-code`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `table-${table.tableNumber}-qr.png`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error downloading QR code:', error);
      toast({
        title: "Error",
        description: "Failed to download QR code",
        variant: "destructive",
      });
    }
  };

  const viewQRCode = (table: Table) => {
    setSelectedTable(table);
    setShowQRDialog(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-700">Loading tables...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-900 mb-2">Table Management</h1>
          <p className="text-amber-700">Manage tables and generate QR codes for contactless ordering</p>
        </div>

        {/* Create New Table */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add New Table
            </CardTitle>
            <CardDescription>
              Create a new table and generate its QR code
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="tableNumber">Table Number</Label>
                <Input
                  id="tableNumber"
                  type="number"
                  value={newTableNumber}
                  onChange={(e) => setNewTableNumber(e.target.value)}
                  placeholder="Enter table number"
                  min="1"
                />
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={createTable}
                  disabled={isCreating || !newTableNumber.trim()}
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  {isCreating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Table
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tables List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TableIcon className="w-5 h-5" />
              Tables ({tables.length})
            </CardTitle>
            <CardDescription>
              Manage existing tables and their QR codes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {tables.length === 0 ? (
              <div className="text-center py-8">
                <TableIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No tables found</p>
                <p className="text-sm text-gray-400">Create your first table to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tables.map((table) => (
                  <Card key={table.id} className="relative">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <TableIcon className="w-5 h-5 text-amber-600" />
                          <h3 className="font-semibold text-lg">Table {table.tableNumber}</h3>
                        </div>
                        <Badge variant={table.isActive ? "default" : "secondary"}>
                          {table.isActive ? (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Active
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 mr-1" />
                              Inactive
                            </>
                          )}
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-4">
                        <p className="text-sm text-gray-600">
                          Created: {new Date(table.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          QR Code: {table.qrCode ? 'Generated' : 'Not generated'}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewQRCode(table)}
                          className="flex-1"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View QR
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadQRCode(table)}
                          className="flex-1"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                        <Button
                          variant={table.isActive ? "destructive" : "default"}
                          size="sm"
                          onClick={() => toggleTableStatus(table.id, table.isActive)}
                        >
                          {table.isActive ? (
                            <>
                              <XCircle className="w-4 h-4 mr-1" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Activate
                            </>
                          )}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => deleteTable(table.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* QR Code Dialog */}
        <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <QrCode className="w-5 h-5" />
                QR Code - Table {selectedTable?.tableNumber}
              </DialogTitle>
              <DialogDescription>
                Scan this QR code to access the menu for Table {selectedTable?.tableNumber}
              </DialogDescription>
            </DialogHeader>
            <div className="text-center space-y-4">
              {selectedTable?.qrCode && (
                <div className="bg-white p-4 rounded-lg inline-block">
                  <img
                    src={selectedTable.qrCode}
                    alt={`QR Code for Table ${selectedTable.tableNumber}`}
                    className="w-48 h-48 mx-auto"
                  />
                </div>
              )}
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Table Number: {selectedTable?.tableNumber}
                </p>
                <p className="text-sm text-gray-600">
                  URL: {selectedTable ? `/t/${selectedTable.id}` : ''}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => selectedTable && downloadQRCode(selectedTable)}
                  className="flex-1 bg-amber-600 hover:bg-amber-700"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowQRDialog(false)}
                  className="flex-1"
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
