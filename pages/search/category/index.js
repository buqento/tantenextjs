import React from 'react'
import fire from '../../../config/fire-config'
import HeadPage from '../../../components/HeadPage'
import InfiniteScroll from "react-infinite-scroll-component"
import CampaignItem from '../../../components/CampaignItem'
class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            limitPerPage: 10,
            collectionLength: 0,
            more: true,
            data: [],
            last: {}
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
    };
    render() {
        const { data, more } = this.state;
        return (
            <div className="main-layout">
                <HeadPage title={`Semua Kost & Kontrakan`} />
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
            </div>
        )
    }
}
export default Detail;