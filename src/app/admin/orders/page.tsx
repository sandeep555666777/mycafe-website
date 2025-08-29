'use client';

import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDocs, orderBy, query, updateDoc } from 'firebase/firestore';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

interface OrderDoc {
  id: string;
  tableId: string;
  items: any[];
  totalAmount: number;
  status: 'pending' | 'served' | 'paid';
  createdAt?: any;
}

export default function AdminOrdersPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<OrderDoc[]>([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/admin/login');
        return;
      }
      setAuthed(true);
    });
    return () => unsub();
  }, [router]);

  useEffect(() => {
    if (!authed) return;
    (async () => {
      setLoading(true);
      const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setOrders(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as any);
      setLoading(false);
    })();
  }, [authed]);

  const setStatus = async (o: OrderDoc, status: OrderDoc['status']) => {
    await updateDoc(doc(db, 'orders', o.id), { status });
    setOrders((prev) => prev.map((x) => (x.id === o.id ? { ...x, status } : x)));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>Latest first</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? 'Loading...' : (
            <div className="space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="border rounded p-3 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm">Order {o.id}</div>
                    <div className="text-xs text-muted-foreground">Table {o.tableId}</div>
                  </div>
                  <div className="font-semibold">₹{o.totalAmount}</div>
                  <Badge>{o.status}</Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setStatus(o, 'served')}>Mark Served</Button>
                    <Button onClick={() => setStatus(o, 'paid')}>Mark Paid</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


