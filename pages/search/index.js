import React from 'react'
import NextHead from 'next/head'
import fire from '../../config/fire-config'
import HeadPage from '../../components/HeadPage'
import InfiniteScroll from 'react-infinite-scroll-component'
import CampaignItem from '../../components/CampaignItem'
import { BiFilterAlt } from 'react-icons/bi'
import Filter from '../../components/Filter'
class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            limitPerPage: 10,
            collectionLength: 0,
            more: true,
            data: [],
            last: {},
            isFilter: true,
            showFilterForm: false,
            dataCallback: null
        }
        this.fetchMoreData = this.fetchMoreData.bind(this)
    }
    async componentDidMount() {
        const { limitPerPage } = this.state
        const docRef = await fire
            .firestore().collection('kosts').orderBy('date_modified', 'desc')
        docRef.get().then(snapshot => {
            this.setState({ collectionLength: snapshot.docs.length })
        }).catch(err => console.log(err))
        docRef.limit(limitPerPage).onSnapshot(snap => {
            const last = snap.docs[snap.docs.length - 1]
            const data = snap.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            this.setState({ data, last })
        })
        docRef.get().catch(err => console.log(err))
    }
    toggleFilter = () => {
        const { isFilter } = this.state
        this.setState({ isFilter: !isFilter, showFilterForm: true })
        const elementTop = this.gate.offsetTop;
        window.scrollTo(0, elementTop);
    }
    filterCallback = (dataCallback) => {
        const dt = fire.firestore().collection('kosts')
        let conditions
        if (dataCallback.district === '---Semua---' && dataCallback.facilityRoom === '---Semua---') {
            conditions = dt
                .where('category', '==', dataCallback.category)
                .where('location.province', '==', dataCallback.province)
        } else if (dataCallback.district !== '---Semua---' && dataCallback.facilityRoom === '---Semua---') {

            conditions = dt
                .where('category', '==', dataCallback.category)
                .where('location.province', '==', dataCallback.province)
                .where('location.district', '==', dataCallback.district)
        } else if (dataCallback.district === '---Semua---' && dataCallback.facilityRoom !== '---Semua---') {
            conditions = dt
                .where('category', '==', dataCallback.category)
                .where('location.province', '==', dataCallback.province)
                .where('facility.room', 'array-contains', dataCallback.facilityRoom)
        } else if (dataCallback.district !== '---Semua---' && dataCallback.facilityRoom !== '---Semua---') {
            conditions = dt
                .where('category', '==', dataCallback.category)
                .where('location.province', '==', dataCallback.province)
                .where('location.district', '==', dataCallback.district)
                .where('facility.room', 'array-contains', dataCallback.facilityRoom)
        }
        conditions.onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            this.setState({ data, isFilter: true, showFilterForm: false, dataCallback })
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
        const { data, more, isFilter, showFilterForm, dataCallback } = this.state;
        let titleHead = 'Semua Kost & Kontrakan'
        if (dataCallback && dataCallback.district === '---Semua---') { titleHead = dataCallback.province }
        if (dataCallback && dataCallback.district !== '---Semua---') { titleHead = dataCallback.district + ', ' + dataCallback.province }
        return (<>
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
                <HeadPage title={titleHead} ref={elem => (this.gate = elem)} />
                {
                    <div className="fixed inset-x-0 bottom-0 mb-3 text-center z-40">
                        <button onClick={this.toggleFilter} className={`${!isFilter ? 'bg-indigo-700 text-white' : 'bg-white text-black border'} shadow-lg w-max px-2 py-2 mt-3 rounded-full hover:bg-white-700 focus:outline-none uppercase`}>
                            <BiFilterAlt className="inline mb-1 mr-1" />Saring</button>
                    </div>
                }
                {isFilter && <Filter callbackFromParent={this.filterCallback} />}
                {
                    !isFilter ?
                        <InfiniteScroll
                            dataLength={data.length}
                            next={this.fetchMoreData}
                            hasMore={more}
                            loader={<div className="py-3 text-center"></div>}
                        >
                            <div className="grid grid-cols-2 gap-3 mx-3 mb-3">
                                {data.map((item, index) => <CampaignItem key={index} item={item} />
                                )}
                            </div>
                        </InfiniteScroll>
                        :
                        !showFilterForm && data.length > 0 && <div className="grid grid-cols-2 gap-3 mx-3 my-3">{data.map((item, index) => <CampaignItem key={index} item={item} />
                        )}</div>
                }
            </div>
        </>)
    }
}
export default Detail;