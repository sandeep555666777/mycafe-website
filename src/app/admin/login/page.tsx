'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);
		try {
			await signInWithEmailAndPassword(auth, email, password);
			router.push('/admin/dashboard');
		} catch (err: any) {
			setError(err?.message || 'Login failed');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
			<Card className="w-full max-w-md shadow-xl">
				<CardHeader className="text-center">
					<Badge className="mb-2 bg-primary/10 text-primary border-primary/20">Admin</Badge>
					<CardTitle className="text-2xl">Sign in to Dashboard</CardTitle>
					<CardDescription>Use your staff email and password</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmit} className="space-y-4">
						<div className="relative">
							<Mail className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
							<Input type="email" placeholder="Email" className="pl-9" value={email} onChange={(e) => setEmail(e.target.value)} required />
						</div>
						<div className="relative">
							<Lock className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
							<Input type="password" placeholder="Password" className="pl-9" value={password} onChange={(e) => setPassword(e.target.value)} required />
						</div>
						{error && <div className="text-sm text-red-600">{error}</div>}
						<Button type="submit" className="w-full" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
