import React from 'react'
import Layout from '../components/Layout'
import Kos from './kos'
import Header from '../components/Header'
import Area from '../components/Area'
import CategoryPrice from '../components/CategoryPrice'

export default function Index() {
  return (
    <Layout>
      <Header />
      <div className="m-3 mb-n2">
        <span className="text-uppercase font-weight-bold">Harga mulai</span>
      </div>
      <CategoryPrice />
      <div className="m-3 mb-n2">
        <span className="text-uppercase font-weight-bold">Area</span>
        <span className="float-right"><a href="/area">Lihat Semua</a></span>
      </div>
      <Area />
      <Kos />
    </Layout>
  )
}