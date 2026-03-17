'use client';

import { useEffect, useState, FC, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

type AdSenseProps = {
  className?: string;
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
};

const AdSense: FC<AdSenseProps> = ({
  className,
  adSlot,
  adFormat = 'auto',
  fullWidthResponsive = true
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [adSlot, pathname, isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className={cn("relative flex justify-center items-center overflow-hidden rounded-lg", className)} key={pathname + adSlot}>


      {/* External AdSense */}
      <ins
        className="adsbygoogle relative z-10 w-full h-full pointer-events-none"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6698556269439251"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
        suppressHydrationWarning
      ></ins>
    </div>
  );
};

export default AdSense;
