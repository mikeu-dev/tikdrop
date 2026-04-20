import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/db/blog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog TikDrop - Tips & Panduan TikTok Terbaru',
  description: 'Dapatkan berita terbaru, tips viral, dan panduan lengkap seputar TikTok hanya di Blog TikDrop.',
};

import { BlogClient } from '@/components/blog-client';

export default async function BlogPage() {
  const posts = await getAllPosts();

  if (posts.length === 0) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center text-center p-4">
        <h2 className="text-2xl font-bold mb-2">Belum ada artikel</h2>
        <p className="text-muted-foreground">Silakan kembali lagi nanti untuk tips TikTok terbaru.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-linear-to-b from-background via-background/50 to-background">
      <main className="grow container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <header className="mb-16 text-center space-y-4">
            <div className="inline-block px-4 py-1.5 mb-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase animate-pulse">
              Insight & Tutorial
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
              Blog <span className="text-primary">TikDrop</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Kumpulan strategi, rahasia viral, dan panduan teknis terbaik untuk mendominasi FYP TikTok tahun 2026.
            </p>
          </header>

          <BlogClient posts={posts} />
        </div>
      </main>
    </div>
  );
}
