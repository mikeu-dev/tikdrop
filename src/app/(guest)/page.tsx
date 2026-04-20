import { Metadata } from "next";
import { SITE_URL } from "@/lib/constants";
import HomeClient from "./home-client";
import { getAllPosts } from "@/lib/db/blog";

const baseUrl = SITE_URL;

export const metadata: Metadata = {
  // ... metadata tetap sama
  alternates: {
    canonical: "/",
  },
  title: "Download Video TikTok Tanpa Watermark (HD) - TikDrop",
  description: "Download video TikTok tanpa watermark gratis kualitas HD. Simpan VT, MP4, atau lagu MP3 dengan cepat, aman, dan tanpa biaya berlangganan.",
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
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: baseUrl,
    title: "TikDrop - TikTok Downloader No Watermark",
    description: "Download video TikTok tanpa watermark gratis kualitas HD.",
    siteName: "TikDrop",
    images: [
      {
        url: `${baseUrl}/logo.png`,
        alt: "TikDrop Logo",
      },
    ],
  },
};

export default async function Home() {
  const latestPosts = await getAllPosts(3);
  return <HomeClient latestPosts={latestPosts} />;
}
