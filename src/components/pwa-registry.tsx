'use client';

import { useEffect } from 'react';

export function PWARegistry() {
  useEffect(() => {
    // Registrasi penangan error gambar global di client side
    const handleGlobalImageError = (event: ErrorEvent) => {
      const target = event.target as HTMLElement;
      if (target && target.tagName && target.tagName.toLowerCase() === 'img') {
        const img = target as HTMLImageElement;
        const fallback = 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800';
        if (img.src !== fallback) {
          img.src = fallback;
        }
      }
    };

    window.addEventListener('error', handleGlobalImageError, true);

    if (process.env.NODE_ENV === 'development') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(registrations => {
          for (const registration of registrations) {
            registration.unregister();
          }
        });
      }
      return () => {
        window.removeEventListener('error', handleGlobalImageError, true);
      };
    }

    if ('serviceWorker' in navigator && typeof window !== 'undefined') {
      window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js?v=2').then(
          function (registration) {
            console.log('Service Worker registration successful with scope: ', registration.scope);
          },
          function (err) {
            console.log('Service Worker registration failed: ', err);
          }
        );
      });
    }

    return () => {
      window.removeEventListener('error', handleGlobalImageError, true);
    };
  }, []);

  return null;
}
