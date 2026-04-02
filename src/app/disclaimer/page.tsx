import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description: 'Pernyataan Penyangkalan (Disclaimer) untuk pengguna SaveTok.id',
};

export default function DisclaimerPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 md:py-16 max-w-4xl grow">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Disclaimer</h1>
        
        <div className="prose dark:prose-invert max-w-none space-y-6">
          <p>
            Dengan menggunakan situs SaveTok.id, Anda membaca, mengerti, dan menyetujui pernyataan berikut:
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Afiliasi</h2>
          <p>
            Situs ini <strong>TIDAK BERAFIILIASI</strong> secara khusus, didukung, diswastanisasikan maupun secara kelembagaan bernaung di bawah pihak <strong>TikTok, ByteDance</strong>, maupun entitas perusahaannya. Kami merupakan layanan alat berbasis web independen (Third-party) untuk memudahkan pengunduhan konten yang bersifat publik berdasarkan link URL. Nama, Merek Dagang, dan logo yang diunduh adalah seluruhnya hak paten milik TikTok dan pemilik video (Original Creator).
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Tanggung Jawab Pemakaian</h2>
          <p>
            Alat yang kami sediakan disajikan untuk mempermudah akses bagi kepentingan personal dan bukan tujuan komersialisasi. Anda tidak dibenarkan mendistribusikan secara komersil konten di luar hak paten kecuali Anda sudah menghubungi serta memperoleh izin lisan maupun tertulis dari sang pemilik konten (creator).
          </p>
          <p>
            Jika Anda melanggar Hak Cipta, Anda bertanggung jawab secara mandiri atas perbuatan tersebut di muka hukum. SaveTok.id menolak keras segala tuntutan yang mungkin terjadi di masa mendatang sebagai akibat di luar platform kami.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Konten yang Diunduh</h2>
          <p>
            Kami tidak mempromosikan, meng-host, atau menyediakan server untuk menyimpan video maupun audio di sistem database kami terkait file riwayat Anda. Kami mengalirkan secara langsung (streaming logic) layanan dari server media sosial terkait ke perangkat pengguna.
          </p>

          <p className="mt-8 italic text-muted-foreground">
            Sangkalan ini terakhir kali diperbarui pada waktu penyusunan awal situs, apabila terdapat perbaikan pada masa mendatang kami tidak berkewajiban mengirimkan pemberitahuan.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
