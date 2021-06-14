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
import ComponentCities from '../components/Cities'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: null, load: true }
  }
  componentDidMount() {
    const dt = fire.firestore().collection('kosts')
    dt.where('is_active', '==', true)
      .orderBy('date_modified', 'desc')
      .limit(6)
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
        <Header info={info} />
        <NavComponent />
        <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-4">

          {/* col1 */}
          <div>

            {/* search by google */}
            <div className="mx-3 my-3">
              <div class="gcse-search" />
            </div>

            <div className="mt-2">
              {load && <CampaignItemSkeleton />}
              {!load && data && <FeedsGrid data={data} />}
            </div>
          </div>

          {/* col2 */}
          <div>
            {/* ads */}
            <div className="lg:mt-4"><Ads /></div>

            {/* popular cities */}
            <div className="mt-3 py-2 px-3 bg-white z-10">
              <span className="text-uppercase text-current font-bold">Popular Cities</span>
            </div>
            <div className="border-bottom mb-4">
              <ComponentCities />
            </div>

            {/* facebook group */}
            <div className="m-3 mb-n3">
              <span className="text-uppercase text-current font-bold">Facebook Group</span>
            </div>
            <div className="border-bottom">
              <GroupSocial />
            </div>

            {/* near campus */}
            <div className="mt-3 py-2 px-3 bg-white z-10">
              <span className="text-uppercase text-current font-bold">Near Campus</span>
            </div>
            <div>
              <Campus />
              <Link href="/area/kampus">
                <div className="align-middle text-center text-indigo-700 font-bold uppercase mb-3 mt-2 py-2 mx-3 cursor-pointer underline">
                  <span>View More Campus</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="mb-85"><Footer /></div>
        <div className="xs:block sm:hidden md:hidden lg:hidden">
          <NavMobile />
        </div>
      </div>
    )
  }
}
export default Index