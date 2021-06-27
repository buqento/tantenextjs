import React from 'react'
import { FaFacebook, FaWhatsapp, FaTelegram } from 'react-icons/fa'
import NavComponent from '../components/NavComponent'
import Footer from '../components/Footer'
import NavMobile from '../components/NavMobile'
import Link from 'next/link'
import Header from '../components/Header'
export default function Index() {
  const seo = {
    title: 'Contact',
    description: 'Kost bebas, kost campur, kost putra, kost putri, kost pasutri terdekat di sekitar lokasi Kamu.',
    url: 'contact'
  }
  return (
    <>
      <Header seo={seo} />
      <NavComponent />
      <div className="my-3 mx-3 text-center leading-relaxed">
        <h1 className="text-2xl py-3">Kontak Kami</h1>
        <p>Jika Anda memiliki pertanyaan atau saran untuk pengembangan layanan Tantekos, jangan ragu untuk menghubungi kami melalui:</p>
        <div className="mt-3">
          <Link href="https://wa.me/6287855133758?text=Hai%20Tantekos,%20Saya%20tertarik%20dengan%20kost%20yang%ada%20di%20website." target="blank">
            <span className="border rounded-full py-1 px-2 mr-1 text-green-600">
              <FaWhatsapp className="inline mr-1 mb-1" />
            WhatsApp
          </span>
          </Link>
          <Link href="https://facebook.com/tantekos" target="blank">
            <span className="border rounded-full py-1 px-2 mr-1 text-blue-700">
              <FaFacebook className="inline mr-1 mb-1" />Facebook
          </span>
          </Link>
          <Link href="https://t.me/tantekos" target="blank" style={{ whiteSpace: 'nowrap' }}>
            <span className="border rounded-full py-1 px-2 mr-1 text-blue-400">
              <FaTelegram className="inline mr-1 mb-1" />Telegram
          </span>
          </Link>
        </div>
      </div>
      <Footer />
      <div className="xs:block sm:hidden md:hidden lg:hidden">
        <NavMobile />
      </div>
    </>
  )
}