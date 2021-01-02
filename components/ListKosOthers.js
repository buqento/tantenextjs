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
                            {`${detail.category} lain di ${detail.location.district}, ${detail.location.province}`}
                        </div>
                        {
                            listData
                                .reverse()
                                .map((kost, index) =>
                                    <Link key={index} href={`../${Generateslug(kost.title)}`}>
                                        <div className="w-full overflow-hidden mb-3">
                                            <img src={`https://cdn.statically.io/img/i.imgur.com/w=100/${kost.images[0]}`} alt={kost.title} className="float-left mr-2" />
                                            <div className="mx-3">
                                                <div className="text-lg">
                                                    {Cash(kost.price.start_from)}/<span className="text-xs">{kost.price.duration}</span>
                                                </div>
                                                <div className="leading-none clamp-3"><small>{kost.title}</small></div>
                                                <div>
                                                    {
                                                        kost.facility.room.includes("AC") &&
                                                        <span className="rounded text-xs font-semibold inline-block px-1 text-green-700 border mr-1">AC</span>
                                                    }
                                                    {
                                                        kost.facility.room.includes("Wifi") &&
                                                        <span className="rounded text-xs font-semibold inline-block px-1 text-green-700 border mr-1">Wifi</span>
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