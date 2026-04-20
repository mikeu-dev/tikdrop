import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, User, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog TikDrop - Tips & Panduan TikTok Terbaru',
  description: 'Dapatkan berita terbaru, tips viral, dan panduan lengkap seputar TikTok hanya di Blog TikDrop.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & Panduan TikTok</h1>
            <p className="text-xl text-muted-foreground">
              Pelajari cara memaksimalkan konten Anda dan unduh video dengan lebih efektif.
            </p>
          </header>

          <div className="grid gap-8">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-primary/10 bg-card/50 backdrop-blur-sm">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-1 relative aspect-video md:aspect-square bg-muted overflow-hidden">
                      {/* Placeholder for blog image if needed, for now just a nice gradient */}
                      <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <span className="text-primary font-bold text-4xl opacity-20">TikDrop</span>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <CardHeader>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {post.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {post.author}
                          </span>
                        </div>
                        <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-base line-clamp-3 mt-2">
                          {post.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <span className="text-primary font-semibold flex items-center gap-2 text-sm">
                          Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                        </span>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
