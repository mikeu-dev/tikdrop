'use client';

import { useState } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';

import type { VideoData } from '@/lib/types';
import { getVideoInfo } from '@/lib/api';

import { Header } from '@/components/header';
import { InputForm } from '@/components/input-form';
import { ResultCard } from '@/components/result-card';
import AdSense from '@/components/adsense';
import { Footer } from '@/components/footer';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Zap, ShieldCheck, MonitorSmartphone, Copy, ClipboardPaste, Download as DownloadIcon } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from '@/hooks/use-language';
import { motion } from 'framer-motion';

import { saveDownload } from '@/lib/db/downloads';
import { useAuth } from '@/components/auth-provider';

export default function Home() {
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
        // Save to history asynchronously
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
      <Header />
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
        className="container mx-auto px-4 py-8 md:py-12 grow"
      >
        <div className="max-w-2xl mx-auto">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -20 },
              show: { opacity: 1, y: 0 }
            }}
            className="text-center mb-10"
          >
            <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 bg-linear-to-r from-primary via-accent to-primary bg-size-[200%_auto] animate-gradient bg-clip-text text-transparent">
              {t('home.title')}
            </h1>
            <p className="text-muted-foreground md:text-xl font-light">
              {t('home.subtitle')}
            </p>
          </motion.div>

          <InputForm onSubmit={handleFetchVideo} isLoading={isLoading} />

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 }
            }}
            className="my-5"
          >
            <AdSense adSlot="1234567890" className="w-full" />
          </motion.div>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <Skeleton className="h-[250px] w-full rounded-xl" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-3/4 rounded-full" />
                <Skeleton className="h-4 w-1/2 rounded-full" />
              </div>
              <div className="flex gap-4 pt-2">
                <Skeleton className="h-12 w-32 rounded-lg" />
                <Skeleton className="h-12 w-32 rounded-lg" />
              </div>
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Alert variant="destructive" className="border-red-500/50 bg-red-500/10 text-red-600 dark:text-red-400">
                <Terminal className="h-4 w-4" />
                <AlertTitle>{t('error.title')}</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
          {videoData && (
            <ResultCard videoData={videoData} onDownload={incrementDownloadCount} />
          )}

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 }
            }}
            className="mt-16 text-center text-sm text-muted-foreground/60"
          >
            {t('home.downloadCount', { count: downloadCount })}
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1 }
            }}
            className="mt-20 space-y-24"
          >
            {/* Services Section */}
            <section>
              <h2 className="text-2xl font-bold text-center mb-8">{t('services.title')}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-card p-6 rounded-xl border shadow-sm text-center space-y-4">
                  <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{t('services.s1.title')}</h3>
                  <p className="text-muted-foreground text-sm">{t('services.s1.desc')}</p>
                </div>
                <div className="bg-card p-6 rounded-xl border shadow-sm text-center space-y-4">
                  <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{t('services.s2.title')}</h3>
                  <p className="text-muted-foreground text-sm">{t('services.s2.desc')}</p>
                </div>
                <div className="bg-card p-6 rounded-xl border shadow-sm text-center space-y-4">
                  <div className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center">
                    <MonitorSmartphone className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{t('services.s3.title')}</h3>
                  <p className="text-muted-foreground text-sm">{t('services.s3.desc')}</p>
                </div>
              </div>
            </section>

            {/* Tutorial Section */}
            <section>
              <h2 className="text-2xl font-bold text-center mb-8">{t('tutorial.title')}</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="bg-muted w-16 h-16 rounded-2xl flex items-center justify-center mb-2">
                    <Copy className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold">{t('tutorial.step1.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('tutorial.step1.desc')}</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="bg-muted w-16 h-16 rounded-2xl flex items-center justify-center mb-2">
                    <ClipboardPaste className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold">{t('tutorial.step2.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('tutorial.step2.desc')}</p>
                </div>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-2">
                    <DownloadIcon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold">{t('tutorial.step3.title')}</h3>
                  <p className="text-sm text-muted-foreground">{t('tutorial.step3.desc')}</p>
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-center mb-8">{t('faq.title')}</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left font-semibold">{t('faq.q1.q')}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {t('faq.q1.a')}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left font-semibold">{t('faq.q2.q')}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {t('faq.q2.a')}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left font-semibold">{t('faq.q3.q')}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {t('faq.q3.a')}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left font-semibold">{t('faq.q4.q')}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {t('faq.q4.a')}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </motion.div>

          {/* Semantic SEO Block */}
          <div className="sr-only">
            <h2>Cara Download Video TikTok Tanpa Watermark (HD)</h2>
            <p>SaveTok ID adalah tool gratis terbaik untuk download VT atau video TikTok favorit Anda tanpa watermark dalam kualitas HD (MP4) atau format audio (MP3). Cukup paste link, klik download, dan nikmati videonya secara offline.</p>
            <h3>Fitur Keunggulan SaveTok ID</h3>
            <ul>
              <li>Download TikTok Tanpa Watermark</li>
              <li>Simpan Audio MP3 TikTok</li>
              <li>Akses Gratis dan Tanpa Batasan</li>
              <li>Kecepatan Unduhan Tinggi untuk Pengguna Indonesia</li>
            </ul>
          </div>

        </div>
      </motion.main>
      <Footer />
    </>
  );
}
