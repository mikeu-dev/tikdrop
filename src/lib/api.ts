'use server';

import type { TikTokAPIResponse, VideoData } from './types';
import type { Language } from '@/hooks/use-language';
import id from '@/locales/id.json';
import en from '@/locales/en.json';
import { getAdConfiguration } from './config-store';

export { getAdConfiguration };

const translations = { id, en };

interface ActionResult {
  success: boolean;
  data?: VideoData;
  error?: string;
}

async function fetchWithFallback(url: string, apiUrl: string): Promise<TikTokAPIResponse | null> {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
      },
      body: new URLSearchParams({ url }),
      cache: 'no-store'
    });

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error(`Fetch error for ${apiUrl}:`, error);
    return null;
  }
}

export async function getVideoInfo(url: string, lang: Language = 'id'): Promise<ActionResult> {
  const t = (key: keyof typeof id) => translations[lang][key] || translations['id'][key];

  // Basic validation
  if (!url || !url.includes('tiktok.com')) {
    return { success: false, error: t("api.error.invalidUrl") };
  }

  const primaryUrl = process.env.TIKTOK_API_URL;
  const secondaryUrl = process.env.TIKTOK_API_SECONDARY_URL;

  if (!primaryUrl) {
    console.error("TIKTOK_API_URL is not defined");
    return { success: false, error: t("api.error.unexpected") };
  }

  // Try Primary API (Clipra)
  console.log(`[API] Trying Primary: ${primaryUrl}`);
  const primaryResult = await fetchWithFallback(url, primaryUrl);

  if (primaryResult && primaryResult.code === 0 && primaryResult.data) {
    return { success: true, data: primaryResult.data };
  }

  // Try Secondary API (TikWM)
  if (secondaryUrl) {
    console.warn(`[API] Primary failed or returned error. Trying Secondary: ${secondaryUrl}`);
    const secondaryResult = await fetchWithFallback(url, secondaryUrl);

    if (secondaryResult && secondaryResult.code === 0 && secondaryResult.data) {
      return { success: true, data: secondaryResult.data };
    }
  }

  return { 
    success: false, 
    error: primaryResult?.msg || t("api.error.getInfoFailed") 
  };
}
