'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

const EXCLUDED_PATHS = [
  '/privacy-policy',
  '/terms-of-service',
  '/disclaimer',
  '/contact',
  '/history',
  '/admin',
  '/auth'
];

export function AdSenseScript() {
  const pathname = usePathname();

  // Cek apakah pathname saat ini ada di daftar pengecualian
  const isExcluded = EXCLUDED_PATHS.some(path => 
    pathname === path || pathname.startsWith(path + '/')
  );

  if (isExcluded) {
    return null;
  }

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6698556269439251"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
