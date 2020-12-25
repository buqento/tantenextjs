import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Provinsi from '../components/Provinsi'
import Campus from '../components/Campus'
import GroupSocial from '../components/GroupSocial'
import { BiChevronRight } from "react-icons/bi"
import FeedsGrid from '../components/FeedsGrid'

export default function Index() {
  return (
    <Layout>
      <Header />
      <div className="border-bottom">
        <Provinsi />
        <a href="area/provinsi/all">
          <div className="rounded-xl align-middle border rouded text-center text-indigo-700 uppercase mb-3 py-2 mx-3">Lihat Semua</div>
        </a>
      </div>
      <div className="sticky top-0 py-3 px-3 bg-white">
        <span className="text-uppercase text-current font-bold">Terbaru</span>
      </div>
      <div className="border-bottom">
        <FeedsGrid />
        <a href="/search">
          <div className="rounded-xl align-middle border rouded text-center text-indigo-700 uppercase mb-3 py-2 mx-3">Lihat Semua</div>
        </a>
      </div>
      <div className="sticky top-0 py-3 px-3 bg-white">
        <span className="text-uppercase text-current font-bold">Dekat Kampus</span>
      </div>
      <div className="border-bottom">
        <Campus />
        <a href="/area/kampus">
          <div className="rounded-xl align-middle border rouded text-center text-indigo-700 uppercase my-3 py-2 mx-3">Lihat Semua</div>
        </a>
      </div>
      <div className="m-3 mb-n2">
        <span className="text-uppercase text-current font-bold">Grup Facebook</span>
      </div>
      <GroupSocial />
    </Layout>
  )
}