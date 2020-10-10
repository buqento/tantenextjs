import React, { Component } from 'react'
import { shape } from 'prop-types'
import Link from 'next/link'
import { Card, Badge, Image } from 'react-bootstrap'
import Firstupper from '../utils/Firstupper'

class KostItem extends Component {
    render() {
        const { item } = this.props
        let badge = "";
        item.location.title.split("-").map(index => badge += Firstupper(index) + " ")
        return (
            <Link href={item.slug}>
                <div style={{ borderTop: '8px solid #f5f5f5' }}>
                    <Image src={item.images[0]} alt={item.title} fluid />
                    <div className="p-3">
                        <Card.Title>{item.title}</Card.Title>
                        <Badge variant="secondary">{badge}</Badge>
                    </div>
                </div>
            </Link>
        )
    }
}

KostItem.propTypes = {
    item: shape({})
}

KostItem.defaultProps = {
    item: null
}

export default KostItem;