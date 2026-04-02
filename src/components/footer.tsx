"use client";

import { useLanguage } from '@/hooks/use-language';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function Footer() {
  const { t } = useLanguage();
  const pathname = usePathname();

  return (
    <footer className="border-t bg-white/40 dark:bg-black/20 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="text-center md:text-left">
            <p>&copy; {new Date().getFullYear()} TikDrop. {t('footer.allRightsReserved')}</p>
            <p className="mt-1">{t('footer.disclaimer')}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 md:mt-0 font-medium">
            <Link href="/privacy-policy" className={`hover:text-primary transition-colors ${pathname === '/privacy-policy' ? 'text-primary font-bold decoration-2 underline-offset-4 underline' : ''}`}>{t('footer.links.privacy')}</Link>
            <Link href="/terms-of-service" className={`hover:text-primary transition-colors ${pathname === '/terms-of-service' ? 'text-primary font-bold decoration-2 underline-offset-4 underline' : ''}`}>{t('footer.links.tos')}</Link>
            <Link href="/disclaimer" className={`hover:text-primary transition-colors ${pathname === '/disclaimer' ? 'text-primary font-bold decoration-2 underline-offset-4 underline' : ''}`}>{t('footer.links.disclaimer')}</Link>
            <Link href="/contact" className={`hover:text-primary transition-colors ${pathname === '/contact' ? 'text-primary font-bold decoration-2 underline-offset-4 underline' : ''}`}>{t('footer.links.contact')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
