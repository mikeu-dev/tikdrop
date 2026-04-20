'use client';

import { useAuth } from '@/components/auth-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Loader2, LogIn, ShieldCheck, Mail, ArrowRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AuthClient() {
  const { user, loading, signInWithGoogle } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/admin';
  const [isSigningIn, setIsSigningIn] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) {
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
      if (user.email === adminEmail) {
        router.push(callbackUrl);
      } else {
        setError('Akses Ditolak: Anda bukan administrator.');
        // Optionally logout immediately
      }
    }
  }, [user, loading, router, callbackUrl]);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
      // Redirect handled by useEffect
    } catch (error) {
      console.error(error);
    } finally {
      setIsSigningIn(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-linear-to-b from-background to-primary/5">
      <Header />
      <main className="grow flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-primary/20 shadow-2xl backdrop-blur-md bg-white/80 dark:bg-card/80 overflow-hidden">
            <div className="h-2 bg-linear-to-r from-primary via-accent to-primary animate-gradient bg-size-200" />
            <CardHeader className="space-y-4 pt-8 text-center">
              <div className="mx-auto bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-2">
                <ShieldCheck className="w-10 h-10 text-primary" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-3xl font-bold font-headline tracking-tight">Admin Access</CardTitle>
                <CardDescription className="text-base">
                  Silakan masuk menggunakan akun Google Anda untuk mengelola konten TikDrop.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 py-6">
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-destructive/10 border border-destructive/20 text-destructive p-3 rounded-md text-sm text-center font-medium"
                >
                  {error}
                </motion.div>
              )}
              <Button 
                onClick={handleSignIn} 
                disabled={isSigningIn}
                className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-primary/25 transition-all group"
                size="lg"
              >
                {isSigningIn ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    Masuk dengan Google
                  </>
                )}
              </Button>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Admin Only</span>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg border border-dashed text-sm flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <p className="text-muted-foreground">
                  Halaman ini hanya untuk administrator. Pastikan Anda menggunakan email yang terdaftar sebagai admin di sistem.
                </p>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 border-t p-6 flex justify-center">
              <a href="/" className="text-sm text-primary hover:underline flex items-center gap-1 font-medium">
                Kembali ke Beranda <ArrowRight className="w-4 h-4" />
              </a>
            </CardFooter>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
