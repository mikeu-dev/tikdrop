import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { LanguageProvider } from "@/components/providers/language-provider";
import { AuthProvider } from "@/components/auth-provider";
import { PWARegistry } from "@/components/pwa-registry";
import { ScrollToTop } from "@/components/scroll-to-top";
import { AccessibilityWidget } from "@/components/accessibility-widget";
import { SITE_URL } from "@/lib/constants";
import { AdSenseScript } from "@/components/adsense-script";
import { Inter, Source_Code_Pro, Outfit } from "next/font/google";

const baseUrl = SITE_URL;

const siteConfig = {
  name: "TikDrop",
  url: baseUrl,
  description:
    "Download video TikTok tanpa watermark gratis kualitas HD. Simpan VT, MP4, atau lagu MP3 dengan cepat, aman, dan tanpa biaya berlangganan.",
  ogImage: `${baseUrl}/logo.png`,
  links: {
    twitter: "https://twitter.com/tikdrop",
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
    languages: {
      "id-ID": "/",
      "en-US": "/en",
    },
  },
  title: {
    default: `Download Video TikTok Tanpa Watermark (HD) - ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "download video tiktok",
    "download vt tanpa watermark",
    "tiktok downloader indonesia",
    "save tiktok lokal",
    "download fyp tiktok",
    "unduh tiktok HD",
    "tiktok mp4",
    "tiktok mp3",
    "simpan video tiktok",
    "snaptik alternatif",
    "tiktok saver id",
    "download video tiktok",
  ],
  authors: [
    {
      name: "TikDrop Team",
      url: siteConfig.url,
    },
  ],
  creator: "TikDrop Team",
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@mikedehh",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "arial"],
});
const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
  display: "swap",
  fallback: ["monospace"],
});
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  fallback: ["system-ui", "arial"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <AdSenseScript />


        {/* Google Analytics GA4 */}
        {process.env.NEXT_PUBLIC_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body
        className={cn(
          "font-body antialiased min-h-screen flex flex-col",
          inter.variable,
          sourceCodePro.variable,
          outfit.variable,
        )}
      >
        <LanguageProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="grow flex flex-col">
                {children}
              </div>
              <Toaster />
              <ScrollToTop />
              <AccessibilityWidget />
              <PWARegistry />
            </ThemeProvider>
          </AuthProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
