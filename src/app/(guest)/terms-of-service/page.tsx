import { Metadata } from 'next';
import { LegalContent } from '@/components/legal-content';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Syarat dan Ketentuan penggunaan layanan TikDrop',
  alternates: {
    canonical: '/terms-of-service/',
  },
};

export default function TermsOfServicePage() {
  return (
    <main className="container mx-auto px-4 py-12 md:py-16 max-w-4xl grow">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
      <LegalContent type="tos" />
    </main>
  );
}
