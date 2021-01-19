import React from 'react'
import Link from 'next/link'
import HeadPage from '../components/HeadPage'
import Cash from '../utils/Cash'
import { BiSmile, BiMap } from 'react-icons/bi'
import { MdClose } from 'react-icons/md'
class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = { data: null }
    }
    componentDidMount() {
        let userFav = localStorage.getItem('favorites')
        let data
        if (userFav === null) { data = [] } else { data = JSON.parse(userFav) }
        this.setState({ data })
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
        const { data } = this.state;
        return (
            <div className="main-layout">
                <HeadPage title="Favorit Saya" />
                {
                    data && data.length > 0 ?
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
                                                {/* <div className="mx-3 mt-n1" >
                                                    <div className="text-lg font-bold">
                                                        {Cash(kost.price.start_from)}<span className="text-xs font-normal">/{kost.price.duration}</span>
                                                    </div>
                                                    <div className="leading-none clamp-2"><small>{kost.title}</small></div>
                                                    {
                                                        kost.location &&
                                                        <div className="text-sm clamp-1">
                                                            <BiMap className="inline" /><span><small>{kost.location.district}, {kost.location.city}, {kost.location.province}</small></span>
                                                        </div>
                                                    }
                                                    {
                                                        kost.type &&
                                                        <div className="text-xs font-semibold uppercase">
                                                            {
                                                                kost.type.includes("Campur") &&
                                                                <span className="rounded-full inline-block px-1 text-green-700 border mr-1">Campur</span>
                                                            }
                                                            {
                                                                kost.type.includes("Putri") &&
                                                                <span className="rounded-full inline-block px-1 text-green-700 border mr-1">Putri</span>
                                                            }
                                                            {
                                                                kost.type.includes("Putra") &&
                                                                <span className="rounded-full inline-block px-1 text-green-700 border mr-1">Putra</span>
                                                            }
                                                            {
                                                                kost.type.includes("Pasutri") &&
                                                                <span className="rounded-full inline-block px-1 text-green-700 border mr-1">Pasutri</span>
                                                            }
                                                            {
                                                                kost.type.includes("LV") &&
                                                                <span className="rounded-full text-xs inline-block px-1 text-green-700 border mr-1">LV</span>
                                                            }
                                                        </div>
                                                    }
                                                </div> */}
                                            </Link>
                                        </div>
                                    )
                            }
                        </div>
                        :
                        <div className="container-center text-center">
                            <div className="text-center">
                                <div><BiSmile size={22} className="inline mr-1 mb-1" />Kamu belum memiliki kost favorit</div>
                            </div>
                        </div>
                }
            </div>
        )
    }
}
export default Detail;