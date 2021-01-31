import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import Message from '../components/Message'
import Cash from '../utils/Cash'
import { BiMap } from 'react-icons/bi'
import { MdClose } from 'react-icons/md'
import CampaignItemListSkeleton from '../components/CampaignItemListSkeleton'
import KostType from '../components/Type'
import Header from '../components/Header'
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
        const { data, load } = this.state;
        return (
            <Layout title="Terakhir Dilihat" withHeader>
                <Header />
                {
                    load ? <CampaignItemListSkeleton /> :
                        data && data.length > 0 &&
                        <div className="mx-3 mb-3 divide-y">
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
                                        <div className="w-full overflow-hidden divide-gray-100 py-2 flex" key={index}>
                                            <div className="container-image h-24 w-24 bg-gray-400 rounded-xl">
                                                <Link href={`/${item.slug}`}>
                                                    <img src={`https://cdn.statically.io/img/i.imgur.com/w=100/${item.images[0]}`} alt={item.title} className="float-left mr-2 rounded-xl" />
                                                </Link>
                                                <MdClose className="button-delete bg-gray-600 text-white rounded-full p-1 mt-2 ml-2" size="24" onClick={() => this.handleRemoveHistoryItem(item)} />
                                            </div>
                                            <Link href={`/${item.slug}`}>
                                                <div className="flex-1 mx-3 mt-n1">
                                                    <div className="text-lg font-bold">
                                                        {Cash(item.price.start_from)}<span className="text-xs font-normal">/{item.price.duration}</span>
                                                    </div>
                                                    <div className="leading-none text-md clamp-2"><small>{item.title}</small></div>
                                                    {
                                                        item.location &&
                                                        <div className="text-md clamp-1">
                                                            <BiMap className="inline" /><small>{item.location.district}, {item.location.city}, {item.location.province}</small>
                                                        </div>
                                                    }
                                                    <KostType item={item.type} />
                                                </div>
                                            </Link>
                                        </div>
                                    )
                            }
                        </div>
                }
                {data && data.length === 0 && <Message message="Kamu belum memiliki history" />}
            </Layout>
        )
    }
}
export default History;