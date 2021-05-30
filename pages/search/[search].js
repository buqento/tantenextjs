import React from 'react'
import fire from '../../configurations/firebase'
import Message from '../../components/Message'
import InfiniteScroll from 'react-infinite-scroll-component'
import { BiFilterAlt } from 'react-icons/bi'
import Filter from '../../components/Filter'
import Modal from 'react-bootstrap/Modal'
import Titlecase from '../../utils/Titlecase'
import { DtProvinsi } from '../../utils/modals/Provinsi'
import CampaignItemList from '../../components/CampaignItemList'
import CampaignItemListSkeleton from '../../components/CampaignItemListSkeleton'
import Header from '../../components/Header'
import NavComponent from '../../components/NavComponent'
import Footer from '../../components/Footer'
import NavMobile from '../../components/NavMobile'
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
        this.scrollToNode = this.scrollToNode.bind(this)
    }
    async componentDidMount() {
        const { province, city, district, slug } = this.props
        const provinsi = DtProvinsi.filter(provinsi => provinsi.slug === province)
        const dt = fire.firestore().collection('kosts')
        let conditions
        if (provinsi.length > 0 || Titlecase(slug) === 'All') {
            if (Titlecase(slug) !== 'All') {
                conditions = dt
                    .where('location.province', '==', provinsi[0].title)
                    .where('price.duration', '==', Titlecase(slug))
                    .where('is_active', '==', true)
                    .orderBy('price.start_from', 'asc')
                if (city !== undefined) {
                    conditions = dt
                        .where('location.city', '==', Titlecase(city))
                        .where('price.duration', '==', Titlecase(slug))
                        .where('is_active', '==', true)
                        .orderBy('price.start_from', 'asc')
                }
                if (district !== undefined) {
                    conditions = dt
                        .where('location.city', '==', Titlecase(city))
                        .where('location.district', '==', Titlecase(district))
                        .where('price.duration', '==', Titlecase(slug))
                        .where('is_active', '==', true)
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
        } else {
            this.setState({ data: [], load: false })
        }
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
                .where('is_active', '==', true)
        } else if (dataCallback.city !== '---Semua---' && dataCallback.district === '---Semua---') {
            conditions = dt
                .where('location.province', '==', dataCallback.province)
                .where('location.city', '==', dataCallback.city)
                .where("price.start_from", ">=", dataCallback.rangePrice.min)
                .where("price.start_from", "<=", dataCallback.rangePrice.max)
                .where("facility.room", "array-contains-any", facilitiesRoom)
                .where('is_active', '==', true)
        } else if (dataCallback.city !== '---Semua---' && dataCallback.district !== '---Semua---') {
            conditions = dt
                .where('location.province', '==', dataCallback.province)
                .where('location.city', '==', dataCallback.city)
                .where('location.district', '==', dataCallback.district)
                .where("price.start_from", ">=", dataCallback.rangePrice.min)
                .where("price.start_from", "<=", dataCallback.rangePrice.max)
                .where("facility.room", "array-contains-any", facilitiesRoom)
                .where('is_active', '==', true)
        } else if (dataCallback.city !== '---Semua---' && dataCallback.district !== '---Semua---') {
            conditions = dt
                .where('location.province', '==', dataCallback.province)
                .where('location.city', '==', dataCallback.city)
                .where('location.district', '==', dataCallback.district)
                .where("price.start_from", ">=", dataCallback.rangePrice.min)
                .where("price.start_from", "<=", dataCallback.rangePrice.max)
                .where("facility.room", "array-contains-any", facilitiesRoom)
                .where('is_active', '==', true)
        } else if (dataCallback.city !== '---Semua---' && dataCallback.district === '---Semua---') {
            conditions = dt
                .where('location.province', '==', dataCallback.province)
                .where('location.city', '==', dataCallback.city)
                .where("price.start_from", ">=", dataCallback.rangePrice.min)
                .where("price.start_from", "<=", dataCallback.rangePrice.max)
                .where("facility.room", "array-contains-any", facilitiesRoom)
                .where('is_active', '==', true)
        } else if (dataCallback.city === '---Semua---' && dataCallback.district === '---Semua---') {
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
            this.setState({ data: dataFilterByDuration, isFilter: true, show: false, dataCallback, load: false })
            this.scrollToNode(this.node)
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
    scrollToNode(node) { node.scrollIntoView({ behavior: 'smooth' }) }
    render() {
        const { show, data, more, isFilter, dataCallback, load } = this.state;
        const handleClose = () => { this.setState({ show: false }) }
        const handleShow = () => { this.setState({ show: true }) }
        let titleHead = null
        if (dataCallback && dataCallback.city === '---Semua---' && dataCallback.district === '---Semua---') { titleHead = dataCallback.province }
        if (dataCallback && dataCallback.city !== '---Semua---') { titleHead = dataCallback.city + ', ' + dataCallback.province }
        if (dataCallback && dataCallback.district !== '---Semua---') { titleHead = dataCallback.district + ', ' + dataCallback.city + ', ' + dataCallback.province }
        const info = {
            title: 'Cari Kost Murah Sewa Harian Bulanan Tahunan Disekitar Kamu',
            description: 'Kost Murah Sewa Harian Bulanan Tahunan Murah',
            url: 'search/all'
        }
        return <>
            <NavComponent />
            <Header info={info} />
            {titleHead && <div className="py-4 px-3 font-bold z-40 sticky top-0 bg-white"><span className="font-normal">Sewa </span>{dataCallback.duration}an, {titleHead} <span className="text-green-700">({data.length})</span></div>}
            <div className="mt-2" ref={(node) => this.node = node}>
                {
                    <div className="cursor-pointer fixed inset-x-0 bottom-0 mb-5 pb-5 text-center z-40">
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
            <Footer />
            <div className="xs:block sm:hidden md:hidden lg:hidden">
                <NavMobile />
            </div>
        </>
    }
}
export default Detail;