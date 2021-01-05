import React from 'react'
import NextHead from 'next/head'
import fire from '../../configurations/firebase'
import HeadPage from '../../components/HeadPage'
import InfiniteScroll from 'react-infinite-scroll-component'
import CampaignItem from '../../components/CampaignItem'
import { BiFilterAlt, BiWinkSmile } from 'react-icons/bi'
import Filter from '../../components/Filter'
import Modal from 'react-bootstrap/Modal'
class Detail extends React.Component {
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
            show: true
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
    filterCallback = (dataCallback) => {
        const dt = fire.firestore().collection('kosts')
        let conditions
        if (dataCallback.district === '---Semua---' && dataCallback.facilityRoom === '---Semua---') {
            conditions = dt
                .where('category', '==', dataCallback.category)
                .where('location.city', '==', dataCallback.city)
        } else if (dataCallback.district !== '---Semua---' && dataCallback.facilityRoom === '---Semua---') {
            conditions = dt
                .where('category', '==', dataCallback.category)
                .where('location.city', '==', dataCallback.city)
                .where('location.district', '==', dataCallback.district)
        } else if (dataCallback.district === '---Semua---' && dataCallback.facilityRoom !== '---Semua---') {
            conditions = dt
                .where('category', '==', dataCallback.category)
                .where('location.city', '==', dataCallback.city)
                .where('facility.room', 'array-contains', dataCallback.facilityRoom)
        } else if (dataCallback.district !== '---Semua---' && dataCallback.facilityRoom !== '---Semua---') {
            conditions = dt
                .where('category', '==', dataCallback.category)
                .where('location.city', '==', dataCallback.city)
                .where('location.district', '==', dataCallback.district)
                .where('facility.room', 'array-contains', dataCallback.facilityRoom)
        }
        conditions.onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            this.setState({ data, isFilter: true, show: false, dataCallback })
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
        const { show, data, more, isFilter, dataCallback } = this.state;
        const handleClose = () => { this.setState({ show: false }) }
        const handleShow = () => { this.setState({ show: true }) }
        let titleHead = 'Semua Kost & Kontrakan'
        if (dataCallback && dataCallback.district === '---Semua---') { titleHead = dataCallback.city }
        if (dataCallback && dataCallback.district !== '---Semua---') { titleHead = dataCallback.district + ', ' + dataCallback.city }
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
                <HeadPage title={titleHead} />
                {
                    <div className="fixed inset-x-0 bottom-0 mb-3 text-center z-40">
                        <button onClick={handleShow} className={`${!show ? 'bg-indigo-700 text-white' : 'bg-white text-black border'} shadow-lg w-max px-2 py-2 mt-3 rounded-full hover:bg-white-700 focus:outline-none uppercase`}>
                            <BiFilterAlt className="inline mb-1 mr-1" />Saring</button>
                    </div>
                }
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
                        data.length > 0 ? <div className="grid grid-cols-2 gap-3 mx-3 my-3">{data.map((item, index) => <CampaignItem key={index} item={item} />
                        )}</div>
                            :
                            <div className="container-center text-center">
                                <div className="text-center">
                                    <div><BiWinkSmile size={22} className="inline mr-1 mb-1" />Data yang Kamu cari tidak ada</div>
                                </div>
                            </div>
                }
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Saring</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Filter callbackFromParent={this.filterCallback} />
                </Modal.Body>
            </Modal>
        </>)
    }
}
export default Detail;