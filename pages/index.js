import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Provinsi from '../components/Provinsi'
import Campaign from '../components/Campaign'
import GroupSocial from '../components/GroupSocial'
import { AiOutlineArrowRight } from 'react-icons/ai'
export default function Index() {
  return (
    <Layout>
      <Header />
      <div className="border-b-8 border-gray-200">
        <Provinsi />
      </div>
      <div className="m-3 mb-n2">
        <span className="text-uppercase text-current font-bold">Kost</span>
        <span className="float-right text-indigo-700"><a href="/search/category/kost">Lihat Semua<AiOutlineArrowRight className="inline ml-1 mb-1" /></a></span>
      </div>
      <div className="border-b-8 border-gray-200">
        <Campaign filter="Kost" />
      </div>
      <div className="m-3 mb-n2">
        <span className="text-uppercase text-current font-bold">Kontrakan</span>
        <span className="float-right text-indigo-700"><a href="/search/category/kontrakan">Lihat Semua<AiOutlineArrowRight className="inline ml-1 mb-1" /></a></span>
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