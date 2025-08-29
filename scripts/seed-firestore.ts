import { db } from '@/lib/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import QRCode from 'qrcode';

async function generateQrDataUrl(url: string): Promise<string> {
	return await QRCode.toDataURL(url, { errorCorrectionLevel: 'H' });
}

async function seedTables() {
	const tablesCol = collection(db, 'tables');
	for (let i = 1; i <= 10; i++) {
		const tableId = `t-${i}`;
		const qrUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/menu/${tableId}`;
		const qrDataUrl = await generateQrDataUrl(qrUrl);
		await setDoc(doc(tablesCol, tableId), {
			id: tableId,
			tableNumber: i,
			qrUrl,
			qrDataUrl,
			isActive: true,
			createdAt: new Date().toISOString(),
		});
		console.log(`Seeded table ${i}`);
	}
}

async function ensureCollections() {
	// Firestore is schemaless; creating a placeholder docs to ensure structure
	await setDoc(doc(collection(db, 'meta'), 'collections'), {
		tables: true,
		menu: true,
		orders: true,
		createdAt: new Date().toISOString(),
	});
}

async function main() {
	await ensureCollections();
	await seedTables();
	console.log('Firestore seed complete.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
