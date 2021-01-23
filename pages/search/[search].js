import React from 'react'
import NextHead from 'next/head'
import fire from '../../configurations/firebase'
import Message from '../../components/Message'
import InfiniteScroll from 'react-infinite-scroll-component'
import { BiFilterAlt } from 'react-icons/bi'
import Filter from '../../components/Filter'
import Modal from 'react-bootstrap/Modal'
import Titlecase from '../../utils/Titlecase'
import { DtProvinsi } from '../../utils/modals/Provinsi'
import Layout from '../../components/Layout'
import CampaignItemList from '../../components/CampaignItemList'
import CampaignItemListSkeleton from '../../components/CampaignItemListSkeleton'
class Detail extends React.Component {
    static async getInitialProps(ctx) {
        return {
            slug: ctx.query.search,
            province: ctx.query.province,
            city: ctx.query.city,
            district: ctx.query.district
        }
    }
    constructor(props) {
        super(props)
        this.state = {
            limitPerPage: 10,
            collectionLength: 0,
            more: true,
            data: [],
            last: {},
            isFilter: false,
            dataCallback: null,
            show: false,
            load: true
        }
        this.fetchMoreData = this.fetchMoreData.bind(this)
    }
    async componentDidMount() {
        const { province, city, district, slug } = this.props
        const provinsi = DtProvinsi.filter(provinsi => provinsi.slug === province)
        const dt = fire.firestore().collection('kosts')
        let conditions
        if (Titlecase(slug) !== 'All') {
            conditions = dt
                .where('location.province', '==', provinsi[0].title)
                .where('price.duration', '==', Titlecase(slug))
                .orderBy('price.start_from', 'asc')
            if (city !== undefined) {
                conditions = dt
                    .where('location.city', '==', Titlecase(city))
                    .where('price.duration', '==', Titlecase(slug))
                    .orderBy('price.start_from', 'asc')
            }
            if (district !== undefined) {
                conditions = dt
                    .where('location.city', '==', Titlecase(city))
                    .where('location.district', '==', Titlecase(district))
                    .where('price.duration', '==', Titlecase(slug))
                    .orderBy('price.start_from', 'asc')
            }
            this.setState({ more: false })
        } else {
            conditions = dt
                .orderBy('price.start_from', 'asc')
        }
        conditions.get().then(snapshot => {
            this.setState({ collectionLength: snapshot.docs.length })
        }).catch(err => console.log(err))
        conditions.onSnapshot(snap => {
            const last = snap.docs[snap.docs.length - 1]
            const data = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            this.setState({ data, last, load: false })
        })
        conditions.get().catch(err => console.log(err))
    }
    filterCallback = (dataCallback) => {
        let facilitiesRoom = [""]
        if (dataCallback.facilitiesRoom.length > 0) facilitiesRoom = dataCallback.facilitiesRoom
        const dt = fire.firestore().collection('kosts')
        let conditions
        if (dataCallback.city === '---Semua---' && dataCallback.district === '---Semua---') {
            conditions = dt
                .where('location.province', '==', dataCallback.province)
                .where("price.start_from", ">=", dataCallback.rangePrice.min)
                .where("price.start_from", "<=", dataCallback.rangePrice.max)
                .where("facility.room", "array-contains-any", facilitiesRoom)
        } else if (dataCallback.city !== '---Semua---' && dataCallback.district === '---Semua---') {
            conditions = dt
                .where('location.province', '==', dataCallback.province)
                .where('location.city', '==', dataCallback.city)
                .where("price.start_from", ">=", dataCallback.rangePrice.min)
                .where("price.start_from", "<=", dataCallback.rangePrice.max)
                .where("facility.room", "array-contains-any", facilitiesRoom)
        } else if (dataCallback.city !== '---Semua---' && dataCallback.district !== '---Semua---') {
            conditions = dt
                .where('location.province', '==', dataCallback.province)
                .where('location.city', '==', dataCallback.city)
                .where('location.district', '==', dataCallback.district)
                .where("price.start_from", ">=", dataCallback.rangePrice.min)
                .where("price.start_from", "<=", dataCallback.rangePrice.max)
                .where("facility.room", "array-contains-any", facilitiesRoom)
        } else if (dataCallback.city !== '---Semua---' && dataCallback.district !== '---Semua---') {
            conditions = dt
                .where('location.province', '==', dataCallback.province)
                .where('location.city', '==', dataCallback.city)
                .where('location.district', '==', dataCallback.district)
                .where("price.start_from", ">=", dataCallback.rangePrice.min)
                .where("price.start_from", "<=", dataCallback.rangePrice.max)
                .where("facility.room", "array-contains-any", facilitiesRoom)
        } else if (dataCallback.city !== '---Semua---' && dataCallback.district === '---Semua---') {
            conditions = dt
                .where('location.province', '==', dataCallback.province)
                .where('location.city', '==', dataCallback.city)
                .where("price.start_from", ">=", dataCallback.rangePrice.min)
                .where("price.start_from", "<=", dataCallback.rangePrice.max)
                .where("facility.room", "array-contains-any", facilitiesRoom)
        } else if (dataCallback.city === '---Semua---' && dataCallback.district === '---Semua---') {
            conditions = dt
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
            const dataFilterByDuration = data.filter((item) => item.durations.includes(dataCallback.duration.toLowerCase()))
            this.setState({ data: dataFilterByDuration, isFilter: true, show: false, dataCallback, load: false })
        })
    }
    fetchMoreData() {
        const { limitPerPage, last, data, collectionLength } = this.state
        if (collectionLength !== data.length) {
            const docRef = fire
                .firestore().collection('kosts').orderBy('date_modified', 'desc')
                .startAfter(last)
                .limit(limitPerPage)
            docRef.onSnapshot(snap => {
                const last = snap.docs[snap.docs.length - 1]
                const listData = snap.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                const mergeData = data.concat(listData)
                this.setState({ data: mergeData, last })
            })
            docRef.get().catch(err => console.log(err))
        } else {
            this.setState({ more: false })
        }
    }
    render() {
        const { show, data, more, isFilter, dataCallback, load } = this.state;
        const handleClose = () => { this.setState({ show: false }) }
        const handleShow = () => { this.setState({ show: true }) }
        let titleHead = null
        if (dataCallback && dataCallback.city === '---Semua---' && dataCallback.district === '---Semua---') { titleHead = dataCallback.province }
        if (dataCallback && dataCallback.city !== '---Semua---') { titleHead = dataCallback.city + ', ' + dataCallback.province }
        if (dataCallback && dataCallback.district !== '---Semua---') { titleHead = dataCallback.district + ', ' + dataCallback.city + ', ' + dataCallback.province }
        return (<Layout title="Cari Kost" withHeader>
            <NextHead>
                <title>Tersedia Kost Dan Kontrakan Murah Semua Di {titleHead}</title>
                <meta name="googlebot" content="index, follow" />
                <meta name="robot" content="index, follow" />
                <meta name="application-name" content="Tantekos" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="title" content="Tersedia Kost Dan Kontrakan Murah Semua Area Di Indonesia" />
                <meta name="description" content="Tersedia Kost Dan Kontrakan Murah Semua Area Di Indonesia" />
                <meta name="keywords" content="tantekos, Info Kost, Cari kost, kost, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                <meta property="og:title" content="Tersedia Kost Dan Kontrakan Murah Semua Area Di Indonesia" />
                <meta property="og:description" content="Tersedia Kost Dan Kontrakan Murah Semua Area Di Indonesia" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://tantekos.com/search" />
                <meta property="og:image" content="https://cdn.statically.io/img/i.imgur.com/w=300/i2aQSZ9.webpm" />
                <meta property="og:image:alt" content={`Tersedia Kost Dan Kontrakan Murah Di ${titleHead}`} />
                <meta property="og:locale" content="id_ID" />
                <meta property="og:site_name" content="Tantekos" />
                <meta name="keyphrases" content="Info Kost, Cari Kost, Sewa Kost, Kost Bebas, Kost Murah, Kost pasutri, Aplikasi Kost, Aplikasi Pencarian Kost, Aplikasi Info Kost, APlikasi Cari Kost, Kost, Tantekost, Tantekosapp, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                <meta name="classification" content="Business, Rent House, Sewa Kost, Property, Rent Room, Info Kost, Information, Kost, Room, Cari Kost, Kost Murah, Kost Bebas, Application, Mobile Application, Kamar Kost, Kamar Kos, Kostan, Kos, Rumah Kost, Rumah Kos, Kost Harian" />
                <link rel="canonical" content="https://tantekos.com/search" />
            </NextHead>
            <div className="main-layout">
    {titleHead && <div className="mb-2 mx-3 font-bold"><span className="font-normal">Kost Sewa </span>{dataCallback.duration}an, {titleHead}</div>}
                {
                    <div className="fixed inset-x-0 bottom-0 mb-5 pb-5 text-center z-40">
                        <span onClick={handleShow} className={`${!show ? 'bg-indigo-700 text-white' : 'bg-white text-black border'} shadow-md w-max px-3 py-3 rounded-full hover:bg-white-700 focus:outline-none uppercase`}>
                            <BiFilterAlt className="inline mb-1 mr-1" />Saring</span>
                    </div>
                }
                {
                    load ? <CampaignItemListSkeleton /> :
                        !isFilter ?
                            <InfiniteScroll
                                dataLength={data.length}
                                next={this.fetchMoreData}
                                hasMore={more}
                                loader={<div className="py-3 text-center"></div>}
                            >
                                <div className="mx-3 mb-3 divide-y">
                                    {data.map((item, index) => <CampaignItemList key={index} item={item} />
                                    )}
                                </div>
                            </InfiniteScroll>
                            :
                            data.length > 0 ? <div className="mx-3 mb-3 divide-y">{data.map((item, index) => <CampaignItemList key={index} item={item} />
                            )}</div>
                                :
                                <Message title="Tidak Ditemukan" message="Silahkan cari dengan kriteria lainnya" />
                }
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body closeButton>
                    <Filter callbackFromParent={this.filterCallback} />
                </Modal.Body>
            </Modal>
        </Layout>)
    }
}
export default Detail;