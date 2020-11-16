import React from 'react'
import HeadPage from '../components/HeadPage'
import NextHead from 'next/head'
export default function Index() {
  return (
    <div className="main-layout">
      <NextHead>
        <title>Kontak Kami - Cari Kost Dan Kontrakan Harian Bulanan Tahunan Murah Terjangkau Nyaman Strategis</title>
        <meta name="description" content="Tersedia Kost Dan Kontrakan Harian Bulanan Tahunan Murah Terjangkau Nyaman Strategis Di Sekitar Anda" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="googlebot" content="index, follow" />
        <meta name="robot" content="index, follow" />
        <meta name="google-site-verification" content="d4hZLuJTDPSEs-Qw_uX4iUpgdeB1P5ltZP9jsXPQ2ew" />
        <meta name="application-name" content="Tantekos" />
        <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
        <meta name="keywords" content="Tantekos, Info Kost, Cari Kost, Kost, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
      </NextHead>
      <HeadPage title="Kontak Kami" />
      <div className="container text-center leading-relaxed">
        <h1 className="text-2xl py-3">Kontak Kami</h1>
        <p>Jika Anda memiliki pertanyaan atau saran untuk pengembangan layanan kami, jangan ragu untuk menghubungi kami melalui layanan kami.</p>
        <p><strong>tantekos@gmail.com</strong></p>
        <p><strong>+62 878-7203-3154</strong></p>
        <p className="text-indigo-700 font-bold">
          <a href="https://www.facebook.com/groups/tantekos" target="blank">Facebook</a> &middot; <a href="https://www.instagram.com/tantekos_official" target="blank">Instagram</a>
        </p>
      </div>
    </div>
  )
}