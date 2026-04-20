'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLocalStorage } from '@/hooks/use-local-storage';

import type { VideoData } from '@/lib/types';
import { getVideoInfo } from '@/lib/api';

import { InputForm } from '@/components/input-form';
import { ResultCard } from '@/components/result-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Zap, ShieldCheck, MonitorSmartphone, Copy, ClipboardPaste, Download as DownloadIcon, ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/use-language';
import { motion } from 'framer-motion';

import { saveDownload } from '@/lib/db/downloads';
import { useAuth } from '@/components/auth-provider';
import { SITE_URL } from '@/lib/constants';


function ShareHandler({ onShare }: { onShare: (url: string) => void }) {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const text = searchParams.get('text');
    const url = searchParams.get('url');
    const title = searchParams.get('title');
    const action = searchParams.get('action');
    
    // Handle action=paste (PWA shortcut)
    if (action === 'paste') {
        const inputElement = document.querySelector('input[name="url"]') as HTMLInputElement;
        if (inputElement) {
            inputElement.focus();
        }
    }

    const sharedData = text || url || title || '';
    
    if (sharedData) {
      // RegEx untuk mencari URL tiktok.com (bisa berupa vt.tiktok.com atau tiktok.com)
      const tiktokRegex = /https?:\/\/(?:[a-zA-Z0-9-]+\.)*tiktok\.com\/[a-zA-Z0-9/._?-]+/;
      const match = sharedData.match(tiktokRegex);
      
      if (match && match[0]) {
        onShare(match[0]);
        // Bersihkan URL agar tidak re-trigger saat refresh
        if (typeof window !== 'undefined') {
          window.history.replaceState({}, '', '/');
        }
      }
    }
  }, [searchParams, onShare]);
  
  return null;
}

import { BlogPost } from '@/lib/types';
import Link from 'next/link';

interface HomeClientProps {
  latestPosts?: BlogPost[];
}

