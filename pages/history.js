import React from 'react'
import Message from '../components/Message'
import Cash from '../utils/Cash'
import { BiMap } from 'react-icons/bi'
import { MdClose } from 'react-icons/md'
import CampaignItemListSkeleton from '../components/CampaignItemListSkeleton'
import { type, facility, duration } from '../components/Campaign'
import Header from '../components/Header'
import NavComponent from '../components/NavComponent'
import NavMobile from '../components/NavMobile'
import Footer from '../components/Footer'
import Link from 'next/link'
class History extends React.Component {
    constructor(props) {
        super(props)
        this.state = { data: null, load: true }
    }
    componentDidMount() {
        let userFav = localStorage.getItem('lastview')
        let data
        if (userFav === null) { data = [] } else { data = JSON.parse(userFav) }
        this.setState({ data, load: false })
    }
    handleRemoveHistoryItem = (item) => {
        let lastView = localStorage.getItem('lastview')
        let data
        if (lastView === null) { data = [] } else { data = JSON.parse(lastView) }
        const newData = data.filter(i => i.id !== item.id)
        localStorage.setItem('lastview', JSON.stringify(newData))
        this.setState({ data: newData })
    }
    render() {
        const { data, load } = this.state
        const seo = {
            title: 'History - Daftar kost terakhir dilihat',
            description: 'Kost Terdekat Harian Bulanan Tahunan Murah',
            url: 'history'
        }
        return (
            <>
                <Header seo={seo} />
                <NavComponent />
                {
                    load ? <CampaignItemListSkeleton /> :
                        data && data.length > 0 &&
                        <>
                            <h1 className="my-3 mx-3 font-bold">
                                {`${data.length} Room${data.length > 1 ? 's' : ''} in History`}
                            </h1>
                            <div className="mx-3 divide-y">

                                {
                                    data
                                        .sort(function compare(a, b) {
                                            const itemA = a.price.start_from
                                            const itemB = b.price.start_from
                                            let comparison = 0
                                            if (itemA > itemB) comparison = 1
                                            if (itemA < itemB) comparison = -1
                                            return comparison
                                        })
                                        .map((item, index) =>
                                            <div className="w-full overflow-hidden divide-gray-100 pt-2 mb-2 flex" key={index}>
                                                <div className="container-image w-20 bg-gray-400">
                                                    <Link href={`/${item.slug}`}>
                                                        <img src={`https://cdn.statically.io/img/i.imgur.com/w=100/${item.images[0]}`} alt={item.title} className="object-cover object-center float-left mr-2 w-20 h-24" onError={(e) => { e.target.onerror = null; e.target.src = "/static/images/image-not-found.png" }} />
                                                    </Link>
                                                    <MdClose className="button-delete bg-gray-700 text-white rounded-full p-1 mt-1 ml-1" size="24" onClick={() => this.handleRemoveHistoryItem(item)} />
                                                </div>
                                                <Link href={`/${item.slug}`}>
                                                    <div className="flex-1 ml-2 self-center">
                                                        <div className="font-bold">
                                                            {Cash(item.price.start_from)}<span className="text-xs text-gray-700 uppercase"> / {duration(item.price.duration)}</span>
                                                        </div>
                                                        <div className="clamp-1">
                                                            <BiMap size={16} className="inline mr-1 mb-1" /><span>{item.location.district}, {item.location.city}, {item.location.province}</span>
                                                        </div>
                                                        <div className="clamp-1 leading-none">{facility(item.facility.room)}</div>
                                                        <div className="w-full">
                                                            <span className="text-green-700 text-xs uppercase font-bold">
                                                                {type(item.type)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                }
                            </div>
                        </>
                }
                {data && data.length === 0 && <Message title="No Room" message="You don't have history" />}
                <Footer />
                <div className="xs:block sm:hidden md:hidden lg:hidden">
                    <NavMobile />
                </div>
            </>
        )
    }
}
export default History;