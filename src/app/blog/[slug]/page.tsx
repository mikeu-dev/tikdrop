import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/db/blog';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Calendar, User, Tag, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} - Blog TikDrop`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-sm text-primary hover:underline mb-8"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Kembali ke Blog
          </Link>

          <header className="mb-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-b pb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <div className="flex gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="bg-muted px-2 py-0.5 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </header>

          <div 
            className="prose prose-lg dark:prose-invert max-w-none 
              prose-headings:font-bold prose-headings:text-foreground
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-li:text-muted-foreground prose-strong:text-foreground
              prose-img:rounded-2xl prose-img:shadow-xl prose-img:mx-auto prose-img:border prose-img:border-primary/10"
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />

          <footer className="mt-16 pt-8 border-t">
            <div className="bg-primary/5 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-bold mb-2">Ingin Download Video TikTok Tanpa Watermark?</h3>
              <p className="text-muted-foreground mb-6">
                Gunakan TikDrop sekarang juga, gratis, cepat, dan kualitas HD!
              </p>
              <Link 
                href="/" 
                className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Coba TikDrop Sekarang
              </Link>
            </div>
          </footer>
        </article>
      </main>
      <Footer />
    </div>
  );
}
