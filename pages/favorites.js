import React from 'react'
import Link from 'next/link'
import Message from '../components/Message'
import Layout from '../components/Layout'
import Cash from '../utils/Cash'
import { BiMap } from 'react-icons/bi'
import { MdClose } from 'react-icons/md'
import CampaignItemListSkeleton from '../components/CampaignItemListSkeleton'
import KostType from '../components/Type'
class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = { data: null, load: true }
    }
    componentDidMount() {
        let userFav = localStorage.getItem('favorites')
        let data
        if (userFav === null) { data = [] } else { data = JSON.parse(userFav) }
        this.setState({ data, load: false })
    }
    handleRemoveFavoriteItem = (data) => {
        let userFav = localStorage.getItem('favorites')
        let userdataFav
        if (userFav === null) { userdataFav = [] } else { userdataFav = JSON.parse(userFav) }
        // remove data from array
        userdataFav = userdataFav.filter(function (item) {
            return item.id !== data.id
        })
        const newData = userdataFav.filter(i => i.id !== data.id)
        localStorage.setItem('favorites', JSON.stringify(userdataFav))
        this.setState({ data: newData })
    }
    render() {
        const { data, load } = this.state;
        console.log(data);
        return (
            <Layout title="Favorit" withHeader>
                {
                    load ? <CampaignItemListSkeleton /> :
                        data && data.length > 0 &&
                        <div className="mx-3 mb-3 divide-y">
                            {
                                data && data
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
                                        <div className="w-full overflow-hidden divide-gray-100 py-2" key={index}>
                                            <div className="container-image">
                                                <Link href={`/${item.slug}`}>
                                                    <img src={`https://cdn.statically.io/img/i.imgur.com/w=100/${item.images[0]}`} alt={item.title} className="float-left mr-2 rounded-xl" />
                                                </Link>
                                                <MdClose className="button-delete bg-gray-600 text-white rounded-full p-1 mt-2 ml-2" size="24" onClick={() => this.handleRemoveFavoriteItem(item)} />
                                            </div>
                                            <Link href={`/${item.slug}`}>
                                                <div className="mx-3 mt-n1">
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
                {data && data.length === 0 && <Message message="Kamu belum memiliki kost favorit" />}
            </Layout>
        )
    }
}
export default Detail;