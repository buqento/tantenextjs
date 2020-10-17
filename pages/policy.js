import React from 'react'
import HeadPage from '../components/HeadPage'
import { Container } from 'react-bootstrap'

export default function Index() {
  return (
    <div className="main-layout">

      <HeadPage title="Kebijakan Privasi" />

      <Container className="mt-3">

        <h1>Kebijakan Privasi</h1>

        <p>Kami bangga membangun aplikasi Tantekos sebagai aplikasi Gratis. Layanan ini disediakan tanpa biaya dan dimaksudkan untuk digunakan sebagaimana adanya.</p>

        <p>Halaman ini digunakan untuk memberi tahu pengunjung mengenai kebijakan kami dengan pengumpulan, penggunaan, dan pengungkapan Informasi Pribadi jika ada yang memutuskan untuk menggunakan Layanan kami.</p>

        <p>Jika Anda memilih untuk menggunakan Layanan kami, maka Anda menyetujui pengumpulan dan penggunaan informasi sehubungan dengan kebijakan ini. Informasi Pribadi yang kami kumpulkan digunakan untuk menyediakan dan meningkatkan Layanan. Kami tidak akan menggunakan atau membagikan informasi Anda dengan siapa pun kecuali seperti yang dijelaskan dalam Kebijakan Privasi ini.</p>

        <p>Istilah yang digunakan dalam Kebijakan Privasi ini memiliki arti yang sama seperti dalam Syarat dan Ketentuan kami, yang dapat diakses di Tantekos kecuali ditentukan lain dalam Kebijakan Privasi ini.</p>

        <p><strong>Perlindungan Data</strong></p>

        <p>Tantekos menggunakan SSL (Secure Socket Layer) dan sistem lainnya untuk melindungi data. Adapun penyimpanan data juga kami lakukan di pusat data yang terpisah-pisah dan selalu diduplikasi untuk keamanan.</p>

        <p><strong>Pembaruan Kebijakan Privasi</strong></p>

        <p>Kami dapat memperbarui Kebijakan Privasi kami dari waktu ke waktu. Dengan demikian, Anda disarankan untuk meninjau halaman ini secara berkala untuk setiap perubahan. Kami akan memberi tahu Anda tentang perubahan apapun dengan memposting Kebijakan Privasi baru di halaman ini. Perubahan ini efektif segera setelah diposting di halaman ini.</p>

        <p><strong>Hubungi Kami</strong></p>

        <p>Jika Anda memiliki pertanyaan atau saran tentang Kebijakan Privasi kami, jangan ragu untuk menghubungi kami melalui layanan email kami di tantekos[at]gmail.com.</p>

        <hr />
        <p>Tantekos</p>

      </Container>

    </div>
  )
}