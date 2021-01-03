import React, { Component } from 'react'
import { shape, string } from 'prop-types'
import Link from 'next/link'
import Cash from '../utils/Cash'
import Generateslug from '../utils/Generateslug'
import { BiMap } from 'react-icons/bi'
import { MdStar } from 'react-icons/md'
class CampaignItem extends Component {
    constructor(props) {
        super(props);
        this.state = { like: false }
    }
    componentDidMount() {
        const { item } = this.props
        let userFav = localStorage.getItem('favorites')
        let userdataFav
        if (userFav === null) { userdataFav = [] } else { userdataFav = JSON.parse(userFav) }
        const findFav = userdataFav.filter(i => i.id === item.id).length
        if (findFav > 0) this.setState({ like: true })
    }
    render() {
        const { like } = this.state;
        const { item, customStyle } = this.props
        const handleLastView = (item) => {
            let lastView = localStorage.getItem('lastview')
            let data
            if (lastView === null) { data = [] } else { data = JSON.parse(lastView) }
            const findData = data.filter(i => i.id === item.id).length
            if (data.length > 5) { data.shift() }
            if (findData === 0) {
                data.push(item)
                localStorage.setItem('lastview', JSON.stringify(data))
            }
        }
        return (
            <Link href={`/${Generateslug(item.title)}`}>
                <div className={`rounded-xl overflow-hidden border ${customStyle}`} onClick={() => handleLastView(item)}>
                    <img src={`https://cdn.statically.io/img/i.imgur.com/w=200/${item.images[0]}`} alt={item.title} style={{ maxWidth: 'unset' }} />
                    <div className="px-2 pt-2 pb-2 text-center">
                        <div className="px-2 text-xl">
                            <span className="font-bold">
                                {like && <MdStar className="inline text-pink-500 mb-1 mr-1" />}
                                {Cash(item.price.start_from, false)}
                            </span>
                            <span className="text-xs text-gray-700">/{item.price.duration}</span>
                        </div>
                        <div className="text-current leading-none clamp-1">
                            <BiMap className="inline mr-1" /><span><small>{item.location.district}, {item.location.city}</small></span>
                        </div>
                        <div>
                            {
                                item.type.includes("Campur") &&
                                <span className="rounded text-xs font-semibold inline-block px-1 text-green-700 border mr-1 uppercase">Campur</span>
                            }
                            {
                                item.type.includes("Putri") &&
                                <span className="rounded text-xs font-semibold inline-block px-1 text-green-700 border mr-1 uppercase">Putri</span>
                            }
                            {
                                item.type.includes("Putra") &&
                                <span className="rounded text-xs font-semibold inline-block px-1 text-green-700 border mr-1 uppercase">Putra</span>
                            }
                            {
                                item.type.includes("Pasutri") &&
                                <span className="rounded text-xs font-semibold inline-block px-1 text-green-700 border mr-1 uppercase">Pasutri</span>
                            }
                            {
                                item.type.includes("LV") &&
                                <span className="rounded text-xs font-semibold inline-block px-1 text-green-700 border mr-1 uppercase">LV</span>
                            }
                        </div>
                        <div className="border-top pt-1 mt-2">

                            {item.facility.room.includes("Kamar Mandi Dalam") && <img src="/../static/images/icons/bath_tube_icon_149739.svg" alt="Kamar Mandi Dalam" className="inline mr-1" width={18} />}

                            {item.facility.room.includes("AC") && <img src="/../static/images/icons/air_conditioner_icon_149740.svg" alt="AC" className="inline mr-1" width={18} />}

                            {item.facility.room.includes("Kasur") && <img src="/../static/images/icons/bed_icon_149738.svg" alt="Kasur" className="inline mr-1" width={18} />}

                            {item.facility.room.includes("Lemari Pakaian") && <img src="/../static/images/icons/cupboard_icon_149733.svg" alt="Lemari Pakaian" className="inline mr-1" width={16} />}

                            {item.facility.room.includes("Kasur") && <img src="/../static/images/icons/table_icon_149720.svg" alt="Meja" className="inline mr-1" width={16} />}

                            {item.facility.room.includes("Kursi") && <img src="/../static/images/icons/chair_icon_149736.svg" alt="Kursi" className="inline mr-1" width={18} />}

                            {item.facility.room.includes("Wifi") && <img src="/../static/images/icons/wifi-medium-signal-symbol-1_icon-icons.com_56451.svg" alt="Wifi" className="inline mr-1" width={18} />}

                            {item.facility.room.includes("Exhaust Fan") && <img src="/../static/images/icons/hardware_fan_component_icon_148858.svg" alt="Exhaust Fan" className="inline mr-1" width={18} />}

                            {item.facility.room.includes("TV") && <img src="/../static/images/icons/live-tv_118973.svg" alt="TV" className="inline mr-1" width={18} />}

                            {item.facility.room.includes("Kipas Angin") && <img src="/../static/images/icons/circularfan_118424.svg" alt="Kipas Angin" className="inline mr-1" width={18} />}

                            {/* bathroom */}
                            {item.facility.room.includes("Shower") && <img src="/../static/images/icons/shower_icon_149718.svg" alt="Shower" className="inline mr-1" width={18} />}

                            {item.facility.room.includes("Kloset Duduk") && <img src="/../static/images/icons/toilet_wc_icon_149719.svg" alt="Kloset Duduk" className="inline mr-1" width={18} />}

                            {item.facility.room.includes("Kloset Jongkok") && <img src="/../static/images/icons/toilet_squad_icon_149721.svg" alt="Kloset Jongkok" className="inline mr-1" width={18} />}

                            {/* share */}
                            {item.facility.room.includes("Parkir Motor") && <img src="/../static/images/icons/parking_icon_137324.svg" alt="Parkir Motor" className="inline mr-1" width={18} />}

                            {item.facility.room.includes("Parkir Mobil") && <img src="/../static/images/icons/parking_icon_137324.svg" alt="Parkir Mobil" className="inline mr-1" width={18} />}

                            {item.facility.room.includes("R.Jemur") && <img src="/../static/images/icons/wardrobe_4486.png" alt="R.Jemur" className="inline mr-1" width={18} />}

                            {item.facility.room.includes("R.Cuci") && <img src="/../static/images/icons/washing_machine_icon_149716.svg" alt="R.Cuci" className="inline mr-1" width={18} />}

                            {item.facility.room.includes("R.Tamu") && <img src="/../static/images/icons/chair_icon_149737.svg" alt="R.Tamu" className="inline mr-1" width={18} />}

                            {item.facility.room.includes("Kamar Mandi Luar") && <img src="/../static/images/icons/bath_tube_icon_149739.svg" alt="Kamar Mandi Luar" className="inline mr-1" width={18} />}

                            {item.facility.room.includes("Dapur") && <img src="/../static/images/icons/-kitchen_90730.svg" alt="Dapur" className="inline mr-1" width={18} />}

                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}
CampaignItem.propTypes = {
    item: shape({}),
    customStyle: string
}
CampaignItem.defaultProps = {
    item: null,
    customStyle: null
}
export default CampaignItem;