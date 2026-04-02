import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Metadata } from 'next';
import { LegalContent } from '@/components/legal-content';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Hubungi tim TikDrop untuk pertanyaan dan masukan.',
};

export default function ContactUsPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 md:py-16 max-w-4xl grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center sm:text-left">Contact Us</h1>
        <LegalContent type="contact" />
      </main>
      <Footer />
    </>
  );
}
