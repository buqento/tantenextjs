import React, { Component } from 'react'
import { arrayOf, shape, string } from 'prop-types'
import Link from 'next/link'
import Currency from './Currency'
import Generateslug from '../utils/Generateslug'

class ListKos extends Component {
    render() {
        const { data, category } = this.props
        const skeletonArr = [1, 2, 3, 4, 5]
        let listData = [];
        if (category !== null) {
            listData = data.filter(i => i.category === category)
        } else {
            listData = data
        }
        return (
            <div className="container pb-3">
                <div className="grid grid-cols-2 gap-3">
                    {
                        !data &&
                        skeletonArr.map((item, index) =>
                            <div key={index}>
                                <div className="border rounded-xl overflow-hidden">
                                    <div className="animate-pulse w-full h-40 bg-gray-300" />
                                    <div className="px-3 py-3">
                                        <div className="animate-pulse px-2 my-1 w-32 h-4 bg-gray-300" />
                                        <div className="animate-pulse px-2 my-1 w-full h-4 bg-gray-300" />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {
                        data && data.length > 0 &&
                        <>
                            {
                                listData.map((item, index) =>
                                    <div key={index}>
                                        <Link href={`https://tantekos.com/${Generateslug(item.title)}`}>
                                            <div className="h-full border rounded-xl overflow-hidden">
                                                <img className="w-full" src={`https://cdn.statically.io/img/i.imgur.com/w=200/${item.images[0]}`} alt={item.title} />
                                                <div className="px-3 py-3 text-center">
                                                    <div className="px-2 text-xl font-bold">{Currency(item.start_price, false)}</div>
                                                    <div className="text-current leading-tight clamp-3"><small>{item.title}</small></div>
                                                    <div>
                                                        {
                                                            item.facility.room.includes("AC") &&
                                                            <span className="rounded text-xs font-semibold inline-block px-1 text-green-600 border mr-1">AC</span>
                                                        }
                                                        {
                                                            item.facility.room.includes("Wifi") &&
                                                            <span className="rounded text-xs font-semibold inline-block px-1 text-green-600 border mr-1">WiFi</span>
                                                        }
                                                        {
                                                            item.facility.room.includes("Kamar Mandi Dalam") &&
                                                            <span className="rounded text-xs font-semibold inline-block px-1 text-green-600 border">KM. Dalam</span>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            }
                        </>
                    }
                </div>
            </div>
        )
    }
}
ListKos.propTypes = {
    data: arrayOf(shape({})),
    category: string
}
ListKos.defaultProps = {
    data: null,
    category: null
}
export default ListKos;