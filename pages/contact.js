import React from 'react'
import HeadPage from '../components/HeadPage'
import { Container } from 'react-bootstrap'

export default function Index() {
  return (
    <div className="main-layout">

      <HeadPage title="Kontak Kami" />

      <Container className="mt-3">

        <h1>Kontak Kami</h1>

        <p>Jika Anda memiliki pertanyaan atau saran untuk pengembangan layanan kami, jangan ragu untuk menghubungi kami melalui layanan:</p>
        <ul>
          <li>Email: tantekos@gmail.com</li>
          <li>Telepon: +62 878-7203-3154</li>
          <li>Halaman Facebook: <a href="https://www.facebook.com/groups/tantekos" target="blank" className="mr-3">Tantekos</a></li>
          <li>Instagram: <a href="https://www.instagram.com/tantekos_official" target="blank" className="mr-3">Tantekos Official</a></li>
        </ul>

      </Container>

    </div>
  )
}