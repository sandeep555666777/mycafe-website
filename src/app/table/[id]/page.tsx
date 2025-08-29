'use client';

import { useEffect, useMemo, useState } from 'react';
import { db } from '@/lib/firebase';
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MenuItemDoc { id: string; name: string; price: number; description?: string; imageUrl?: string; }

export default function TableOrderPage() {
  const params = useParams<{ id: string }>();
  const tableId = params?.id as string;
  const [menu, setMenu] = useState<MenuItemDoc[]>([]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const snap = await getDocs(collection(db, 'menu'));
      setMenu(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })) as any);
      setLoading(false);
    })();
  }, []);

  const total = useMemo(() => {
    return Object.entries(cart).reduce((acc, [id, qty]) => {
      const item = menu.find((m) => m.id === id);
      return acc + (item ? item.price * qty : 0);
    }, 0);
  }, [cart, menu]);

  const placeOrder = async () => {
    setPlacing(true);
    try {
      const items = Object.entries(cart).map(([id, qty]) => {
        const item = menu.find((m) => m.id === id)!;
        return { menuId: id, quantity: qty, price: item.price };
      });
      const orderRef = await addDoc(collection(db, 'orders'), {
        tableId,
        items,
        totalAmount: total,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      setOrderId(orderRef.id);
    } finally {
      setPlacing(false);
    }
  };

  const payNow = async () => {
    if (!orderId) return;
    const res = await fetch('/api/payment/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId }),
    });
    const data = await res.json();
    if (!res.ok) { alert(data?.error || 'Payment error'); return; }
    const options: any = {
      key: data.key,
      amount: Math.round(total * 100),
      currency: 'INR',
      name: 'MyCafe',
      description: `Order ${orderId}`,
      order_id: data.razorpayOrderId,
      handler: async function () {
        await fetch('/api/payment/create-order', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ orderId }) });
        alert('Payment successful');
      },
      theme: { color: '#ef4444' },
    };
    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <Card>
        <CardHeader>
          <CardTitle>Menu</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? 'Loading...' : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menu.map((m) => (
                <div key={m.id} className="border rounded p-3 space-y-2">
                  {m.imageUrl && <img src={m.imageUrl} alt={m.name} className="w-full h-32 object-cover rounded" />}
                  <div className="font-semibold">{m.name}</div>
                  <div className="text-sm text-muted-foreground line-clamp-2">{m.description}</div>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">₹{m.price}</div>
                    <div className="flex gap-2 items-center">
                      <Button size="sm" variant="outline" onClick={() => setCart((c) => ({ ...c, [m.id]: Math.max(0, (c[m.id] || 0) - 1) }))}>-</Button>
                      <div className="w-6 text-center">{cart[m.id] || 0}</div>
                      <Button size="sm" onClick={() => setCart((c) => ({ ...c, [m.id]: (c[m.id] || 0) + 1 }))}>+</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-lg font-semibold">Total: ₹{total.toFixed(2)}</div>
            {!orderId ? (
              <Button onClick={placeOrder} disabled={placing || total <= 0}>Place Order</Button>
            ) : (
              <Button onClick={payNow}>Pay Online</Button>
            )}
          </div>
        </CardContent>
      </Card>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
    </div>
  );
}


