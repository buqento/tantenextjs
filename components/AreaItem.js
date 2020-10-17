import React, { Component } from 'react'
import { shape } from 'prop-types'
import Link from 'next/link'
import { Card } from 'react-bootstrap'

class AreaItem extends Component {
    render() {
        const { item } = this.props
        return (
            <Link href={`area/${item.slug}`}>
                <Card style={{ width: '140px' }} variant="top" className="mr-3">
                    <Card.Img variant="top" src={`https://cdn.statically.io/img/i.imgur.com/w=138/${item.image}`} />
                    <div className="p-2 text-center text-uppercase">{item.title}</div>
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