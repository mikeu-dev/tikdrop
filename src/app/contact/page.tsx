import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Metadata } from 'next';
import { Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Hubungi tim SaveTok.id untuk pertanyaan dan masukan.',
};

export default function ContactUsPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 md:py-16 max-w-4xl grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center sm:text-left">Contact Us</h1>
        
        <div className="prose dark:prose-invert max-w-none space-y-6">
          <p className="text-lg">
            Ada pertanyaan, masukan, keluhan kelalaian lisensi, atau sekadar ingin menyapa pengembang platform ini? Kami senantiasa terbuka untuk kritik demi pengembangan situs ini agar lebih baik kedepannya.
          </p>

          <div className="bg-card border rounded-xl p-8 mt-8 flex flex-col items-center justify-center space-y-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold m-0">Kirimkan Email</h2>
            <p className="text-center text-muted-foreground m-0">
              Silahkan berkirim pesan elektronik ke alamat di bawah ini. Kami akan berusaha merespons dalam waktu 2x24 jam kerja.
            </p>
            <a href="mailto:admin@savetok.id" className="text-2xl font-bold text-primary hover:underline m-0">
              admin@savetok.id
            </a>
          </div>

          <div className="mt-12 text-sm text-muted-foreground">
            <p><strong>Catatan untuk Pengiklan/Corporate:</strong> Jika Anda tertarik untuk memasang Iklan Banner Kustom, silakan gunakan format Subjek: <code>[IKLAN] - Nama Perusahaan Anda</code> agar email tidak masuk ke folder SPAM.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
