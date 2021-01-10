import React from 'react'
import Link from 'next/link'
import HeadPage from '../components/HeadPage'
import Generateslug from '../utils/Generateslug'
import Cash from '../utils/Cash'
import { BiSmile } from 'react-icons/bi'
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
                                    .map((kost, index) =>
                                        <div className="w-full overflow-hidden divide-gray-100 py-2" key={index}>
                                            <div className="container-image">
                                                <img src={`https://cdn.statically.io/img/i.imgur.com/w=100/${kost.images[0]}`} alt={kost.title} className="float-left mr-2" />
                                                <MdClose className="button-delete bg-red-600 text-white rounded-full p-1 mt-2 ml-2" size="24" onClick={() => this.handleRemoveHistoryItem(kost)} />
                                            </div>
                                            <Link href={`/${kost.slug}`}>
                                                <div className="mx-3 mt-n1" >
                                                    <div className="text-lg">
                                                        {Cash(kost.price.start_from)}/<span className="text-xs">{kost.price.duration}</span>
                                                    </div>
                                                    <div className="leading-none clamp-3"><small>{kost.title}</small></div>
                                                    {
                                                        kost.facility.room.length > 0 &&
                                                        <div>
                                                            {kost.facility.room.includes("Kamar Mandi Dalam") && <img src="/../static/images/icons/bath_tube_icon_149739.svg" alt="Kamar Mandi Dalam" className="inline mr-1 border" width={18} />}
                                                            {kost.facility.room.includes("AC") && <img src="/../static/images/icons/air_conditioner_icon_149740.svg" alt="AC" className="inline mr-1 border" width={18} />}
                                                            {kost.facility.room.includes("Kasur") && <img src="/../static/images/icons/bed_icon_149738.svg" alt="Kasur" className="inline mr-1 border" width={18} />}
                                                            {kost.facility.room.includes("Springbed") && <img src="/../static/images/icons/bed_icon_149738.svg" alt="Springbed" className="inline mr-1 border" width={18} />}
                                                            {kost.facility.room.includes("Lemari Pakaian") && <img src="/../static/images/icons/cupboard_icon_149733.svg" alt="Lemari Pakaian" className="inline mr-1 border" width={18} />}
                                                            {kost.facility.room.includes("Wifi") && <img src="/../static/images/icons/wifi-medium-signal-symbol-1_icon-icons.com_56451.svg" alt="Wifi" className="inline mr-1 border" width={18} />}
                                                            {kost.facility.room.includes("TV") && <img src="/../static/images/icons/-live-tv_90650.svg" alt="TV" className="inline mr-1 border" width={18} />}
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