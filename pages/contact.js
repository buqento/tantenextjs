import React from 'react'
import { FaFacebook, FaWhatsapp, FaTelegram } from 'react-icons/fa'
import NavComponent from '../components/NavComponent'
import Footer from '../components/Footer'
import NavMobile from '../components/NavMobile'
import Link from 'next/link'
import Header from '../components/Header'
import Image from 'next/image'
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
      <div className="unset-img full-bleed">
                        <Image
                            className="custom-img"
                            // src={`https://cdn.statically.io/img/i.imgur.com/${item.images[0]}`}
                            src="https://images.unsplash.com/photo-1494587351196-bbf5f29cff42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1651&q=80"
                            // width={1920}
                            // height={1024}
                            layout="fill"
                        />
                    </div>
      <div className="my-3 mx-3 text-center leading-relaxed">
        <h1 className="text-2xl pb-3">Kontak Kami</h1>
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
      <NavMobile />
    </>
  )
}