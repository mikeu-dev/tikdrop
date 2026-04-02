import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Metadata } from 'next';
import { LegalContent } from '@/components/legal-content';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Kebijakan Privasi terkait informasi yang dikumpulkan oleh TikDrop',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 md:py-16 max-w-4xl grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
        <LegalContent type="privacy" />
      </main>
      <Footer />
    </>
  );
}
