'use client';

import { useLanguage } from '@/hooks/use-language';
import { Mail } from 'lucide-react';

interface LegalContentProps {
  type: 'privacy' | 'tos' | 'disclaimer' | 'contact';
}

export function LegalContent({ type }: LegalContentProps) {
  const { language } = useLanguage();

  if (type === 'privacy') {
    return language === 'en' ? (
      <div className="prose dark:prose-invert max-w-none space-y-6">
        <p>
          At TikDrop, accessible from {process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by TikDrop and how we use it.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
        <p>
          We do not require users to create an account or provide personally identifiable information to use most of our services. However, when you use TikDrop, we may collect:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Log Files:</strong> Standard procedure of using log files, which includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.</li>
          <li><strong>Cookies and Web Beacons:</strong> Like any other website, TikDrop uses "cookies" to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Google AdSense and Third Parties</h2>
        <p>
          This site is affiliated with Google AdSense, a Google advertising service. We use third-party cookies or web beacons in order to serve ads. Google, as a third-party vendor, uses DART cookies to serve ads to our site visitors based upon their visit to our site and other sites on the internet. Users may opt out of the use of the DART cookie by visiting the Google ad and content network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" className="text-primary hover:underline">https://policies.google.com/technologies/ads</a>
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Children's Information</h2>
        <p>
          Another part of our priority is adding protection for children while using the internet. We do not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
        </p>
      </div>
    ) : (
      <div className="prose dark:prose-invert max-w-none space-y-6">
        <p>
          Di TikDrop, dapat diakses di {process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}, salah satu prioritas utama kami adalah privasi pengunjung. Dokumen Kebijakan Privasi ini berisi jenis informasi yang dikumpulkan dan dicatat oleh TikDrop dan bagaimana kami menggunakannya.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Informasi yang Kami Kumpulkan</h2>
        <p>
          Kami tidak mengharuskan pengguna membuat akun atau memberikan informasi identitas pribadi untuk menggunakan sebagian besar layanan kami. Namun, saat Anda menggunakan TikDrop, kami mungkin mengumpulkan:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Log Files:</strong> Proses standar log web, yang mencakup alamat Internet Protocol (IP), jenis browser, Internet Service Provider (ISP), cap waktu (tanggal dan waktu), halaman rujukan/keluar, dan jumlah klik.</li>
          <li><strong>Cookies dan Web Beacons:</strong> Sama seperti situs web lainnya, TikDrop menggunakan "cookie" untuk menyimpan preferensi pengunjung, dan melacak halaman mana yang dikunjungi pengguna.</li>
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
    );
  }

  if (type === 'tos') {
    return language === 'en' ? (
      <div className="prose dark:prose-invert max-w-none space-y-6">
        <p>
          Welcome to TikDrop! By accessing our website, you agree to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Use of Service</h2>
        <p>
          TikDrop is an online tool that helps users download public videos from TikTok. However, our services must be used legally and ethically:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>You are prohibited from downloading strictly copyrighted videos and redistributing them for commercial purposes without direct permission from the original content owner.</li>
          <li>You may not use our service to download illegal, exploitative, harmful, or otherwise unlawful content.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Copyright and Intellectual Property</h2>
        <p>
          All videos, audio, and content downloaded through our platform belong to their respective content owners/creators on TikTok. TikDrop <strong>DOES NOT CLAIM</strong> ownership, rights, or affiliation to any content you download. Users bear all risks and responsibilities for any use of such third-party content.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Service Availability</h2>
        <p>
          Our services are provided on an "as is" and "as available" basis. We may suspend or alter any part or all of the services temporarily or permanently at any time, without prior notice. We do not warrant that this site will always be uninterrupted or error-free.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Limitation of Liability</h2>
        <p>
          TikDrop, its sub-domains, admins, and affiliates shall not be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on TikDrop's website.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Advertising</h2>
        <p>
          To maintain our website free of charge, we may display advertisements supported by Google AdSense or third parties. By continuing to use this tool, you accept the display of advertisements on our platform.
        </p>
      </div>
    ) : (
      <div className="prose dark:prose-invert max-w-none space-y-6">
        <p>
          Selamat datang di TikDrop! Dengan mengakses situs web kami, Anda setuju untuk terikat oleh Syarat dan Ketentuan Penggunaan Layanan kami, semua hukum dan peraturan yang berlaku, serta setuju bahwa Anda bertanggung jawab untuk mematuhi hukum setempat yang berlaku.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Penggunaan Layanan</h2>
        <p>
          TikDrop adalah alat daring (online tool) yang membantu pengguna mengunduh video publik dari TikTok. Namun, layanan kami harus digunakan secara sah dan sesuai etika:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Anda dilarang mengunduh video yang memiliki hak cipta ketat dan menyebarkannya kembali untuk tujuan komersial tanpa izin langsung dari pemilik konten aslinya.</li>
          <li>Anda tidak boleh menggunakan layanan kami untuk mengunduh konten ilegal, terkait eksploitasi, berbahaya, atau melanggar hukum lainnya.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Hak Cipta dan Kekayaan Intelektual</h2>
        <p>
          Semua video, audio, dan konten yang diunduh melalui platform kami adalah milik masing-masing pemilik konten/kreator di TikTok. TikDrop <strong>TIDAK MENGKLAIM</strong> kepemilikan, hak, atau afilisasi terhadap konten apa pun yang Anda unduh. Pengguna menanggung semua risiko dan tanggung jawab terhadap penggunaan apa pun atas konten pihak ketiga tersebut.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Ketersediaan Layanan</h2>
        <p>
          Layanan kami disediakan apa adanya ("as is"). Kami bisa saja menghentikan atau mengubah sebagian atau seluruh layanan sementara maupun permanen kapan saja, tanpa pemberitahuan sebelumnya. Kami tidak memberikan jaminan bahwa situs ini akan selalu tanpa jeda (gangguan) atau tanpa eror sama sekali.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Batasan Tanggung Jawab</h2>
        <p>
          TikDrop beserta sub-domain, admin, dan pihak terafiliasinya tidak akan dimintai pertanggungjawaban ganti rugi (termasuk tanpa ada batasan kerusakan untuk kehilangan data atau profit, akibat pembatasan komersial) atas kelalaian kerugian saat pemakaian situs ini. 
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Iklan</h2>
        <p>
          Untuk mempertahankan keberadaan situs web kami gratis, kami dapat menempatkan iklan yang didukung oleh Google AdSense atau pihak ketiga. Dengan melanjutkan penggunaan alat ini, Anda menerima tampilan iklan pada platform kami.
        </p>
      </div>
    );
  }

  if (type === 'disclaimer') {
    return language === 'en' ? (
      <div className="prose dark:prose-invert max-w-none space-y-6">
        <p>
          By using the TikDrop website, you read, understand, and agree to the following statement:
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Affiliation</h2>
        <p>
          This website is <strong>NOT AFFILIATED</strong> specifically, endorsed, privatized, or institutionally homed under <strong>TikTok, ByteDance</strong>, or their corporate entities. We are an independent web-based tool (Third-party) to facilitate the downloading of public-nature content based on URL links. Downloaded Names, Trademarks, and logos are entirely the copyright of TikTok and the video owners (Original Creator).
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Usage Responsibility</h2>
        <p>
          The tools we provide are presented to facilitate access for personal interests and not for commercialization purposes. You are not permitted to commercially distribute content outside of patents unless you have contacted and obtained verbal or written permission from the content owner (creator).
        </p>
        <p>
          If you violate Copyrights, you are independently responsible for such actions before the law. TikDrop strongly rejects any lawsuits that may occur in the future as a result outside our platform.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Downloaded Content</h2>
        <p>
          We do not promote, host, or provide servers to store videos or audio in our database systems regarding your history files. We stream directly (streaming logic) services from related social media servers to the user's device.
        </p>

        <p className="mt-8 italic text-muted-foreground">
          This disclaimer was last updated at the time of initial website compilation. If there are improvements in the future, we are not obligated to send notifications.
        </p>
      </div>
    ) : (
      <div className="prose dark:prose-invert max-w-none space-y-6">
        <p>
          Dengan menggunakan situs TikDrop, Anda membaca, mengerti, dan menyetujui pernyataan berikut:
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
          Jika Anda melanggar Hak Cipta, Anda bertanggung jawab secara mandiri atas perbuatan tersebut di muka hukum. TikDrop menolak keras segala tuntutan yang mungkin terjadi di masa mendatang sebagai akibat di luar platform kami.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Konten yang Diunduh</h2>
        <p>
          Kami tidak mempromosikan, meng-host, atau menyediakan server untuk menyimpan video maupun audio di sistem database kami terkait file riwayat Anda. Kami mengalirkan secara langsung (streaming logic) layanan dari server media sosial terkait ke perangkat pengguna.
        </p>

        <p className="mt-8 italic text-muted-foreground">
          Sangkalan ini terakhir kali diperbarui pada waktu penyusunan awal situs, apabila terdapat perbaikan pada masa mendatang kami tidak berkewajiban mengirimkan pemberitahuan.
        </p>
      </div>
    );
  }

  if (type === 'contact') {
    return language === 'en' ? (
      <div className="prose dark:prose-invert max-w-none space-y-6">
        <p className="text-lg">
          Have questions, feedback, license omission complaints, or just want to say hi to the platform's devs? We are always open to criticism to develop this site for the better in the future.
        </p>

        <div className="bg-card border rounded-xl p-8 mt-8 flex flex-col items-center justify-center space-y-4">
          <div className="bg-primary/10 p-4 rounded-full">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-semibold m-0">Send an Email</h2>
          <p className="text-center text-muted-foreground m-0">
            Please send an electronic message to the address below. We will try to respond within 2x24 business hours.
          </p>
          <a href={`mailto:${process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@tikdrop.id'}`} className="text-2xl font-bold text-primary hover:underline m-0">
            {process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@tikdrop.id'}
          </a>
        </div>

        <div className="mt-12 text-sm text-muted-foreground">
          <p><strong>Note for Advertisers/Corporate:</strong> If you are interested in placing Custom Banner Ads, please use the Subject format: <code>[AD] - Your Company Name</code> so that the email does not go to the SPAM folder.</p>
        </div>
      </div>
    ) : (
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
          <a href={`mailto:${process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@tikdrop.id'}`} className="text-2xl font-bold text-primary hover:underline m-0">
            {process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@tikdrop.id'}
          </a>
        </div>

        <div className="mt-12 text-sm text-muted-foreground">
          <p><strong>Catatan untuk Pengiklan/Corporate:</strong> Jika Anda tertarik untuk memasang Iklan Banner Kustom, silakan gunakan format Subjek: <code>[IKLAN] - Nama Perusahaan Anda</code> agar email tidak masuk ke folder SPAM.</p>
        </div>
      </div>
    );
  }

  return null;
}
