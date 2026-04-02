import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Syarat dan Ketentuan penggunaan layanan SaveTok.id',
};

export default function TermsOfServicePage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 md:py-16 max-w-4xl grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose dark:prose-invert max-w-none space-y-6">
          <p>
            Selamat datang di SaveTok.id! Dengan mengakses situs web kami, Anda setuju untuk terikat oleh Syarat dan Ketentuan Penggunaan Layanan kami, semua hukum dan peraturan yang berlaku, serta setuju bahwa Anda bertanggung jawab untuk mematuhi hukum setempat yang berlaku.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">1. Penggunaan Layanan</h2>
          <p>
            SaveTok.id adalah alat daring (online tool) yang membantu pengguna mengunduh video publik dari TikTok. Namun, layanan kami harus digunakan secara sah dan sesuai etika:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Anda dilarang mengunduh video yang memiliki hak cipta ketat dan menyebarkannya kembali untuk tujuan komersial tanpa izin langsung dari pemilik konten aslinya.</li>
            <li>Anda tidak boleh menggunakan layanan kami untuk mengunduh konten ilegal, terkait eksploitasi, berbahaya, atau melanggar hukum lainnya.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4">2. Hak Cipta dan Kekayaan Intelektual</h2>
          <p>
            Semua video, audio, dan konten yang diunduh melalui platform kami adalah milik masing-masing pemilik konten/kreator di TikTok. SaveTok.id <strong>TIDAK MENGKLAIM</strong> kepemilikan, hak, atau afilisasi terhadap konten apa pun yang Anda unduh. Pengguna menanggung semua risiko dan tanggung jawab terhadap penggunaan apa pun atas konten pihak ketiga tersebut.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">3. Ketersediaan Layanan</h2>
          <p>
            Layanan kami disediakan apa adanya ("as is"). Kami bisa saja menghentikan atau mengubah sebagian atau seluruh layanan sementara maupun permanen kapan saja, tanpa pemberitahuan sebelumnya. Kami tidak memberikan jaminan bahwa situs ini akan selalu tanpa jeda (gangguan) atau tanpa eror sama sekali.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">4. Batasan Tanggung Jawab</h2>
          <p>
            SaveTok.id beserta sub-domain, admin, dan pihak terafiliasinya tidak akan dimintai pertanggungjawaban ganti rugi (termasuk tanpa ada batasan kerusakan untuk kehilangan data atau profit, akibat pembatasan komersial) atas kelalaian kerugian saat pemakaian situs ini. 
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">5. Iklan</h2>
          <p>
            Untuk mempertahankan keberadaan situs web kami gratis, kami dapat menempatkan iklan yang didukung oleh Google AdSense atau pihak ketiga. Dengan melanjutkan penggunaan alat ini, Anda menerima tampilan iklan pada platform kami.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
