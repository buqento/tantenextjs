import React from 'react'
import NextHead from 'next/head'
import { FaFacebook, FaWhatsapp, FaTelegram } from 'react-icons/fa'
import NavComponent from '../components/NavComponent'
import Footer from '../components/Footer'
import NavMobile from '../components/NavMobile'
export default function Index() {
  return (
    <>
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
      <NavComponent />
      <div className="container text-center leading-relaxed">
        <h1 className="text-2xl py-3">Kontak Kami</h1>
        <p>Jika Anda memiliki pertanyaan atau saran untuk pengembangan layanan Tantekos, jangan ragu untuk menghubungi kami melalui:</p>
        <div className="mt-3">
          <a href="https://wa.me/6287855133758?text=Hai%20Tantekos,%20Saya%20tertarik%20dengan%20kost%20yang%ada%20di%20website." target="blank">
            <span className="border rounded-full py-1 px-2 mr-1 text-green-600">
              <FaWhatsapp className="inline mr-1 mb-1" />
            WhatsApp
          </span>
          </a>
          <a href="https://facebook.com/tantekos" target="blank">
            <span className="border rounded-full py-1 px-2 mr-1 text-blue-700">
              <FaFacebook className="inline mr-1 mb-1" />Facebook
          </span>
          </a>
          <a href="https://t.me/tantekos" target="blank" style={{ whiteSpace: 'nowrap' }}>
            <span className="border rounded-full py-1 px-2 mr-1 text-blue-400">
              <FaTelegram className="inline mr-1 mb-1" />Telegram
          </span>
          </a>
        </div>
      </div>
      <Footer />
      <div className="xs:block sm:hidden md:hidden lg:hidden">
        <NavMobile />
      </div>
    </>
  )
}