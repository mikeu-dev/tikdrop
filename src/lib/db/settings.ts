import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface AdsenseSettings {
  adClient: string;
  adSlot: string;
  isEnabled: boolean;
  updatedAt?: string;
}

const SETTINGS_COLLECTION = 'settings';
const ADSENSE_DOC = 'adsense';

export async function getAdsenseSettings(): Promise<AdsenseSettings | null> {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, ADSENSE_DOC);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data() as AdsenseSettings;
    }
    
    // Default settings if none exist
    return {
      adClient: '',
      adSlot: '',
      isEnabled: false
    };
  } catch (error) {
    console.error("Error fetching Adsense settings:", error);
    return null;
  }
}

export async function saveAdsenseSettings(settings: AdsenseSettings): Promise<void> {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, ADSENSE_DOC);
    await setDoc(docRef, {
      ...settings,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error saving Adsense settings:", error);
    throw error;
  }
}

export function generateAdsenseScript(settings: AdsenseSettings): string {
  if (!settings.isEnabled || !settings.adClient || !settings.adSlot) return '';
  
  return `
<div class="my-8 text-center adsense-container">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${settings.adClient}" crossorigin="anonymous"></script>
  <ins class="adsbygoogle"
       style="display:block; text-align:center;"
       data-ad-layout="in-article"
       data-ad-format="fluid"
       data-ad-client="${settings.adClient}"
       data-ad-slot="${settings.adSlot}"></ins>
  <script>
       (adsbygoogle = window.adsbygoogle || []).push({});
  </script>
</div>
`;
}
