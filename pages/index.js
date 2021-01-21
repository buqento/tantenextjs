import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Campus from '../components/Campus'
import Filter from '../components/Filter'
import GroupSocial from '../components/GroupSocial'
import FeedsGrid from '../components/FeedsGrid'
import fire from '../configurations/firebase'
import { MdMyLocation } from 'react-icons/md'
class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      isFilter: false,
      titleHead: null,
      dataCallback: null
    }
    this.scrollToNode = this.scrollToNode.bind(this);
  }
  scrollToNode(node) {
    node.scrollIntoView({ behavior: 'smooth' });
  }
  filterCallback = (dataCallback) => {
    let facilitiesRoom = [""]
    if (dataCallback.facilitiesRoom.length > 0) facilitiesRoom = dataCallback.facilitiesRoom
    const dt = fire.firestore().collection('kosts')
    let conditions
    let titleHead
    if (dataCallback.city === '---Semua---' && dataCallback.district === '---Semua---') {
      titleHead = dataCallback.province
      conditions = dt
        .where('price.duration', '==', dataCallback.duration)
        .where('location.province', '==', dataCallback.province)
        .where("price.start_from", ">=", dataCallback.rangePrice.min)
        .where("price.start_from", "<=", dataCallback.rangePrice.max)
        .where("facility.room", "array-contains-any", facilitiesRoom)
    } else if (dataCallback.city !== '---Semua---' && dataCallback.district === '---Semua---') {
      titleHead = dataCallback.city + ', ' + dataCallback.province
      conditions = dt
        .where('price.duration', '==', dataCallback.duration)
        .where('location.province', '==', dataCallback.province)
        .where('location.city', '==', dataCallback.city)
        .where("price.start_from", ">=", dataCallback.rangePrice.min)
        .where("price.start_from", "<=", dataCallback.rangePrice.max)
        .where("facility.room", "array-contains-any", facilitiesRoom)
    } else if (dataCallback.city !== '---Semua---' && dataCallback.district !== '---Semua---') {
      titleHead = dataCallback.district + ', ' + dataCallback.city + ', ' + dataCallback.province
      conditions = dt
        .where('price.duration', '==', dataCallback.duration)
        .where('location.province', '==', dataCallback.province)
        .where('location.city', '==', dataCallback.city)
        .where('location.district', '==', dataCallback.district)
        .where("price.start_from", ">=", dataCallback.rangePrice.min)
        .where("price.start_from", "<=", dataCallback.rangePrice.max)
        .where("facility.room", "array-contains-any", facilitiesRoom)
    } else if (dataCallback.city !== '---Semua---' && dataCallback.district !== '---Semua---') {
      titleHead = dataCallback.district + ', ' + dataCallback.city + ', ' + dataCallback.province
      conditions = dt
        .where('price.duration', '==', dataCallback.duration)
        .where('location.province', '==', dataCallback.province)
        .where('location.city', '==', dataCallback.city)
        .where('location.district', '==', dataCallback.district)
        .where("price.start_from", ">=", dataCallback.rangePrice.min)
        .where("price.start_from", "<=", dataCallback.rangePrice.max)
        .where("facility.room", "array-contains-any", facilitiesRoom)
    } else if (dataCallback.city !== '---Semua---' && dataCallback.district === '---Semua---') {
      titleHead = dataCallback.city + ', ' + dataCallback.province
      conditions = dt
        .where('price.duration', '==', dataCallback.duration)
        .where('location.province', '==', dataCallback.province)
        .where('location.city', '==', dataCallback.city)
        .where("price.start_from", ">=", dataCallback.rangePrice.min)
        .where("price.start_from", "<=", dataCallback.rangePrice.max)
        .where("facility.room", "array-contains-any", facilitiesRoom)
    } else if (dataCallback.city === '---Semua---' && dataCallback.district === '---Semua---') {
      titleHead = dataCallback.province
      conditions = dt
        .where('price.duration', '==', dataCallback.duration)
        .where('location.province', '==', dataCallback.province)
        .where("price.start_from", ">=", dataCallback.rangePrice.min)
        .where("price.start_from", "<=", dataCallback.rangePrice.max)
        .where("facility.room", "array-contains-any", facilitiesRoom)
    }
    conditions.onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      this.setState({ data, isFilter: true, titleHead, dataCallback })
    })
    this.scrollToNode(this.node)
  }
  render() {
    const { data, dataCallback, isFilter, titleHead } = this.state
    return (
      <Layout withFooter>
        <Header />
        <div className="m-3 border rounded-xl shadow-sm py-3 px-3 text-center text-gray-700 font-bold uppercase">
          <div><MdMyLocation className="inline mb-1 mr-2" /> Cari Kost di sekitar Kamu</div>
          <a href="/nearby">
            <div className="rounded-full bg-indigo-700 align-middle rouded text-center text-white font-bold uppercase mt-3 mb-2 py-3">
              <span>Mulai Mencari</span>
            </div>
          </a>
        </div>
        <div className="m-3 border rounded-xl shadow-sm py-3">
          <Filter callbackFromParent={this.filterCallback} />
        </div>
        <div className="sticky top-0 py-3 px-3 bg-white z-10" ref={(node) => this.node = node}>
          <span className="text-current mb-4">
            {
              !isFilter ? <span className="uppercase font-bold">Terbaru</span> : <>Hasil Pencarian: <span className="font-bold">Sewa {dataCallback.duration}an, {titleHead}</span></>
            }
          </span>
        </div>
        <div className="border-bottom">
          <FeedsGrid filterData={data} dataCallback={dataCallback} />
        </div>
        <div className="sticky top-0 pt-4 pb-3 px-3 bg-white z-10">
          <span className="text-uppercase text-current font-bold">Dekat Kampus</span>
        </div>
        <div className="border-bottom">
          <Campus />
          <a href="/area/kampus">
            <div className="rounded-full bg-indigo-700 align-middle rouded text-center text-white font-bold uppercase my-3 py-3 mx-3">
              <span>Cari Kampus Lainnya</span>
            </div>
          </a>
        </div>
        <div className="m-3 mb-n2">
          <span className="text-uppercase text-current font-bold">Grup Facebook</span>
        </div>
        <GroupSocial />
      </Layout>
    )
  }
}
export default Index