import React from 'react'
import HeadPage from '../components/HeadPage'
import { Container } from 'react-bootstrap'

export default function Index() {
  return (
    <div className="main-layout">

      <HeadPage title="Tentang Kami" />

      <Container className="mt-3 text-center">

        <h1>Tentang Kami</h1>

        <p>Kami bangga membangun aplikasi Tantekos dengan memberikan layanan Gratis bagi setiap pengunjung. Layanan ini disediakan tanpa biaya dan dimaksudkan untuk digunakan sebagaimana adanya. Kami menyediakan informasi hunian kost dan kontrakan.</p>
        <p>Konten yang kami bagikan berasal dari partisipasi anggota grup yang telah tersaring. Perkenankan kami menyampaikan terima kasih atas dukungan dan partisipasi dari semua anggota grup.</p>

      </Container>

    </div>
  )
}