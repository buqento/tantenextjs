import React, { Component } from 'react'
import { shape } from 'prop-types'
import Link from 'next/link'
import Currency from './Currency'
import Firstupper from '../utils/Firstupper'
import Generateslug from '../utils/Generateslug'

class AreaItem extends Component {
    render() {
        const { item } = this.props
        let locationTitle = "";
        item.location.title.split("-").map(index => locationTitle += Firstupper(index) + " ")
        return (
            <Link href={Generateslug(item.title)}>
                <div className="rounded overflow-hidden shadow-sm mr-3 mb-1 border">
                    <img src={`https://cdn.statically.io/img/i.imgur.com/w=140/${item.images[0]}`} alt={item.title} style={{maxWidth:'unset'}} />
                    <div className="px-3 py-3 text-center">
                        <div className="px-2 font-bold">{Currency(item.start_price, false)}</div>
                        <div className="text-current leading-none clamp-1"><small>{locationTitle}</small></div>
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