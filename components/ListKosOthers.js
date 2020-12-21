import React, { Component } from 'react'
import { arrayOf, shape } from 'prop-types'
import Link from 'next/link'
import Currency from './Currency'
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
                    <div className="border-t-8 border-gray-200 mt-3">
                        <div className="py-3 font-bold">
                            {`${detail.category} lain di ${detail.location.district}`}
                        </div>
                        {
                            listData
                                .reverse()
                                .map((kost, index) =>
                                    <Link key={index} href={`../${Generateslug(kost.title)}`}>
                                        <div className="w-full overflow-hidden mb-3">
                                            <img src={`https://cdn.statically.io/img/i.imgur.com/w=100/${kost.images[0]}`} alt={kost.title} className="float-left mr-2" />
                                            <div className="mx-3">
                                                <div className="text-lg">{Currency(kost.price.start_from, false)}</div>
                                                <div className="leading-none clamp-3"><small>{kost.title}</small></div>
                                                <div>
                                                    {
                                                        kost.facility.room.includes("AC") &&
                                                        <span className="rounded text-xs font-semibold inline-block px-1 text-green-700 border mr-1">AC</span>
                                                    }
                                                    {
                                                        kost.facility.room.includes("Wifi") &&
                                                        <span className="rounded text-xs font-semibold inline-block px-1 text-green-700 border mr-1">WiFi</span>
                                                    }
                                                    {
                                                        kost.facility.room.includes("Kamar Mandi Dalam") &&
                                                        <span className="rounded text-xs font-semibold inline-block px-1 text-green-700 border">KM. Dalam</span>
                                                    }
                                                </div>
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