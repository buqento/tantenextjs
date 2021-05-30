import React from 'react'
import NextHead from 'next/head'
import NavComponent from '../components/NavComponent'
import NavMobile from '../components/NavMobile'
import Footer from '../components/Footer'
export default function Index() {
  return (
    <>
      <NextHead>
        <title>Kebijakan Privasi - Cari Kost Dan Kontrakan Harian Bulanan Tahunan Murah Terjangkau Nyaman Strategis</title>
        <meta name="description" content="Tersedia Kost Dan Kontrakan Harian Bulanan Tahunan Murah Terjangkau Nyaman Strategis Di Sekitar Kamu" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="googlebot" content="index, follow" />
        <meta name="robot" content="index, follow" />
        <meta name="google-site-verification" content="d4hZLuJTDPSEs-Qw_uX4iUpgdeB1P5ltZP9jsXPQ2ew" />
        <meta name="application-name" content="Tantekos" />
        <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
        <meta name="keywords" content="Tantekos, Info Kost, Cari Kost, Kost, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
      </NextHead>
      <NavComponent />
      <div className="container text-center leading-relaxed">
        <h1 className="text-2xl py-3">Kebijakan Privasi</h1>
        <p>Kami bangga membangun aplikasi Tantekos. Layanan ini disediakan tanpa biaya dan dimaksudkan untuk digunakan sebagaimana adanya.</p>
        <p>Halaman ini digunakan untuk memberi tahu Kamu mengenai kebijakan Kami dengan pengumpulan, penggunaan, dan pengungkapan Informasi Pribadi jika Kamu yang memutuskan untuk menggunakan Layanan Kami.</p>
        <p>Jika Kamu memilih untuk menggunakan Layanan Kami, maka Kamu menyetujui pengumpulan dan penggunaan informasi sehubungan dengan kebijakan ini. Informasi Pribadi yang Kami kumpulkan digunakan untuk menyediakan dan meningkatkan Layanan. Kami tidak akan menggunakan atau membagikan informasi Kamu dengan siapa pun kecuali seperti yang dijelaskan dalam Kebijakan Privasi ini.</p>
        <p>Istilah yang digunakan dalam Kebijakan Privasi ini memiliki arti yang sama seperti dalam Syarat dan Ketentuan Kami, yang dapat diakses di Tantekos kecuali ditentukan lain dalam Kebijakan Privasi ini.</p>
        <p className="mt-3 font-bold">Perlindungan Data</p>
        <p>Tantekos menggunakan SSL (Secure Socket Layer) untuk melindungi data. Adapun penyimpanan data juga Kami lakukan di pusat data yang terpisah-pisah dan selalu diduplikasi untuk keamanan.</p>
        <p className="mt-3 font-bold">Pembaruan Kebijakan Privasi</p>
        <p>Kami dapat memperbarui Kebijakan Privasi Kami dari waktu ke waktu. Dengan demikian, Kamu disarankan untuk meninjau halaman ini secara berkala untuk setiap perubahan. Kami akan memberi tahu Kamu tentang perubahan apapun dengan memposting Kebijakan Privasi baru di halaman ini. Perubahan ini efektif segera setelah diposting di halaman ini.</p>
        <p className="mt-3 font-bold">Hubungi Kami</p>
        <p>Jika Kamu memiliki pertanyaan atau saran tentang Kebijakan Privasi Kami, jangan ragu untuk menghubungi Kami melalui layanan <a href="contact" className="text-indigo-700">kontak Kami</a>.</p>
        <p className="my-3 pt-2 font-bold border-t-2">Tantekos</p>
      </div>
      <Footer />
      <div className="xs:block sm:hidden md:hidden lg:hidden">
        <NavMobile />
      </div>
    </>
  )
}