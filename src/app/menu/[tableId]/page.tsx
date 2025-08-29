'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface TableDoc { id: string; tableNumber: number; isActive?: boolean; }

export default function TableMenuPage() {
  const params = useParams();
  const tableId = params.tableId as string;
  const [table, setTable] = useState<TableDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDoc(doc(db, 'tables', tableId));
        if (!snap.exists()) {
          setNotFound(true);
        } else {
          setTable({ id: snap.id, ...(snap.data() as any) });
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [tableId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Loading your table...</div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <CardTitle>Table not found</CardTitle>
            <CardDescription>Scan a valid QR code to open the menu.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/">Go to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Table {table?.tableNumber}</h1>
            <p className="text-muted-foreground">Welcome! Explore the menu and add items to your cart.</p>
          </div>
          <Badge variant={table?.isActive ? 'secondary' : 'outline'}>
            {table?.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Menu (Coming soon)</CardTitle>
            <CardDescription>
              We are setting up the table-specific ordering experience. In the meantime, view our full menu.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-3">
            <Button asChild>
              <Link href="/menu">View Full Menu</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}


