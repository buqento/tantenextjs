import React, { Component } from 'react'
import { arrayOf, shape } from 'prop-types'
import Link from 'next/link'
import Cash from '../utils/Cash'
import Generateslug from '../utils/Generateslug'
import fire from '../configurations/firebase'
class ListKosOthers extends Component {
    async handleHit(id, hit) {
        await fire.firestore().collection("kosts").doc(id).update({ hit })
            .catch(err => { console.log(err) })
    }
    render() {
        const { data, detail } = this.props
        const handleLastView = (item) => {
            this.handleHit(item.id, item.hit === undefined ? 1 : item.hit + 1)
            const newItem = {
                date_view: Date.now(),
                facility: { bathroom: item.facility.bathroom, building: item.facility.building, share: item.facility.share, room: item.facility.room },
                id: item.id,
                images: item.images,
                price: { start_from: item.price.start_from, duration: item.price.duration },
                slug: item.slug,
                title: item.title
            }
            let lastView = localStorage.getItem('lastview')
            let data
            if (lastView === null) { data = [] } else { data = JSON.parse(lastView) }
            const findData = data.filter(i => i.id === newItem.id).length
            if (data.length > 14) { data.shift() }
            if (findData === 0) {
                data.push(newItem)
                localStorage.setItem('lastview', JSON.stringify(data))
            }
        }
        let listData = [];
        detail.category !== null ? listData = data.filter(i => (i.category === detail.category && i.location.district === detail.location.district)) : listData = data
        return (
            <>
                {
                    listData.length > 0 &&
                    <div className="mt-3">
                        <div className="py-3 font-bold">
                            <span className="font-normal">{`${detail.category} lain di `}</span>
                            <span>{`${detail.location.district}, ${detail.location.city}, ${detail.location.province}`}</span>
                        </div>
                        <div className="divide-y-2">
                            {
                                listData
                                    .reverse()
                                    .slice(0, 5)
                                    .map((kost, index) =>
                                        <Link key={index} href={`../${Generateslug(kost.title)}`}>
                                            <div className="w-full overflow-hidden py-2" onClick={() => handleLastView(kost)}>
                                                <img src={`https://cdn.statically.io/img/i.imgur.com/w=100/${kost.images[0]}`} alt={kost.title} className="float-left mr-2" />
                                                <div className="mx-3 mt-n1">
                                                    <div className="text-lg font-bold">
                                                        {Cash(kost.price.start_from)}<span className="text-xs font-normal">/{kost.price.duration}</span>
                                                    </div>
                                                    <div className="leading-none clamp-2"><small>{kost.title}</small></div>
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
                                                </div>
                                            </div>
                                        </Link>
                                    )
                            }
                        </div>
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