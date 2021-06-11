import React from 'react'
import Header from '../components/Header'
import Campus from '../components/Campus'
import GroupSocial from '../components/GroupSocial'
import FeedsGrid from '../components/FeedsGrid'
import fire from '../configurations/firebase'
import Ads from '../components/Ads'
import NavComponent from '../components/NavComponent'
import Footer from '../components/Footer'
import NavMobile from '../components/NavMobile'
import Link from 'next/link'
import CampaignItemSkeleton from '../components/CampaignItemSkeleton'
import AdSense from 'react-adsense'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: null, load: true }
  }
  componentDidMount() {
    const dt = fire.firestore().collection('kosts')
    dt.where('is_active', '==', true)
      .orderBy('date_modified', 'desc')
      .limit(10)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id, ...doc.data()
        }))
        this.setState({ data, load: false })
      })
  }
  render() {
    const { data, load } = this.state
    const info = {
      title: 'Kost Murah Sewa Harian Bulanan Tahunan',
      description: 'Cari Kost Dan Kontrakan Harian Bulanan Tahunan Murah Terjangkau Nyaman Strategis',
      url: ''
    }
    return (
      <div>
        <NavComponent />
        <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-4">

          {/* col1 */}
          <div>
            <Header info={info} />
            <div className="mt-2">
              {load && <CampaignItemSkeleton />}
              {!load && data && <FeedsGrid data={data} />}
            </div>
          </div>

          {/* col2 */}
          <div>
            <div className="xs:mx-3 my-3">
              {/* vertical ads */}
              <AdSense.Google
                client='ca-pub-1434074630735871'
                slot='3178716891'
                className="w-full"
                format='auto'
              />
            </div>
            <div className="lg:mt-4"><Ads /></div>
            <div className="mt-3 py-2 px-3 bg-white z-10">
              <span className="text-uppercase text-current font-bold">Dekat Kampus</span>
            </div>
            <div className="border-bottom">
              <Campus />
              <Link href="/area/kampus">
                <div className="align-middle text-center text-indigo-700 font-bold uppercase mb-3 mt-2 py-2 mx-3 cursor-pointer underline">
                  <span>Kampus Lainnya</span>
                </div>
              </Link>
            </div>
            <div className="m-3 mb-n3">
              <span className="text-uppercase text-current font-bold">Grup Facebook</span>
            </div>
            <GroupSocial />
          </div>
        </div>
        <Footer />
        <div className="xs:block sm:hidden md:hidden lg:hidden">
          <NavMobile />
        </div>
      </div>
    )
  }
}
export default Index