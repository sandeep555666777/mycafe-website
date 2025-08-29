'use client';

import { useEffect, useMemo, useState } from 'react';
import { auth, db, storage } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import QRCode from 'qrcode';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useRouter } from 'next/navigation';

interface TableDoc {
  id: string;
  number: number;
  qrCodeUrl?: string;
  status?: 'available' | 'occupied' | 'inactive';
  isActive?: boolean;
}

export default function AdminTablesPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [tables, setTables] = useState<TableDoc[]>([]);
  const [newNumber, setNewNumber] = useState<string>('');

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
      const q = query(collection(db, 'tables'), orderBy('number', 'asc'));
      const snap = await getDocs(q);
      const list = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
      setTables(list);
      setLoading(false);
    })();
  }, [authed]);

  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  const createTable = async () => {
    if (!newNumber) return;
    setSaving(true);
    try {
      const num = parseInt(newNumber, 10);
      const tableRef = await addDoc(collection(db, 'tables'), {
        number: num,
        status: 'available',
        isActive: true,
      });
      const url = `${origin}/table/${tableRef.id}`;
      const dataUrl = await QRCode.toDataURL(url, { errorCorrectionLevel: 'H', margin: 1, scale: 10 });
      const path = `qr/table-${num}.png`;
      const sref = ref(storage, path);
      await uploadString(sref, dataUrl, 'data_url');
      const download = await getDownloadURL(sref);
      await updateDoc(tableRef, { qrCodeUrl: download });
      setNewNumber('');
      setTables((prev) => [...prev, { id: tableRef.id, number: num, status: 'available', isActive: true, qrCodeUrl: download }].sort((a,b)=>a.number-b.number));
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (t: TableDoc) => {
    const docRef = doc(db, 'tables', t.id);
    const next = !(t.isActive ?? true);
    await updateDoc(docRef, { isActive: next, status: next ? (t.status || 'available') : 'inactive' });
    setTables((prev) => prev.map((x) => (x.id === t.id ? { ...x, isActive: next, status: next ? (x.status || 'available') : 'inactive' } : x)));
  };

  const regenerateQR = async (t: TableDoc) => {
    setSaving(true);
    try {
      const url = `${origin}/table/${t.id}`;
      const dataUrl = await QRCode.toDataURL(url, { errorCorrectionLevel: 'H', margin: 1, scale: 10 });
      const path = `qr/table-${t.number}.png`;
      const sref = ref(storage, path);
      await uploadString(sref, dataUrl, 'data_url');
      const download = await getDownloadURL(sref);
      await updateDoc(doc(db, 'tables', t.id), { qrCodeUrl: download });
      setTables((prev) => prev.map((x) => (x.id === t.id ? { ...x, qrCodeUrl: download } : x)));
    } finally {
      setSaving(false);
    }
  };

  const removeTable = async (t: TableDoc) => {
    await deleteDoc(doc(db, 'tables', t.id));
    setTables((prev) => prev.filter((x) => x.id !== t.id));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Manage Tables</h1>
        <div className="flex gap-2">
          <Input placeholder="Table number" value={newNumber} onChange={(e) => setNewNumber(e.target.value)} className="w-32" />
          <Button onClick={createTable} disabled={saving || !newNumber}>Add Table</Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Tables</CardTitle>
          <CardDescription>Create, activate, and manage QR codes</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? 'Loading...' : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tables.map((t) => (
                <div key={t.id} className="border rounded p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">Table {t.number}</div>
                    <Badge variant={t.isActive ? 'secondary' : 'outline'}>{t.isActive ? 'Active' : 'Inactive'}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Status: {t.status || 'available'}</div>
                    <Switch checked={!!t.isActive} onCheckedChange={() => toggleActive(t)} />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => regenerateQR(t)} disabled={saving}>Regenerate QR</Button>
                    <Button variant="destructive" onClick={() => removeTable(t)} disabled={saving}>Delete</Button>
                  </div>
                  {t.qrCodeUrl && (
                    <a href={t.qrCodeUrl} target="_blank" rel="noreferrer" className="block text-xs text-primary underline">Download QR</a>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


