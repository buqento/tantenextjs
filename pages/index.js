import React from 'react'
import Layout from '../components/Layout'
import Kos from './kos'
import Header from '../components/Header'
import Area from '../components/Area'

export default function Index() {
  return (
    <Layout>
      <Header />
      <Area />
      <Kos />
    </Layout>
  )
}