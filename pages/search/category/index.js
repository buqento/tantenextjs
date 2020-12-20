import React, { useRef } from 'react'
import fire from '../../../config/fire-config'
import HeadPage from '../../../components/HeadPage'
import InfiniteScroll from 'react-infinite-scroll-component'
import CampaignItem from '../../../components/CampaignItem'
import { BiFilterAlt } from 'react-icons/bi'
import Child from '../../../components/Child'
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
            showFilterForm: false
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
    myCallback = (dataFromChild) => {
        const dt = fire.firestore().collection('kosts')
            .where('category', '==', dataFromChild.category)
            .where('location.province', '==', dataFromChild.province)
        dt.onSnapshot(snapshot => {
            const data = snapshot.docs.map(doc => ({
                ...doc.data()
            }))
            this.setState({ data, isFilter: true, showFilterForm: false })
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
        const { data, more, isFilter, showFilterForm } = this.state;
        return (
            <div className="main-layout">
                <HeadPage title={`Semua Kost & Kontrakan`} ref={elem => (this.gate = elem)} />
                <div className="sticky top-0 text-center z-40">
                    <button onClick={this.toggleFilter} className="bg-indigo-700 w-max text-white px-2 py-2 mt-3 rounded-full focus:outline-none">
                        <BiFilterAlt className="inline mb-1 mr-1" />Saring</button>
                </div>
                {showFilterForm && <Child callbackFromParent={this.myCallback} />}
                {
                    !isFilter ?
                        <InfiniteScroll
                            dataLength={data.length}
                            next={this.fetchMoreData}
                            hasMore={more}
                            loader={<div className="py-3 text-center">Loading data...</div>}
                        >
                            <div className="grid grid-cols-2 gap-3 mx-3 my-3">
                                {data.map((item, index) => <CampaignItem key={index} item={item} />
                                )}
                            </div>
                        </InfiniteScroll>
                        :
                        <div className="grid grid-cols-2 gap-3 mx-3 my-3">
                            {data.map((item, index) => <CampaignItem key={index} item={item} />
                            )}
                        </div>
                }
            </div>
        )
    }
}
export default Detail;