import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Kebijakan Privasi terkait informasi yang dikumpulkan oleh SaveTok.id',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 md:py-16 max-w-4xl grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose dark:prose-invert max-w-none space-y-6">
          <p>
            Di SaveTok.id, dapat diakses di https://savetok.id, salah satu prioritas utama kami adalah privasi pengunjung. Dokumen Kebijakan Privasi ini berisi jenis informasi yang dikumpulkan dan dicatat oleh SaveTok.id dan bagaimana kami menggunakannya.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Informasi yang Kami Kumpulkan</h2>
          <p>
            Kami tidak mengharuskan pengguna membuat akun atau memberikan informasi identitas pribadi untuk menggunakan sebagian besar layanan kami. Namun, saat Anda menggunakan SaveTok.id, kami mungkin mengumpulkan:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Log Files:</strong> Proses standar log web, yang mencakup alamat Internet Protocol (IP), jenis browser, Internet Service Provider (ISP), cap waktu (tanggal dan waktu), halaman rujukan/keluar, dan jumlah klik.</li>
            <li><strong>Cookies dan Web Beacons:</strong> Sama seperti situs web lainnya, SaveTok.id menggunakan "cookie" untuk menyimpan preferensi pengunjung, dan melacak halaman mana yang dikunjungi pengguna.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Google AdSense dan Pihak Ketiga</h2>
          <p>
            Situs ini berafiliasi dengan Google AdSense, sebuah layanan pasang iklan Google. Kami menggunakan cookie atau tag web pihak ketiga dalam rangka menyajikan iklan. Google, sebagai vendor pihak ketiga, menggunakan cookie DART untuk menayangkan iklan ke pengunjung situs kami berdasarkan kunjungan mereka ke situs kami serta situs lain di internet. Pengguna dapat memilih keluar dari penggunaan cookie DART melalui mengunjungi kebijakan privasi iklan dan jaringan konten Google di URL berikut: <a href="https://policies.google.com/technologies/ads" className="text-primary hover:underline">https://policies.google.com/technologies/ads</a>
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Informasi Anak-anak</h2>
          <p>
            Penting bagi kami memberikan perlindungan tambahan untuk anak-anak saat menggunakan dunia maya. Kami tidak bermaksud mengumpulkan informasi identitas pribadi (PII) apa pun dari anak-anak di bawah usia 13 tahun. Jika Anda yakin anak Anda memberikan kami informasi ini di situs web kami, silakan segera hubungi kami.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Perubahan pada Kebijakan Privasi Ini</h2>
          <p>
            Kami dapat memperbarui Kebijakan Privasi kami dari waktu ke waktu. Dengan menggunakan situs web kami, Anda dengan ini menyetujui Kebijakan Privasi kami dan menyetujui Syarat dan Ketentuannya.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
