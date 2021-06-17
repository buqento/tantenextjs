import React from 'react'
import Header from '../components/Header'
import Campus from '../components/Campus'
import GroupSocial from '../components/GroupSocial'
import FeedsGrid from '../components/FeedsGrid'
import fire from '../configurations/firebase'
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
    if (typeof window === 'object') {
      var input = document.getElementsByName('search');
      for (var i = 0; i < input.length; i++) {
        input[i].style.backgroundImage = '';
      }
    }
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

            <div className="mt-2 mb-3 pb-3  xs:border-b">
              {load && <CampaignItemSkeleton />}
              {!load && data && <FeedsGrid data={data} />}
            </div>
          </div>

          {/* col2 */}
          <div>

            {/* popular cities */}
            <div className="lg:mt-3 mb-3 px-3">
              <span className="text-uppercase text-current font-bold">Popular Cities</span>
            </div>
            <div className="border-b pb-3 mb-4">
              <ComponentCities />
            </div>

            {/* near campus */}
            <div className="mt-4 py-2 px-3">
              <span className="text-uppercase text-current font-bold">Near Campus</span>
            </div>
            <div className="border-b">
              <Campus />
              <Link href="/area/kampus">
                <div className="align-middle text-center text-indigo-700 font-bold uppercase mb-3 mt-2 py-2 mx-3 cursor-pointer underline">
                  <span>View More Campus</span>
                </div>
              </Link>
            </div>

            {/* facebook group */}
            <div className="m-3 mt-4 mb-n3">
              <span className="text-uppercase text-current font-bold">Facebook Group</span>
            </div>
            <div>
              <GroupSocial />
            </div>

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