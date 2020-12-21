import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Provinsi from '../components/Provinsi'
import Campus from '../components/Campus'
import GroupSocial from '../components/GroupSocial'
import { BiChevronRight } from "react-icons/bi"
import Feeds from '../components/Feeds'

export default function Index() {
  return (
    <Layout>
      <Header />
      <div className="border-b-8 border-gray-200">
        <Provinsi />
      </div>
      <div className="m-3">
        <span className="text-uppercase text-current font-bold">Terbaru</span>
        <span className="float-right text-indigo-700"><a href="/search">Lihat Semua<BiChevronRight size={28} className="inline ml-1 mb-1" /></a></span>
      </div>
      <div className="border-b-8 border-gray-200">
        <Feeds />
      </div>
      <div className="m-3">
        <span className="text-uppercase text-current font-bold">Dekat Kampus</span>
        <span className="float-right text-indigo-700"><a href="/area/kampus">Lihat Semua<BiChevronRight size={28} className="inline ml-1 mb-1" /></a></span>
      </div>
      <div className="border-b-8 border-gray-200">
        <Campus />
      </div>
      <div className="m-3 mb-n2">
        <span className="text-uppercase text-current font-bold">Grup Facebook</span>
      </div>
      <GroupSocial />
    </Layout>
  )
}