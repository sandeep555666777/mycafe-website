'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface TableDoc { id: string; tableNumber: number; isActive: boolean; }
interface OrderDoc { id: string; status: string; total: number; tableId: string; }

export default function AdminDashboardPage() {
	const [tables, setTables] = useState<TableDoc[]>([]);
	const [orders, setOrders] = useState<OrderDoc[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const tSnap = await getDocs(collection(db, 'tables'));
				setTables(tSnap.docs.map(d => ({ id: d.id, ...(d.data() as any) })));
				const oSnap = await getDocs(collection(db, 'orders'));
				setOrders(oSnap.docs.map(d => ({ id: d.id, ...(d.data() as any) })));
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	return (
		<div className="min-h-screen bg-background p-6">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold">Admin Dashboard</h1>
				<div className="space-x-2">
					<Button asChild variant="outline"><Link href="/admin/menu">Manage Menu</Link></Button>
					<Button asChild><Link href="/admin/qr">Generate QRs</Link></Button>
				</div>
			</div>

			<div className="grid md:grid-cols-2 gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Tables ({tables.length})</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						{loading ? 'Loading...' : tables.map(t => (
							<div key={t.id} className="flex items-center justify-between border rounded p-2">
								<div>Table {t.tableNumber}</div>
								<Badge variant={t.isActive ? 'secondary' : 'outline'}>{t.isActive ? 'Active' : 'Inactive'}</Badge>
							</div>
						))}
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Recent Orders ({orders.length})</CardTitle>
					</CardHeader>
					<CardContent className="space-y-2">
						{loading ? 'Loading...' : orders.slice(0, 8).map(o => (
							<div key={o.id} className="flex items-center justify-between border rounded p-2">
								<div>Order {o.id} • Table {o.tableId}</div>
								<Badge>{o.status || 'pending'}</Badge>
								<div className="font-semibold">₹{o.total || 0}</div>
							</div>
						))}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
