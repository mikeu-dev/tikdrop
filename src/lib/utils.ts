import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const FALLBACK_THUMBNAIL = 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800';

export function formatThumbnailUrl(url: string | undefined | null): string {
  if (!url) return FALLBACK_THUMBNAIL;
  
  // Deteksi ID bermasalah/mati yang tercatat di database lama
  if (url.includes('photo-1611605698335-8b856c831f36')) {
    return FALLBACK_THUMBNAIL;
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  // If it is just an Unsplash photo ID (like photo-1611606063065-ee794616798a)
  if (/^[a-zA-Z0-9_-]+$/.test(url)) {
    return `https://images.unsplash.com/${url}?q=80&w=800`;
  }
  return url;
}
