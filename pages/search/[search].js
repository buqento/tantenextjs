import React from 'react'
import fire from '../../configurations/firebase'
import Message from '../../components/Message'
import { BiFilterAlt } from 'react-icons/bi'
import Filter from '../../components/Filter'
import Modal from 'react-bootstrap/Modal'
import Titlecase from '../../utils/Titlecase'
import { DtProvinsi } from '../../utils/modals/Provinsi'
import ListComponent from '../../components/ListComponent'
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
        if (dataCallback.city === '---All---' && dataCallback.district === '---All---') {
            conditions = dt
                .where('location.province', '==', dataCallback.province)
                .where("price.start_from", ">=", dataCallback.rangePrice.min)
                .where("price.start_from", "<=", dataCallback.rangePrice.max)
                .where("facility.room", "array-contains-any", facilitiesRoom)
                .where('is_active', '==', true)
        } else if (dataCallback.city !== '---All---' && dataCallback.district === '---All---') {
            conditions = dt
                .where('location.province', '==', dataCallback.province)
                .where('location.city', '==', dataCallback.city)
                .where("price.start_from", ">=", dataCallback.rangePrice.min)
                .where("price.start_from", "<=", dataCallback.rangePrice.max)
                .where("facility.room", "array-contains-any", facilitiesRoom)
                .where('is_active', '==', true)
        } else if (dataCallback.city !== '---All---' && dataCallback.district !== '---All---') {
            conditions = dt
                .where('location.province', '==', dataCallback.province)
                .where('location.city', '==', dataCallback.city)
                .where('location.district', '==', dataCallback.district)
                .where("price.start_from", ">=", dataCallback.rangePrice.min)
                .where("price.start_from", "<=", dataCallback.rangePrice.max)
                .where("facility.room", "array-contains-any", facilitiesRoom)
                .where('is_active', '==', true)
        } else if (dataCallback.city !== '---All---' && dataCallback.district !== '---All---') {
            conditions = dt
                .where('location.province', '==', dataCallback.province)
                .where('location.city', '==', dataCallback.city)
                .where('location.district', '==', dataCallback.district)
                .where("price.start_from", ">=", dataCallback.rangePrice.min)
                .where("price.start_from", "<=", dataCallback.rangePrice.max)
                .where("facility.room", "array-contains-any", facilitiesRoom)
                .where('is_active', '==', true)
        } else if (dataCallback.city !== '---All---' && dataCallback.district === '---All---') {
            conditions = dt
                .where('location.province', '==', dataCallback.province)
                .where('location.city', '==', dataCallback.city)
                .where("price.start_from", ">=", dataCallback.rangePrice.min)
                .where("price.start_from", "<=", dataCallback.rangePrice.max)
                .where("facility.room", "array-contains-any", facilitiesRoom)
                .where('is_active', '==', true)
        } else if (dataCallback.city === '---All---' && dataCallback.district === '---All---') {
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
        const { show, data, more, isFilter, dataCallback, load } = this.state
        const { province, city, district } = this.props
        const handleClose = () => { this.setState({ show: false }) }
        const handleShow = () => { this.setState({ show: true }) }
        let titleHead = null
        if (dataCallback && dataCallback.city === '---All---' && dataCallback.district === '---All---') { titleHead = dataCallback.province }
        if (dataCallback && dataCallback.city !== '---All---') { titleHead = dataCallback.city + ', ' + dataCallback.province }
        if (dataCallback && dataCallback.district !== '---All---') { titleHead = dataCallback.district + ', ' + dataCallback.city + ', ' + dataCallback.province }
        const seo = {
            title: 'Cari Kost Murah Sewa Harian Bulanan Tahunan Disekitar Kamu',
            description: 'Kost Murah Sewa Harian Bulanan Tahunan Murah',
            url: 'search/all'
        }
        console.log(isFilter);
        return <>
            <NavComponent />
            <Header seo={seo} />
            {data.length > 0 && titleHead && <div className="py-4 px-3 font-bold z-40 sticky top-0 bg-white">{data.length} Room{data.length > 1 ? 's' : ''}, {dataCallback.duration}an, in {titleHead}</div>}
            <div ref={(node) => this.node = node}>
                {
                    <div className="cursor-pointer fixed inset-x-0 bottom-0 mb-5 pb-5 text-center z-40">
                        <span onClick={handleShow} className={`${!show ? 'bg-indigo-700 text-white' : 'bg-white text-black border'} shadow-md w-max px-3 py-3 rounded-full hover:bg-white-700 focus:outline-none uppercase`}>
                            <BiFilterAlt className="inline mb-1 mr-1" />Filter</span>
                    </div>
                }
                {
                    load ? <CampaignItemListSkeleton /> :
                        !isFilter ?
                            <div className="px-3">
                                <div>
                                    {data.length > 0 && <div className="py-3 font-bold z-40">{data.length} Room{data.length > 1 ? 's' : ''} in {Titlecase(district)}, {Titlecase(city)}, {Titlecase(province)}</div>}
                                </div>
                                <ListComponent data={data} />
                            </div>
                            :
                            <div className="px-3">
                                {
                                    data.length > 0 ? <ListComponent data={data} /> : <Message title="No Room" message="Use search to view more rooms" />
                                }
                            </div>
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