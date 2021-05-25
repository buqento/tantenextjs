import React from 'react'
import Header from '../components/Header'
import Campus from '../components/Campus'
import Filter from '../components/Filter'
import GroupSocial from '../components/GroupSocial'
import FeedsGrid from '../components/FeedsGrid'
import fire from '../configurations/firebase'
import Ads from '../components/Ads'
import NavComponent from '../components/NavComponent'
import Footer from '../components/Footer'
import NavMobile from '../components/NavMobile'
class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      isFilter: false,
      titleHead: null,
      dataCallback: null
    }
    this.scrollToNode = this.scrollToNode.bind(this)
  }
  scrollToNode(node) { node.scrollIntoView({ behavior: 'smooth' }) }
  filterCallback = (dataCallback) => {
    let facilitiesRoom = [""]
    if (dataCallback.facilitiesRoom.length > 0) facilitiesRoom = dataCallback.facilitiesRoom
    const dt = fire.firestore().collection('kosts')
    let conditions
    let titleHead
    if (dataCallback.city === '---Semua---' && dataCallback.district === '---Semua---') {
      titleHead = dataCallback.province
      conditions = dt
        .where('location.province', '==', dataCallback.province)
        .where("price.start_from", ">=", dataCallback.rangePrice.min)
        .where("price.start_from", "<=", dataCallback.rangePrice.max)
        .where("facility.room", "array-contains-any", facilitiesRoom)
        .where('is_active', '==', true)
    } else if (dataCallback.city !== '---Semua---' && dataCallback.district === '---Semua---') {
      titleHead = dataCallback.city + ', ' + dataCallback.province
      conditions = dt
        .where('location.province', '==', dataCallback.province)
        .where('location.city', '==', dataCallback.city)
        .where("price.start_from", ">=", dataCallback.rangePrice.min)
        .where("price.start_from", "<=", dataCallback.rangePrice.max)
        .where("facility.room", "array-contains-any", facilitiesRoom)
        .where('is_active', '==', true)
    } else if (dataCallback.city !== '---Semua---' && dataCallback.district !== '---Semua---') {
      titleHead = dataCallback.district + ', ' + dataCallback.city + ', ' + dataCallback.province
      conditions = dt
        .where('location.province', '==', dataCallback.province)
        .where('location.city', '==', dataCallback.city)
        .where('location.district', '==', dataCallback.district)
        .where("price.start_from", ">=", dataCallback.rangePrice.min)
        .where("price.start_from", "<=", dataCallback.rangePrice.max)
        .where("facility.room", "array-contains-any", facilitiesRoom)
        .where('is_active', '==', true)
    } else if (dataCallback.city !== '---Semua---' && dataCallback.district !== '---Semua---') {
      titleHead = dataCallback.district + ', ' + dataCallback.city + ', ' + dataCallback.province
      conditions = dt
        .where('location.province', '==', dataCallback.province)
        .where('location.city', '==', dataCallback.city)
        .where('location.district', '==', dataCallback.district)
        .where("price.start_from", ">=", dataCallback.rangePrice.min)
        .where("price.start_from", "<=", dataCallback.rangePrice.max)
        .where("facility.room", "array-contains-any", facilitiesRoom)
        .where('is_active', '==', true)
    } else if (dataCallback.city !== '---Semua---' && dataCallback.district === '---Semua---') {
      titleHead = dataCallback.city + ', ' + dataCallback.province
      conditions = dt
        .where('location.province', '==', dataCallback.province)
        .where('location.city', '==', dataCallback.city)
        .where("price.start_from", ">=", dataCallback.rangePrice.min)
        .where("price.start_from", "<=", dataCallback.rangePrice.max)
        .where("facility.room", "array-contains-any", facilitiesRoom)
        .where('is_active', '==', true)
    } else if (dataCallback.city === '---Semua---' && dataCallback.district === '---Semua---') {
      titleHead = dataCallback.province
      conditions = dt
        .where('location.province', '==', dataCallback.province)
        .where("price.start_from", ">=", dataCallback.rangePrice.min)
        .where("price.start_from", "<=", dataCallback.rangePrice.max)
        .where("facility.room", "array-contains-any", facilitiesRoom)
        .where('is_active', '==', true)
    }
    conditions.onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      const dataFilterByDuration = data.filter((item) => item.durations.includes(dataCallback.duration.toLowerCase()))
      this.setState({ data: dataFilterByDuration, isFilter: true, titleHead, dataCallback })
    })
    this.scrollToNode(this.node)
  }
  render() {
    const { data, dataCallback, isFilter, titleHead } = this.state
    const info = {
      title: 'Kost Murah Sewa Harian Bulanan Tahunan',
      description: 'Cari Kost Dan Kontrakan Harian Bulanan Tahunan Murah Terjangkau Nyaman Strategis',
      url: ''
    }
    return (
      <div>
        <NavComponent />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* col1 */}
          <div className="">
            <Header info={info} />
            <div className="m-3 border rounded-xl shadow-sm py-3">
              <Filter callbackFromParent={this.filterCallback} />
            </div>
            <div>
              <Ads />
            </div>
          </div>
          {/* col2 */}
          <div className="">
            <div className="mb-2 px-2 bg-white z-10" ref={(node) => this.node = node}>
              <span className="text-current">
                {
                  isFilter && <div className="mt-2">Hasil Pencarian: <span className="font-bold">Sewa {dataCallback.duration}an, {titleHead}</span></div>
                }
              </span>
            </div>
            <div>
              <FeedsGrid filterData={data} dataCallback={dataCallback} />
            </div>
          </div>
          {/* col3 */}
          <div className="border-top">
            <div className="py-2 px-3 bg-white z-10">
              <span className="text-uppercase text-current font-bold">Dekat Kampus</span>
            </div>
            <div className="border-bottom">
              <Campus />
              <a href="/area/kampus">
                <div className="align-middle text-center text-indigo-700 font-bold uppercase mb-3 mt-2 py-2 mx-3 cursor-pointer underline">
                  <span>Kampus Lainnya</span>
                </div>
              </a>
            </div>
            <div className="m-3 mb-n2">
              <span className="text-uppercase text-current font-bold">Komunitas Facebook</span>
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