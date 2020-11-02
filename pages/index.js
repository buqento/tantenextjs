import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Provinsi from '../components/Provinsi'
import Campaign from '../components/Campaign'
import CategoryPrice from '../components/CategoryPrice'
import GroupSocial from '../components/GroupSocial'

export default function Index() {
  return (
    <Layout>
      <Header />

      <div className="m-3 mb-n2">
        <span className="text-uppercase text-secondary font-weight-bold">Harga Maksimal</span>
      </div>
      <CategoryPrice />

      <div className="m-3 mb-n2">
        <span className="text-uppercase text-secondary font-weight-bold">Area Hunian</span>
        <span className="float-right"><a href="/area">Lihat Semua</a></span>
      </div>
      <div style={{ borderBottom: '8px solid #f5f5f5' }}>
        <Provinsi />
      </div>

      <div className="m-3 mb-n2">
        <span className="text-uppercase text-secondary font-weight-bold">Kost</span>
        <span className="float-right"><a href="/search/category/Kost">Lihat Semua</a></span>
      </div>
      <div style={{ borderBottom: '8px solid #f5f5f5' }}>
        <Campaign filter="Kost" />
      </div>

      <div className="m-3 mb-n2">
        <span className="text-uppercase text-secondary font-weight-bold">Kontrakan</span>
        <span className="float-right"><a href="/search/category/Kontrakan">Lihat Semua</a></span>
      </div>
      <div style={{ borderBottom: '8px solid #f5f5f5' }}>
        <Campaign filter="Kontrakan" />
      </div>

      <div className="m-3 mb-n2">
        <span className="text-uppercase text-secondary font-weight-bold">Komunitas Facebook</span>
      </div>
      <GroupSocial />

    </Layout>
  )
}