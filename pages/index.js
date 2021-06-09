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
import Geocoder from 'react-mapbox-gl-geocoder'
import Message from '../components/Message'
import CampaignItemSkeleton from '../components/CampaignItemSkeleton'

const mapboxApiKey = 'pk.eyJ1IjoiYnVxZW50byIsImEiOiJjanJ5a3p4cDkwZXJiNDlvYXMxcnhud3hhIn0.AhQ-vGYSIo6uTBmQD4MCsA'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      titleHead: null,
      load: true,
      listResult: null,
      placeName: null,
      viewport: {
        latitude: -6.177167845630349,
        longitude: 106.82731084626721
      }
    }
  }
  componentDidMount() {
    document.getElementsByTagName("input")[0].setAttribute("placeholder", "Masukan nama lokasi/area/alamat");
    const dt = fire.firestore().collection('kosts')
    dt.where('is_active', '==', true)
      .orderBy('date_modified', 'desc')
      .limit(10)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        this.setState({ data, listResult: data, load: false })
      })
  }
  getDistance = (lat1, lon1, lat2, lon2, unit) => {
    var radlat1 = Math.PI * lat1 / 180
    var radlat2 = Math.PI * lat2 / 180
    var theta = lon1 - lon2
    var radtheta = Math.PI * theta / 180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    if (dist > 1) dist = 1
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    if (unit == "K") dist = dist * 1.609344
    if (unit == "N") dist = dist * 0.8684
    return dist
  }

  onSelected = (viewport, item) => {
    const { data } = this.state
    const latitude = viewport.latitude
    const longitude = viewport.longitude
    let nearList = []
    let nearItem = {}
    for (var i = 0; i < data.length; i++) {
      const d = this.getDistance(latitude, longitude, data[i].location.lat_lng.w_, data[i].location.lat_lng.T_, "K")
      nearItem = {
        distance: (d).toFixed(1),
        category: data[i].category,
        date_modified: data[i].date_modified,
        facility: data[i].facility,
        images: data[i].images,
        location: data[i].location,
        name: data[i].name,
        price: data[i].price,
        slug: data[i].slug,
        title: data[i].title,
        type: data[i].type,
        hit: data[i].hit
      }
      if (d <= 3) nearList.push(nearItem)
    }
    this.setState({ listResult: nearList, placeName: item.place_name })
  }
  render() {
    const { viewport, listResult, placeName } = this.state
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
            <div className="my-3">
              <Geocoder
                className="border text-lg mx-3 my-3"
                mapboxApiAccessToken={mapboxApiKey}
                onSelected={this.onSelected}
                viewport={viewport}
                hideOnSelect={true}
                queryParams={{ country: "id" }}
                updateInputOnSelect
              />
            </div>
            <div>
              {!listResult && <CampaignItemSkeleton />}
              {listResult && listResult.length > 0 && <FeedsGrid data={listResult} />}
              {listResult && listResult.length === 0 &&
                <Message title="Tidak Ditemukan" message={`Tidak ditemukan kost area ${placeName}. Silahkan cari di area lainnya`} />
              }
            </div>
          </div>
          {/* col2 */}
          <div>
            <div><Ads /></div>
            <div className="py-2 px-3 bg-white z-10">
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