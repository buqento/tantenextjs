import React from 'react'
import HeadPage from '../components/HeadPage'
export default function Index() {
  return (
    <div className="main-layout">
      <HeadPage title="Tentang Kami" />
      <div className="container text-center leading-relaxed">
        <h1 className="text-2xl py-3">Tentang Kami</h1>
        <p>Kami bangga membangun aplikasi Tantekos dengan memberikan layanan Gratis bagi setiap pengunjung. Layanan ini disediakan tanpa biaya dan dimaksudkan untuk digunakan sebagaimana adanya. Kami menyediakan informasi hunian kost dan kontrakan.</p>
        <p>Konten yang kami bagikan berasal dari partisipasi anggota grup yang telah tersaring. Perkenankan kami menyampaikan terima kasih atas dukungan dan partisipasi dari semua anggota grup.</p>
      </div>
    </div>
  )
}