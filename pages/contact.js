import React from 'react'
import HeadPage from '../components/HeadPage'
import { Container } from 'react-bootstrap'

export default function Index() {
  return (
    <div className="main-layout">

      <HeadPage title="Kontak Kami" />

      <Container className="mt-3 text-center">

        <h1>Kontak Kami</h1>
        <p>Jika Anda memiliki pertanyaan atau saran untuk pengembangan layanan kami, jangan ragu untuk menghubungi kami melalui layanan:</p>
        <p>Email: tantekos@gmail.com</p>
        <p>Telepon: +62 878-7203-3154</p>
        <p>Halaman Facebook: <a href="https://www.facebook.com/groups/tantekos" target="blank">Tantekos</a></p>
        <p>Instagram: <a href="https://www.instagram.com/tantekos_official" target="blank">Tantekos Official</a></p>

      </Container>

    </div>
  )
}