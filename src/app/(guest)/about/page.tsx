'use client';

import { useLanguage } from '@/hooks/use-language';
import { Info, Target, Zap, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <main className="container mx-auto px-4 py-16 md:py-24 max-w-5xl grow">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-16"
      >
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-4">
            {t('footer.links.about')}
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">
            {t('about.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            {t('footer.tagline')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-primary/10">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">{t('about.mission.title')}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {t('about.mission.desc')}
            </p>
          </div>
          <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 aspect-video flex items-center justify-center">
             <span className="text-primary font-black text-4xl opacity-20 italic">TikDrop Vision</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card/50 backdrop-blur-md p-8 rounded-3xl border border-primary/5 space-y-4">
            <Zap className="w-8 h-8 text-primary" />
            <h3 className="text-xl font-bold">{t('about.quality.title')}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('about.quality.desc')}
            </p>
          </div>
          <div className="bg-card/50 backdrop-blur-md p-8 rounded-3xl border border-primary/5 space-y-4">
            <ShieldCheck className="w-8 h-8 text-primary" />
            <h3 className="text-xl font-bold">{t('about.safety.title')}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('about.safety.p1')}
            </p>
          </div>
          <div className="bg-card/50 backdrop-blur-md p-8 rounded-3xl border border-primary/5 space-y-4">
            <Info className="w-8 h-8 text-primary" />
            <h3 className="text-xl font-bold">{t('about.free.title')}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t('about.free.desc')}
            </p>
          </div>
        </div>

        <div className="bg-linear-to-r from-primary/10 to-accent/10 rounded-3xl p-8 md:p-12 text-center space-y-6 border border-primary/5">
          <h2 className="text-2xl font-bold">Siap Menggunakan TikDrop?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Mulailah mengunduh video favorit Anda sekarang tanpa biaya dan tanpa ribet.
          </p>
          <a href="/" className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-bold text-primary-foreground transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
             Ke Beranda Sekarang
          </a>
        </div>
      </motion.div>
    </main>
  );
}
