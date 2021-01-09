import React, { Component } from 'react'
import { arrayOf, shape } from 'prop-types'
import Link from 'next/link'
import Cash from '../utils/Cash'
import Generateslug from '../utils/Generateslug'
class ListKosOthers extends Component {
    render() {
        const { data, detail } = this.props
        let listData = [];
        detail.category !== null ? listData = data.filter(i => (i.category === detail.category && i.location.district === detail.location.district)) : listData = data
        return (
            <>
                {
                    listData.length > 0 &&
                    <div className="mt-3">
                        <div className="py-3 font-bold">
                            {`${detail.category} lain di ${detail.location.district}, ${detail.location.city}, ${detail.location.province}`}
                        </div>
                        {
                            listData
                                .reverse()
                                .map((kost, index) =>
                                    <Link key={index} href={`../${Generateslug(kost.title)}`}>
                                        <div className="w-full overflow-hidden mb-3">
                                            <img src={`https://cdn.statically.io/img/i.imgur.com/w=100/${kost.images[0]}`} alt={kost.title} className="float-left mr-2" />
                                            <div className="mx-3 mt-n1">
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
                                        </div>
                                    </Link>
                                )
                        }
                    </div>
                }
            </>
        )
    }
}
ListKosOthers.propTypes = {
    data: arrayOf(shape({})),
    detail: shape({}),
    item: shape({})
}
ListKosOthers.defaultProps = {
    data: null,
    detail: null,
    item: null,
}
export default ListKosOthers;