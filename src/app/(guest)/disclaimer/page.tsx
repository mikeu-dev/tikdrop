import { Metadata } from 'next';
import { LegalContent } from '@/components/legal-content';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Pernyataan Penyangkalan (Disclaimer) untuk pengguna TikDrop',
  alternates: {
    canonical: '/disclaimer/',
  },
};

export default function DisclaimerPage() {
  return (
    <main className="container mx-auto px-4 py-12 md:py-16 max-w-4xl grow">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Disclaimer</h1>
      <LegalContent type="disclaimer" />
    </main>
  );
}
