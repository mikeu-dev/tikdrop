import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import { LanguageProvider } from '@/components/providers/language-provider';
import { AuthProvider } from '@/components/auth-provider';

const siteConfig = {
  name: 'SaveTok ID',
  url: 'https://savetok.id', // Menunggu domain resmi, sementara pakai ini
  description: 'Download video TikTok tanpa watermark gratis kualitas HD. Simpan VT, MP4, atau lagu MP3 dengan cepat, aman, dan tanpa biaya berlangganan.',
  ogImage: 'https://savetok.id/og-image.png', 
  links: {
    twitter: 'https://twitter.com/savetok_id', 
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Download Video TikTok Tanpa Watermark Gratis`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'download video tiktok',
    'download vt tanpa watermark',
    'tiktok downloader indonesia',
    'save tiktok lokal',
    'download fyp tiktok',
    'unduh tiktok HD',
    'tiktok mp4',
    'tiktok mp3',
    'simpan video tiktok',
    'snaptik alternatif',
    'tiktok saver id'
  ],
  authors: [
    {
      name: 'SaveTok ID Team',
      url: siteConfig.url,
    },
  ],
  creator: 'SaveTok ID Team',

  openGraph: {
    type: 'website',
    locale: 'id_ID',
    alternateLocale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@your_handle', // Ganti dengan handle Twitter Anda
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};


import { Inter, Source_Code_Pro, Outfit } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", fallback: ['system-ui', 'arial'] });
const sourceCodePro = Source_Code_Pro({ subsets: ["latin"], variable: "--font-source-code-pro", display: "swap", fallback: ['monospace'] });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap", fallback: ['system-ui', 'arial'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-6698556269439251" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6698556269439251" crossOrigin="anonymous"></script>
      </head>
      <body className={cn("font-body antialiased min-h-screen flex flex-col", inter.variable, sourceCodePro.variable, outfit.variable)}>
        <LanguageProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="grow">
                {children}
              </div>
              <Toaster />
            </ThemeProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
