import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Provinsi from '../components/Provinsi'
import Campaign from '../components/Campaign'
import GroupSocial from '../components/GroupSocial'
export default function Index() {
  return (
    <Layout>
      <Header />
      <div className="m-3 mb-n2">
        <span className="text-uppercase text-current font-bold">Area Kost &amp; Kontrakan</span>
        <span className="float-right text-indigo-700"><a href="/area/provinsi/all">Lihat Semua</a></span>
      </div>
      <div className="border-b-8 border-gray-200">
        <Provinsi />
      </div>
      <div className="m-3 mb-n2">
        <span className="text-uppercase text-current font-bold">Kost</span>
        <span className="float-right text-indigo-700"><a href="/search/category/Kost">Lihat Semua</a></span>
      </div>
      <div className="border-b-8 border-gray-200">
        <Campaign filter="Kost" />
      </div>
      <div className="m-3 mb-n2">
        <span className="text-uppercase text-current font-bold">Kontrakan</span>
        <span className="float-right text-indigo-700"><a href="/search/category/Kontrakan">Lihat Semua</a></span>
      </div>
      <div className="border-b-8 border-gray-200">
        <Campaign filter="Kontrakan" />
      </div>
      <div className="m-3 mb-n2">
        <span className="text-uppercase text-current font-bold">Grup Facebook</span>
      </div>
      <GroupSocial />
    </Layout>
  )
}