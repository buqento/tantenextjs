import React, { Component } from 'react'
import { arrayOf, shape, string } from 'prop-types'
import Link from 'next/link'
import Currency from './Currency'
import Generateslug from '../utils/Generateslug'

class ListKos extends Component {
    render() {
        const { data, category } = this.props
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
                        data.length > 0 &&
                        <>
                            {
                                listData.map((item, index) =>
                                    <div key={index}>
                                        <Link href={`https://tantekos.com/${Generateslug(item.title)}`}>
                                            <div className="rounded-xl overflow-hidden shadow-sm border">
                                                <img className="w-full" src={`https://cdn.statically.io/img/i.imgur.com/w=125/${item.images[0]}`} alt={item.title} />
                                                <div className="px-3 py-3 text-center">
                                                    <div className="px-2 font-bold">{Currency(item.start_price, false)}</div>
                                                    <div className="text-current leading-tight clamp-3"><small>{item.title}</small></div>
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