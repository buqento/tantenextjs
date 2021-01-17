import React from 'react'
import Link from 'next/link'
import HeadPage from '../components/HeadPage'
import Cash from '../utils/Cash'
import { BiSmile, BiMap } from 'react-icons/bi'
import { MdClose } from 'react-icons/md'
class History extends React.Component {
    constructor(props) {
        super(props)
        this.state = { data: [] }
    }
    componentDidMount() {
        let userFav = localStorage.getItem('lastview')
        let data
        if (userFav === null) { data = [] } else { data = JSON.parse(userFav) }
        this.setState({ data })
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
        const { data } = this.state;
        return (
            <div className="main-layout">
                <HeadPage title="Terakhir Dilihat" />
                {
                    data.length > 0 ?
                        <div className="mx-3 divide-y-2">
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
                        :
                        <div className="container-center text-center">
                            <div className="text-center">
                                <div><BiSmile size={22} className="inline mr-1 mb-1" />Kamu belum memiliki history</div>
                            </div>
                        </div>
                }
            </div>
        )
    }
}
export default History;