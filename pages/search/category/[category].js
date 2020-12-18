import React from 'react'
import fire from '../../../config/fire-config'
import { string } from 'prop-types'
import HeadPage from '../../../components/HeadPage'
import Firstupper from '../../../utils/Firstupper'
import InfiniteScroll from "react-infinite-scroll-component";
import Link from 'next/link'
import Generateslug from '../../../utils/Generateslug'
import Currency from '.../../../components/Currency'
import { BiMap } from 'react-icons/bi'
class Detail extends React.Component {
    static async getInitialProps(ctx) {
        return { slug: ctx.query.category }
    }
    constructor(props) {
        super(props)
        this.state = {
            limitPerPage: 10,
            collectionLength: 100,
            more: true,
            data: [],
            last: {}
        }
        this.fetchMoreData = this.fetchMoreData.bind(this)
    }
    async componentDidMount() {
        const { slug } = this.props
        const { limitPerPage } = this.state
        const docRef = await fire
            .firestore().collection('kosts').where("category", "==", Firstupper(slug))
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
                .firestore().collection('kosts')
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
        const { slug } = this.props;
        const { data, more } = this.state;
        return (
            <div className="main-layout">
                <HeadPage title={`Semua ${slug}`} />
                <InfiniteScroll
                    dataLength={data.length}
                    next={this.fetchMoreData}
                    hasMore={more}
                    loader={<div className="py-3 text-center">Loading data...</div>}
                >
                    <div className="grid grid-cols-2 gap-3 mx-3 my-3">
                        {data.map((item, index) => (
                            <div key={index}>
                                <Link href={`https://tantekos.com/${Generateslug(item.title)}`}>
                                    <div className="h-full rounded-xl overflow-hidden border">
                                        <img className="w-full" src={`https://cdn.statically.io/img/i.imgur.com/w=200/${item.images[0]}`} alt={item.title} />
                                        <div className="px-3 py-3 text-center">
                                            <div className="px-2 text-xl font-bold">{Currency(item.start_price, false)}</div>
                                            <div className="text-current leading-none clamp-1">
                                                <BiMap className="inline mr-1" /><span><small>{item.location.district}, {item.location.province}</small></span></div>
                                            <div>
                                                {
                                                    item.facility.room.includes("AC") &&
                                                    <span className="rounded text-xs font-semibold inline-block px-1 text-green-600 border mr-1">AC</span>
                                                }
                                                {
                                                    item.facility.room.includes("Wifi") &&
                                                    <span className="rounded text-xs font-semibold inline-block px-1 text-green-600 border mr-1">WiFi</span>
                                                }
                                                {
                                                    item.facility.room.includes("Kamar Mandi Dalam") &&
                                                    <span className="rounded text-xs font-semibold inline-block px-1 text-green-600 border">KM. Dalam</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}
Detail.propTypes = {
    slug: string
}
Detail.defaultProps = {
    slug: ''
}
export default Detail;