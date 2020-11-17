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
                <div className="rounded-xl overflow-hidden shadow-sm mr-3 mb-1 border">
                    <img src={`https://cdn.statically.io/img/i.imgur.com/w=140/${item.images[0]}`} alt={item.title} style={{maxWidth:'unset'}} />
                    <div className="px-3 py-3 text-center">
                        <div className="px-2 font-bold">{Currency(item.start_price, false)}</div>
                        <div className="text-current leading-none clamp-1"><small>{item.location.title}</small></div>
                        <div className="text-current uppercase leading-none clamp-1"><small>{item.location.province}</small></div>
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