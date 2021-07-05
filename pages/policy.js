import React from 'react'
import NavComponent from '../components/NavComponent'
import NavMobile from '../components/NavMobile'
import Footer from '../components/Footer'
import Header from '../components/Header'
export default function Index() {
  const seo = {
    title: 'Policy',
    description: 'Kost bebas, kost campur, kost putra, kost putri, kost pasutri terdekat di sekitar lokasi Kamu.',
    url: 'policy'
  }
  return (
    <>
      <Header seo={seo} />
      <NavComponent />
      <div className="my-3 mx-3 text-center leading-relaxed">
        <h1 className="text-2xl py-3">Kebijakan Privasi</h1>
        <p>Layanan ini disediakan tanpa biaya dan dimaksudkan untuk digunakan sebagaimana adanya.</p>
        <p>Halaman ini digunakan untuk memberi tahu Kamu mengenai kebijakan Kami dengan pengumpulan, penggunaan, dan pengungkapan Informasi Pribadi jika Kamu yang memutuskan untuk menggunakan Layanan Kami.</p>
        <p>Jika Kamu memilih untuk menggunakan Layanan Kami, maka Kamu menyetujui pengumpulan dan penggunaan informasi sehubungan dengan kebijakan ini. Informasi Pribadi yang Kami kumpulkan digunakan untuk menyediakan dan meningkatkan Layanan. Kami tidak akan menggunakan atau membagikan informasi Kamu dengan siapa pun kecuali seperti yang dijelaskan dalam Kebijakan Privasi ini.</p>
        <p>Istilah yang digunakan dalam Kebijakan Privasi ini memiliki arti yang sama seperti dalam Syarat dan Ketentuan Kami, yang dapat diakses di Tantekos kecuali ditentukan lain dalam Kebijakan Privasi ini.</p>
        <p className="mt-3 font-bold">Perlindungan Data</p>
        <p>Tantekos menggunakan SSL (Secure Socket Layer) untuk melindungi data. Adapun penyimpanan data juga Kami lakukan di pusat data yang terpisah-pisah dan selalu diduplikasi untuk keamanan.</p>
        <p className="mt-3 font-bold">Pembaruan Kebijakan Privasi</p>
        <p>Kami dapat memperbarui Kebijakan Privasi Kami dari waktu ke waktu. Dengan demikian, Kamu disarankan untuk meninjau halaman ini secara berkala untuk setiap perubahan. Kami akan memberi tahu Kamu tentang perubahan apapun dengan memposting Kebijakan Privasi baru di halaman ini. Perubahan ini efektif segera setelah diposting di halaman ini.</p>
        <p className="mt-3 font-bold">Hubungi Kami</p>
        <p>Jika Kamu memiliki pertanyaan atau saran tentang Kebijakan Privasi Kami, jangan ragu untuk menghubungi Kami melalui layanan <a href="contact" className="text-indigo-700">kontak Kami</a>.</p>
        <p className="my-3 pt-2 font-bold border-t-2">Tantekos</p>
      </div>
      <Footer />
      <NavMobile />
    </>
  )
}