import { Metadata } from 'next';
import AuthClient from './auth-client';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Auth - TikDrop',
  description: 'Halaman masuk administrator TikDrop.',
  robots: 'noindex, nofollow', // Prevent search engines from indexing the login page
};

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>}>
      <AuthClient />
    </Suspense>
  );
}
