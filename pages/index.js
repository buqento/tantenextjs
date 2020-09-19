import React from 'react'
import Layout from '../components/Layout'
import Kos from './kos'
import Header from '../components/Header'

export default function Index() {
  return (
    <Layout>
      <Header />
      <Kos />
    </Layout>
  )
}