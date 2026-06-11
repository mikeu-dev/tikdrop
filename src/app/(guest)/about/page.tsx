import { Metadata } from 'next';
import AboutClient from './about-client';

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description: 'Kenali lebih dekat TikDrop, layanan pengunduh video TikTok tanpa watermark terbaik, cepat, dan aman.',
  alternates: {
    canonical: '/about/',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
