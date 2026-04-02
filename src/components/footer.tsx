"use client";

import { useLanguage } from '@/hooks/use-language';
import AdSense from './adsense';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t bg-white/40 dark:bg-black/20 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-8">
        <AdSense adSlot="5555555555" className="w-full text-center mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} SaveTok. All rights reserved.</p>
            <p className="mt-1">{t('footer.disclaimer')}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 md:mt-0 font-medium">
            <a href="/privacy-policy" className="hover:text-primary transition-colors">{t('footer.links.privacy')}</a>
            <a href="/terms-of-service" className="hover:text-primary transition-colors">{t('footer.links.tos')}</a>
            <a href="/disclaimer" className="hover:text-primary transition-colors">{t('footer.links.disclaimer')}</a>
            <a href="/contact" className="hover:text-primary transition-colors">{t('footer.links.contact')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
