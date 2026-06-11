import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatThumbnailUrl(url: string | undefined | null): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  // If it is just an Unsplash photo ID (like photo-1611606063065-ee794616798a)
  if (/^[a-zA-Z0-9_-]+$/.test(url)) {
    return `https://images.unsplash.com/${url}?q=80&w=800`;
  }
  return url;
}
