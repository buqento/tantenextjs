import React from 'react'
import Message from '../components/Message'
import Facilities from '../components/Facilities'
import Cash from '../utils/Cash'
import { BiMap } from 'react-icons/bi'
import { MdClose } from 'react-icons/md'
import CampaignItemListSkeleton from '../components/CampaignItemListSkeleton'
import KostType from '../components/Type'
import Header from '../components/Header'
import NavComponent from '../components/NavComponent'
import NavMobile from '../components/NavMobile'
import AdSense from 'react-adsense'
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
        const info = {
            title: 'Kost Terdekat Disekitar Kamu',
            description: 'Kost Terdekat Harian Bulanan Tahunan Murah',
            url: 'history'
        }
        return (
            <>
                <Header info={info} />
                <NavComponent />

                <div className="my-3 mx-3">
                    {/* horizontal ads */}
                    <AdSense.Google
                        client='ca-pub-1434074630735871'
                        slot='5011678900'
                        className="w-full bg-gray-400 text-center"
                        format='auto'
                    />
                </div>

                {
                    load ? <CampaignItemListSkeleton /> :
                        data && data.length > 0 &&
                        <div className="mx-3 my-2 divide-y">
                            {
                                data
                                    .sort(
                                        function compare(a, b) {
                                            const dtModifiedA = b.date_view;
                                            const dtModifiedB = a.date_view;
                                            let comparison = 0;
                                            if (dtModifiedA > dtModifiedB) {
                                                comparison = 1;
                                            } else if (dtModifiedA < dtModifiedB) {
                                                comparison = -1;
                                            }
                                            return comparison;
                                        }
                                    )
                                    .map((item, index) =>
                                        <div className="w-full overflow-hidden divide-gray-100 py-2 mb-2 flex" key={index}>
                                            <div className="container-image w-20 bg-gray-400">
                                                <Link href={`/${item.slug}`}>
                                                    <img src={`https://cdn.statically.io/img/i.imgur.com/w=200/${item.images[0]}`} alt={item.title} className="object-cover object-center float-left mr-2 w-20 h-24" onError={(e) => { e.target.onerror = null; e.target.src = "/static/images/image-not-found.png" }} />
                                                </Link>
                                                <MdClose className="button-delete bg-gray-700 text-white rounded-full p-1 mt-1 ml-1" size="24" onClick={() => this.handleRemoveHistoryItem(item)} />
                                            </div>
                                            <Link href={`/${item.slug}`}>
                                                <div className="flex-1 ml-2 mt-1 self-center">
                                                    <div className="leading-none font-bold">
                                                        {Cash(item.price.start_from)}<span className="text-xs font-normal uppercase"> &middot; {item.price.duration}</span>
                                                    </div>
                                                    <Facilities items={item.facility.room} inline />
                                                    <div className="text-sm clamp-1">
                                                        <BiMap size={16} className="inline mr-1 mb-1" /><span>{item.location.district}, {item.location.city}, {item.location.province}</span>
                                                    </div>
                                                    <div className="w-full">
                                                        <span className="text-green-700 text-xs uppercase font-bold">
                                                            <KostType item={item.type} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                            }
                        </div>
                }
                {data && data.length === 0 && <Message message="Kamu belum memiliki history" />}
                <div className="xs:block sm:hidden md:hidden lg:hidden">
                    <Footer />
                    <NavMobile />
                </div>
            </>
        )
    }
}
export default History;