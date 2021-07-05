import React from 'react'
import NavComponent from '../components/NavComponent'
import NavMobile from '../components/NavMobile'
import Footer from '../components/Footer'
import Header from '../components/Header'
export default function Index() {
  const seo = {
    title: 'About',
    description: 'Kost bebas, kost campur, kost putra, kost putri, kost pasutri terdekat di sekitar lokasi Kamu.',
    url: 'about'
  }
  return (
    <>
      <Header seo={seo} />
      <NavComponent />
      <div className="my-3 mx-3 pb-5 text-center leading-relaxed">
        <div style={{ textAlign: '-webkit-center' }}>
          <img src="/static/images/logo.png" width={100} height={100} alt="logo_tantekos" className="object-center justify-center" />
        </div>
        <h1 className="text-2xl py-3">Tentang Kami</h1>
        <p>Kami bangga membangun aplikasi Tantekos dengan memberikan layanan Gratis untuk Kamu. Layanan ini disediakan tanpa biaya dan dimaksudkan untuk digunakan sebagaimana adanya. Kami menyediakan informasi hunian di seluruh Indonesia.</p>
        <p>Konten yang kami bagikan berasal dari informasi yang Kami dapatkan yang telah tersaring. Perkenankan Kami menyampaikan terima kasih atas dukungan dan partisipasi menjaga layanan Tantekos tetap sehat.</p>
      </div>
      <Footer />
      <NavMobile />
    </>
  )
}