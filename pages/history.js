import React from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import Message from '../components/Message'
import Cash from '../utils/Cash'
import { BiMap } from 'react-icons/bi'
import { MdClose } from 'react-icons/md'
class History extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            skeletonArr: [1, 2, 3, 4, 5],
            load: true
        }
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
        const { data, load, skeletonArr } = this.state;
        return (
            <Layout title="Terakhir Dilihat" withHeader>
                {
                    load ?
                        <div className="mx-3 divide-y-2">
                            {
                                skeletonArr.map((item, index) =>
                                    <div key={index} className="max-w-sm w-full mx-auto py-2">
                                        <div className="animate-pulse flex space-x-4">
                                            <div className="bg-gray-400 rounded-xl h-24 w-24"></div>
                                            <div className="flex-1 space-y-4 py-1">
                                                <div className="h-6 bg-gray-400 rounded w-1/4"></div>
                                                <div className="space-y-2">
                                                    <div className="h-4 bg-gray-400 rounded"></div>
                                                    <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        :
                        data && data.length > 0 &&
                        <div className="mx-3 mb-3 divide-y-2">
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
                                        <div className="w-full overflow-hidden divide-gray-100 py-2" key={index}>
                                            <div className="container-image">
                                                <Link href={`/${item.slug}`}>
                                                    <img src={`https://cdn.statically.io/img/i.imgur.com/w=100/${item.images[0]}`} alt={item.title} className="float-left mr-2 rounded-xl" />
                                                </Link>
                                                <MdClose className="button-delete bg-gray-600 text-white rounded-full p-1 mt-2 ml-2" size="24" onClick={() => this.handleRemoveHistoryItem(item)} />
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
                                                    {
                                                        item.type &&
                                                        <div className="text-sm uppercase">
                                                            {
                                                                item.type.includes("Campur") &&
                                                                <small className="rounded-full inline-block px-1 text-green-700 border mr-1">{item.category === 'Kost' ? 'Campur' : 'Kontrakan'}</small>
                                                            }
                                                            {
                                                                item.type.includes("Putri") &&
                                                                <small className="rounded-full inline-block px-1 text-green-700 border mr-1">Putri</small>
                                                            }
                                                            {
                                                                item.type.includes("Putra") &&
                                                                <small className="rounded-full inline-block px-1 text-green-700 border mr-1">Putra</small>
                                                            }
                                                            {
                                                                item.type.includes("Pasutri") &&
                                                                <small className="rounded-full inline-block px-1 text-green-700 border mr-1">Pasutri</small>
                                                            }
                                                            {
                                                                item.type.includes("LV") &&
                                                                <small className="rounded-full inline-block px-1 text-green-700 border mr-1">LV</small>
                                                            }
                                                        </div>
                                                    }
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