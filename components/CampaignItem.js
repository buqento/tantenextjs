import React, { Component } from 'react'
import { shape } from 'prop-types'
import Link from 'next/link'
import Currency from './Currency'
import Firstupper from '../utils/Firstupper'
import Generatelink from '../utils/Generatelink'

class AreaItem extends Component {
    render() {
        const { item } = this.props
        let locationTitle = "";
        item.location.title.split("-").map(index => locationTitle += Firstupper(index) + " ")
        return (
            <Link href={Generatelink(item.title)}>
                <div className="rounded overflow-hidden shadow-md mr-3 mb-1">
                    <img src={`https://cdn.statically.io/img/i.imgur.com/w=110/${item.images[0]}`} alt={item.title} style={{maxWidth:'unset'}} />
                    <div className="px-2 py-2 text-center">
                        <div className="px-2 font-weight-bold">{Currency(item.start_price, false)}</div>
                        <div className="text-secondary leading-none clamp-1"><small>{locationTitle}</small></div>
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