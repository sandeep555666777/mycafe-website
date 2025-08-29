'use client';

import { useEffect, useState, useRef } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import QRCode from 'qrcode';

interface TableDoc { id: string; tableNumber: number; qrUrl?: string; }

export default function AdminQRPage() {
	const [tables, setTables] = useState<TableDoc[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const tSnap = await getDocs(collection(db, 'tables'));
				setTables(tSnap.docs.map(d => ({ id: d.id, ...(d.data() as any) })));
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	const downloadPng = async (table: TableDoc) => {
		const url = table.qrUrl || `${window.location.origin}/menu/${table.id}`;
		const dataUrl = await QRCode.toDataURL(url, { errorCorrectionLevel: 'H', margin: 1, scale: 10 });
		const link = document.createElement('a');
		link.href = dataUrl;
		link.download = `table-${table.tableNumber}.png`;
		link.click();
	};

	return (
		<div className="min-h-screen bg-background p-6">
			<Card>
				<CardHeader>
					<CardTitle>QR Codes</CardTitle>
					<CardDescription>Download printable QR codes for each table</CardDescription>
				</CardHeader>
				<CardContent>
					{loading ? 'Loading...' : (
						<div className="grid md:grid-cols-3 gap-4">
							{tables.map((t) => (
								<div key={t.id} className="border rounded p-4 flex flex-col items-center">
									<div className="text-sm mb-2 font-semibold">Table {t.tableNumber}</div>
									<div className="bg-white p-2 rounded">
										{/* Preview small QR */}
										<img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(t.qrUrl || '')}`} alt="QR" />
									</div>
									<Button className="mt-3" onClick={() => downloadPng(t)}>Download PNG</Button>
								</div>
							))}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
