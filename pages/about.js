import React from 'react'
import HeadPage from '../components/HeadPage'
import { Container } from 'react-bootstrap'

export default function Index() {
  return (
    <div className="main-layout">

      <HeadPage title="Tentang Kami" />

      <Container className="mt-3">

        <h1>Tentang Kami</h1>

        <p>Kami bangga membangun aplikasi Tantekos sebagai aplikasi Gratis. Layanan ini disediakan tanpa biaya dan dimaksudkan untuk digunakan sebagaimana adanya. Kami menyediakan informasi Kamar Kost, Rumah Kontrakan.</p>

      </Container>

    </div>
  )
}