import React, { Component } from 'react'
import { shape } from 'prop-types'
import Link from 'next/link'
import Currency from './Currency'
import Generateslug from '../utils/Generateslug'

class AreaItem extends Component {
    render() {
        const { item } = this.props
        return (
            <Link href={Generateslug(item.title)}>
                <div className="rounded-xl overflow-hidden shadow-md mr-3 mb-2">
                    <img src={`https://cdn.statically.io/img/i.imgur.com/w=170/${item.images[0]}`} alt={item.title} style={{ maxWidth: 'unset' }} />
                    <div className="px-3 py-3 text-center">
                        <div className="px-2 font-bold">{Currency(item.start_price, false)}</div>
                        <div className="text-current leading-none clamp-1"><small>{item.location.district}, {item.location.province}</small></div>
                        <div>
                            {
                                item.facilities.includes("AC") &&
                                <span className="rounded text-xs font-semibold inline-block px-1 text-indigo-500 bg-gray-200 mr-1">AC</span>
                            }
                            {
                                item.facilities.includes("Wifi") &&
                                <span className="rounded text-xs font-semibold inline-block px-1 text-indigo-500 bg-gray-200 mr-1">WiFi</span>
                            }
                            {
                                item.facilities.includes("Kamar Mandi Dalam") &&
                                <span className="rounded text-xs font-semibold inline-block px-1 text-indigo-500 bg-gray-200">KM. Dalam</span>
                            }
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}
AreaItem.propTypes = {
    item: shape({})
}
AreaItem.defaultProps = {
    item: null
}
export default AreaItem;