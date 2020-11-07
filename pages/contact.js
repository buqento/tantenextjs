import React from 'react'
import HeadPage from '../components/HeadPage'
export default function Index() {
  return (
    <div className="main-layout">
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