import React, { Component } from 'react'
import { shape } from 'prop-types'
import Link from 'next/link'
import { Card } from 'react-bootstrap'
import Currency from './Currency'
import Firstupper from '../utils/Firstupper'

class AreaItem extends Component {
    render() {
        const { item } = this.props
        let locationTitle = "";
        item.location.title.split("-").map(index => locationTitle += Firstupper(index) + " ")
        return (
            <Link href={item.slug}>
                <Card style={{ width: '140px' }} variant="top" className="mr-3">
                    <Card.Img variant="top" src={`https://cdn.statically.io/img/i.imgur.com/w=138/${item.images[0]}`} />
                    <div className="pt-2 pr-2 pl-2 text-center font-weight-bold">{Currency(item.start_price)}</div>
                    <div className="pb-2 text-center text-secondary"><small>{locationTitle}</small></div>
                </Card>
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