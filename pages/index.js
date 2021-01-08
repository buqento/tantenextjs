import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Campus from '../components/Campus'
import GroupSocial from '../components/GroupSocial'
import FeedsGrid from '../components/FeedsGrid'
export default function Index() {
  return (
    <Layout>
      <Header />
      <div className="sticky top-0 py-3 px-3 bg-white z-10">
        <span className="text-uppercase text-current font-bold mb-4">Terbaru</span>
      </div>
      <div className="border-bottom">
        <FeedsGrid />
        <a href="/search">
          <div className="rounded-full bg-indigo-700 align-middle rouded text-center text-white font-bold uppercase my-3 py-3 mx-3">
            <span>Cari Kost Lainnya</span>
          </div>
        </a>
      </div>
      <div className="sticky top-0 py-3 px-3 bg-white z-10">
        <span className="text-uppercase text-current font-bold">Dekat Kampus</span>
      </div>
      <div className="border-bottom">
        <Campus />
        <a href="/area/kampus">
          <div className="rounded-full bg-indigo-700 align-middle rouded text-center text-white font-bold uppercase my-3 py-3 mx-3">
            <span>Lihat Semua</span>
          </div>
        </a>
      </div>
      <div className="m-3 mb-n2">
        <span className="text-uppercase text-current font-bold">Grup Facebook</span>
      </div>
      <GroupSocial />
    </Layout>
  )
}