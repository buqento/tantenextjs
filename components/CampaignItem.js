import React, { Component } from 'react'
import { shape, string } from 'prop-types'
import Link from 'next/link'
import Currency from './Currency'
import Generateslug from '../utils/Generateslug'
import { BiMap } from 'react-icons/bi'
class CampaignItem extends Component {
    render() {
        const { item, customStyle } = this.props
        return (
            <Link href={`/${Generateslug(item.title)}`}>
                <div className={`rounded-xl overflow-hidden border ${customStyle}`}>
                    <img src={`https://cdn.statically.io/img/i.imgur.com/w=200/${item.images[0]}`} alt={item.title} style={{ maxWidth: 'unset' }} />
                    <div className="px-2 py-3 text-center">
                        <div className="px-2 text-xl font-bold">{Currency(item.start_price, false)}</div>
                        <div className="text-current leading-none clamp-1">
                            <BiMap className="inline mr-1" /><span><small>{item.location.district}, {item.location.province}</small></span>
                        </div>
                        <div>
                            {
                                item.facility.room.includes("AC") &&
                                <span className="rounded text-xs font-semibold inline-block px-1 text-green-700 border mr-1">AC</span>
                            }
                            {
                                item.facility.room.includes("Wifi") &&
                                <span className="rounded text-xs font-semibold inline-block px-1 text-green-700 border mr-1">WiFi</span>
                            }
                            {
                                item.facility.room.includes("Kamar Mandi Dalam") &&
                                <span className="rounded text-xs font-semibold inline-block px-1 text-green-700 border">KM. Dalam</span>
                            }
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