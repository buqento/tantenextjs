import React from 'react'
import Header from '../components/Header'
import Campus from '../components/Campus'
import GroupSocial from '../components/GroupSocial'
import FeedsGrid from '../components/FeedsGrid'
import fire from '../configurations/firebase'
import NavComponent from '../components/NavComponent'
import Ads from '../components/Ads'
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
    const kostsRef = fire.firestore().collection('kosts')
    kostsRef.where('is_active', '==', true)
      .orderBy('date_published', 'desc')
      .limit(7)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id, ...doc.data()
        }))
        this.setState({ data, load: false })
      })
  }
  render() {
    const { data, load } = this.state
    const dataFeed = data && data.filter(item => item.user.email === process.env.NEXT_PUBLIC_REACT_APP_EMAIL)
    const dataSponsored = data && data.filter(item => item.user.email !== process.env.NEXT_PUBLIC_REACT_APP_EMAIL)
    if (typeof window === 'object') {
      var input = document.getElementsByName('search');
      for (var i = 0; i < input.length; i++) {
        input[i].style.backgroundImage = '';
      }
    }
    const info = {
      title: 'Infokost kost murah kost eksklusif kost mewah kost bebas',
      description: 'Informasi kost dekat kampus. Kost putri, kost putra, kost pasutri, kost campur. Kost harian, kost bulanan, kost mingguan, dan kost tahunan. Kost murah, kost eksklusif, dan kost bebas. Kost di Jogja, Makassar, Jakarta, Medan, Bandung, Malang, Surabaya, Manado, Denpasar, dan Palembang.',
      url: ''
    }
    return (
      <div>
        <Header info={info} />

        <NavComponent />

        <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-4">

          <div>
            <div className="mx-3 my-3">
              <div class="gcse-search" />
            </div>
            <div className="mt-2 mb-3 pb-3  xs:border-b">
              {load && <CampaignItemSkeleton />}
              <div>
                <div className="lg:mt-3 mb-3 px-3 text-uppercase text-current font-bold">Sponsored</div>
                {!load && data && <FeedsGrid data={dataSponsored} />}
                <div className="mx-3 my-2"><Ads /></div>
              </div>
              <div>
                <div className="mt-5 mb-3 px-3 text-uppercase text-current font-bold">New Feed</div>
                {!load && data && <FeedsGrid data={dataFeed} />}
                <Link href="/location">
                  <div className="cursor-pointer align-middle text-center text-indigo-700 font-bold uppercase underline py-3 mx-3">View More Rooms</div>
                </Link>
              </div>
            </div>
          </div>

          <div>
            <div className="lg:mt-3 mb-3 px-3">
              <span className="text-uppercase text-current font-bold">Popular Cities</span>
            </div>
            <div className="border-b pb-3 mb-4">
              <ComponentCities />
            </div>
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