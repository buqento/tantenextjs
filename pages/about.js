import React from 'react'
import HeadPage from '../components/HeadPage'
import NextHead from 'next/head'
export default function Index() {
  return (
    <div className="main-layout">
      <NextHead>
        <title>Tentang Kami - Cari Kost Dan Kontrakan Harian Bulanan Tahunan Murah Terjangkau Nyaman Strategis</title>
        <meta name="description" content="Tersedia Kost Dan Kontrakan Harian Bulanan Tahunan Murah Terjangkau Nyaman Strategis Di Sekitar Anda" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="googlebot" content="index, follow" />
        <meta name="robot" content="index, follow" />
        <meta name="google-site-verification" content="d4hZLuJTDPSEs-Qw_uX4iUpgdeB1P5ltZP9jsXPQ2ew" />
        <meta name="application-name" content="Tantekos" />
        <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
        <meta name="keywords" content="Tantekos, Info Kost, Cari Kost, Kost, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
      </NextHead>
      <HeadPage title="Tentang Kami" />
      <div className="container text-center leading-relaxed">
        <h1 className="text-2xl py-3">Tentang Kami</h1>
        <p>Kami bangga membangun aplikasi Tantekos dengan memberikan layanan Gratis untuk Kamu. Layanan ini disediakan tanpa biaya dan dimaksudkan untuk digunakan sebagaimana adanya. Kami menyediakan informasi hunian di seluruh Indonesia.</p>
        <p>Konten yang kami bagikan berasal dari informasi yang Kami dapatkan yang telah tersaring. Perkenankan Kami menyampaikan terima kasih atas dukungan dan partisipasi menjaga layanan Tantekos tetap sehat.</p>
      </div>
    </div>
  )
}