export default function HomeClient({ latestPosts = [] }: HomeClientProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [downloadCount, setDownloadCount] = useLocalStorage('downloadCount', 0);
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const handleFetchVideo = async (url: string) => {
    setIsLoading(true);
    setError(null);
    setVideoData(null);

    const result = await getVideoInfo(url, language);

    if (result.success && result.data) {
      setVideoData(result.data);
      if (user) {
        saveDownload(user.uid, result.data).catch(console.error);
      }
    } else {
      setError(result.error || t('error.unknown'));
    }

    setIsLoading(false);
  };

  const incrementDownloadCount = () => {
    setDownloadCount(prevCount => prevCount + 1);
  };

  return (
    <>
      <Suspense fallback={null}>
        <ShareHandler onShare={handleFetchVideo} />
      </Suspense>
      <motion.main
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
        className="container mx-auto px-4 pt-12 md:pt-20 grow flex flex-col justify-start"
      >
        <div className="max-w-4xl mx-auto w-full">
          {/* Hero Section */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -20 },
              show: { opacity: 1, y: 0 }
            }}
            className="text-center mb-12 sm:mb-16 px-2"
          >
            <div className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold tracking-widest uppercase mb-6 animate-bounce">
              TikTok Downloader v2.0
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black font-headline mb-6 bg-linear-to-r from-primary via-accent to-primary bg-size-[200%_auto] animate-gradient bg-clip-text text-transparent pb-2 leading-tight md:leading-tight tracking-tighter">
              {t('home.title')}
            </h1>
            <p className="text-sm sm:text-base md:text-xl text-muted-foreground font-light max-w-xl mx-auto">
              {t('home.subtitle')}
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto mb-20">
            <InputForm onSubmit={handleFetchVideo} isLoading={isLoading} />

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6 mt-8"
              >
                <Skeleton className="h-[250px] w-full rounded-2xl" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-3/4 rounded-full" />
                  <Skeleton className="h-4 w-1/2 rounded-full" />
                </div>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-8"
              >
                <Alert variant="destructive" className="border-red-500/30 bg-red-500/5 backdrop-blur-md">
                  <Terminal className="h-4 w-4" />
                  <AlertTitle>{t('error.title')}</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            {videoData && (
              <div className="mt-8">
                <ResultCard videoData={videoData} onDownload={incrementDownloadCount} />
              </div>
            )}
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 }
            }}
            className="space-y-24 sm:space-y-32 pb-24"
          >
            {/* Services Section */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-center mb-12 tracking-tight">{t('services.title')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { icon: Zap, title: t('services.s1.title'), desc: t('services.s1.desc') },
                  { icon: ShieldCheck, title: t('services.s2.title'), desc: t('services.s2.desc') },
                  { icon: MonitorSmartphone, title: t('services.s3.title'), desc: t('services.s3.desc') }
                ].map((s, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="group bg-card/30 backdrop-blur-md p-8 rounded-2xl border border-primary/5 hover:border-primary/20 transition-all shadow-xl hover:shadow-primary/5 text-center space-y-4"
                  >
                    <div className="mx-auto bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <s.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">{s.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Latest Blogs Section */}
            {latestPosts.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight">Tips & Berita Terbaru</h2>
                  <Link href="/blog" className="text-primary text-sm font-bold flex items-center gap-2 hover:underline">
                    Lihat Semua <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {latestPosts.map((post) => (
                    <Link href={`/blog/${post.slug}`} key={post.slug} className="group flex">
                      <Card className="flex flex-col overflow-hidden border-primary/5 bg-card/30 backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-primary/20">
                        <div className="relative aspect-video overflow-hidden">
                          {post.thumbnail ? (
                            <img 
                              src={post.thumbnail} 
                              alt={post.title} 
                              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                              <span className="text-primary font-bold text-3xl opacity-10">TikDrop</span>
                            </div>
                          )}
                        </div>
                        <CardHeader className="p-6 grow">
                          <div className="flex items-center gap-3 text-[10px] text-muted-foreground/60 mb-2 font-mono">
                            <span>{post.date}</span>
                          </div>
                          <CardTitle className="text-base font-bold group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Tutorial Section */}
            <section>
              <h2 className="text-2xl sm:text-3xl font-black text-center mb-12 tracking-tight">{t('tutorial.title')}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
                {[
                  { icon: Copy, title: t('tutorial.step1.title'), desc: t('tutorial.step1.desc') },
                  { icon: ClipboardPaste, title: t('tutorial.step2.title'), desc: t('tutorial.step2.desc') },
                  { icon: DownloadIcon, title: t('tutorial.step3.title'), desc: t('tutorial.step3.desc'), primary: true }
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center text-center space-y-4">
                    <div className={`${step.primary ? 'bg-primary/20 ring-4 ring-primary/10' : 'bg-muted'} w-20 h-20 rounded-3xl flex items-center justify-center mb-2 shadow-inner`}>
                      <step.icon className={`h-10 w-10 ${step.primary ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg">{step.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed max-w-[200px]">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section className="max-w-3xl mx-auto w-full">
              <h2 className="text-2xl sm:text-3xl font-black text-center mb-12 tracking-tight">{t('faq.title')}</h2>
              <div className="bg-card/20 backdrop-blur-md rounded-3xl border border-primary/5 p-4 sm:p-8">
                <Accordion type="single" collapsible className="w-full">
                  {[1, 2, 3, 4].map((i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border-primary/5 px-2">
                      <AccordionTrigger className="text-left font-bold py-5 hover:text-primary transition-colors">
                        {t(`faq.q${i}.q`)}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pb-5 pt-2">
                        {t(`faq.q${i}.a`)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </section>

            {/* Semantic SEO Block */}
            <section className="pt-20 border-t border-primary/5">
              <article className="max-w-3xl mx-auto text-muted-foreground text-sm sm:text-base leading-relaxed space-y-8">
                <div className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">{t('seo.title')}</h2>
                  <p dangerouslySetInnerHTML={{ __html: t('seo.p1') }} />
                </div>
                
                <div className="bg-primary/5 p-8 rounded-3xl space-y-4 border border-primary/10">
                  <h3 className="text-xl font-bold text-foreground">{t('seo.features.title')}</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[1, 2, 3, 4, 5].map(i => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {t(`seo.features.${i}`)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground tracking-tight">{t('seo.article.title')}</h2>
                  <p>{t('seo.article.p1')}</p>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-foreground">{t('seo.article.h2_1')}</h3>
                    <p>{t('seo.article.p2')}</p>
                    <ul className="space-y-4">
                      {[1, 2, 3, 4].map(i => (
                        <li key={i} className="bg-card/20 p-4 rounded-xl border border-primary/5" dangerouslySetInnerHTML={{ __html: t(`seo.article.li${i}`) }} />
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-4 pt-4">
                    <h3 className="text-xl font-semibold text-foreground">{t('seo.article.h2_2')}</h3>
                    <p>{t('seo.article.p3')}</p>
                  </div>
                </div>
              </article>
            </section>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 }
            }}
            className="mt-16 text-center text-xs text-muted-foreground/40 font-mono"
          >
            {t('home.downloadCount', { count: downloadCount })} downloads served
          </motion.div>

          {/* Schema Markup JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "WebApplication",
                    "name": "TikDrop",
                    "url": SITE_URL,
                    "applicationCategory": "MultimediaApplication",
                    "operatingSystem": "All",
                    "description": t('home.subtitle')
                  },
                  {
                    "@type": "Article",
                    "headline": t('seo.article.title'),
                    "description": t('seo.article.p1'),
                    "author": { "@type": "Organization", "name": "TikDrop" },
                    "publisher": {
                      "@type": "Organization",
                      "name": "TikDrop",
                      "logo": { "@type": "ImageObject", "url": `${SITE_URL}/icon-512x512.png` }
                    },
                    "datePublished": "2024-01-01T08:00:00+07:00",
                    "dateModified": "2026-04-07T08:00:00+07:00",
                    "mainEntityOfPage": { "@type": "WebPage", "@id": SITE_URL }
                  },
                  {
                    "@type": "FAQPage",
                    "mainEntity": [1, 2, 3, 4].map(i => ({
                      "@type": "Question",
                      "name": t(`faq.q${i}.q`),
                      "acceptedAnswer": { "@type": "Answer", "text": t(`faq.q${i}.a`) }
                    }))
                  }
                ]
              })
            }}
          />
        </div>
      </motion.main>
    </>
  );
}
