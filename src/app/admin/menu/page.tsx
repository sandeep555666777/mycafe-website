'use client';

import { useEffect, useState } from 'react';
import { auth, db, storage } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';

interface MenuItemDoc {
  id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  imageUrl?: string;
}

export default function AdminMenuPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<MenuItemDoc[]>([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', file: null as File | null });
  const [saving, setSaving] = useState(false);

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
      const q = query(collection(db, 'menu'), orderBy('name', 'asc'));
      const snap = await getDocs(q);
      setItems(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
      setLoading(false);
    })();
  }, [authed]);

  const createItem = async () => {
    if (!form.name || !form.price) return;
    setSaving(true);
    try {
      const priceNumber = Math.round(parseFloat(form.price) * 100) / 100;
      const docRef = await addDoc(collection(db, 'menu'), {
        name: form.name,
        description: form.description,
        price: priceNumber,
        category: form.category || null,
        imageUrl: null,
      });
      let imageUrl: string | null = null;
      if (form.file) {
        const sref = ref(storage, `menu/${docRef.id}-${form.file.name}`);
        await uploadBytes(sref, form.file);
        imageUrl = await getDownloadURL(sref);
        await updateDoc(docRef, { imageUrl });
      }
      setForm({ name: '', description: '', price: '', category: '', file: null });
      setItems((prev) => [{ id: docRef.id, name: form.name, description: form.description, price: priceNumber, category: form.category, imageUrl: imageUrl || undefined }, ...prev]);
    } finally {
      setSaving(false);
    }
  };

  const removeItem = async (id: string) => {
    await deleteDoc(doc(db, 'menu', id));
    setItems((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Manage Menu</h1>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add Menu Item</CardTitle>
          <CardDescription>Upload image to Firebase Storage</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <Input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <Input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <Input type="file" accept="image/*" onChange={(e) => setForm({ ...form, file: e.target.files?.[0] || null })} />
          <div className="md:col-span-2">
            <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="md:col-span-2">
            <Button onClick={createItem} disabled={saving || !form.name || !form.price}>Create</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Menu Items</CardTitle>
          <CardDescription>{items.length} total</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? 'Loading...' : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((it) => (
                <div key={it.id} className="border rounded p-4 space-y-2">
                  <div className="font-semibold">{it.name}</div>
                  {it.imageUrl && <img src={it.imageUrl} alt={it.name} className="w-full h-32 object-cover rounded" />}
                  <div className="text-sm text-muted-foreground line-clamp-2">{it.description}</div>
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">₹{it.price}</div>
                    <div className="text-xs"><Badge variant="secondary">{it.category || 'Uncategorized'}</Badge></div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="destructive" onClick={() => removeItem(it.id)}>Delete</Button>
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


