import React from 'react'
import { string } from 'prop-types'
import Header from '../components/Header'
import Campus from '../components/Campus'
import FeedsGrid from '../components/FeedsGrid'
import fire from '../configurations/firebase'
import NavComponent from '../components/NavComponent'
import Footer from '../components/Footer'
import NavMobile from '../components/NavMobile'
import Link from 'next/link'
import ComponentCities from '../components/Cities'
class Index extends React.Component {
  render() {
    const { kosts } = this.props
    const data = JSON.parse(kosts)
    const seo = {
      title: 'Infokost kost murah kost eksklusif kost mewah kost bebas',
      description: 'Infokost kost dekat kampus. Kost putri, kost putra, kost pasutri, kost campur. Kost harian, kost bulanan, kost mingguan, dan kost tahunan. Kost murah, kost eksklusif, dan kost bebas. Kost di Jogja, Makassar, Jakarta, Medan, Bandung, Malang, Surabaya, Manado, Denpasar, dan Palembang.',
      url: ''
    }
    return (
      <>
        <Header seo={seo} />
        <NavComponent />
        <div>
          <div className="lg:mx-3 grid sm:grid-cols-2 md:grid-cols-2 gap-4">

            <div>
              <div className="mt-3 mb-3 pb-3 xs:border-b">
                <h1 className="mx-2 text-2xl text-uppercase text-current font-bold">New Feed</h1>
                <FeedsGrid data={data} />
                <Link href="/location">
                  <div className="cursor-pointer align-middle text-center text-indigo-700 font-bold uppercase underline py-3 mx-3">View More</div>
                </Link>
              </div>
            </div>

            <div>
              <div className="xs:mx-2">
                <h2 className="lg:mt-4 md:mt-4 sm:mt-4 mb-3 text-2xl text-uppercase text-current font-bold">Near Campus</h2>
                <div>
                  <Campus />
                  <Link href="/area/kampus">
                    <div className="align-middle text-center text-indigo-700 font-bold uppercase my-3 py-2 cursor-pointer underline">
                      <span>View More</span>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="border-b" />
              <div className="xs:mx-2">
                <h2 className="mt-3 py-3 text-2xl text-uppercase text-current font-bold">Popular Cities</h2>
                <div>
                  <ComponentCities />
                  <Link href="/area/kota/all">
                    <div className="cursor-pointer align-middle text-center text-indigo-700 font-bold uppercase underline py-3">View More</div>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
        <Footer />
        <NavMobile />
      </>
    )
  }
}
export const getServerSideProps = async () => {
  let kosts = []
  const querySnapshot = await fire.firestore().collection('kosts')
    .where('is_active', '==', true)
    .orderBy('date_published', 'desc')
    .limit(5)
    .get()
  querySnapshot.forEach(doc => {
    kosts.push({
      id: doc.id,
      ...doc.data()
    })
  })
  return {
    props: {
      kosts: JSON.stringify(kosts)
    }
  }
}
Index.propTypes = { kosts: string }
Index.defaultProps = { kosts: null }
export default Index