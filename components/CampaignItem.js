import React, { Component } from 'react'
import { shape } from 'prop-types'
import Link from 'next/link'
import { Card } from 'react-bootstrap'
import Currency from './Currency'

class AreaItem extends Component {
    render() {
        const { item } = this.props
        return (
            <Link href={item.slug}>
                <Card style={{ width: '140px' }} variant="top" className="mr-3">
                    <Card.Img variant="top" src={item.images[0]} />
                    <div className="p-2 text-center">{Currency(item.start_price)}</div>
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