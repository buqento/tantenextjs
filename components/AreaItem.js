import React, { Component } from 'react'
import { shape } from 'prop-types'
import Link from 'next/link'
import { Card } from 'react-bootstrap'
import { Kost } from '../utils/modals/Kost'

class AreaItem extends Component {

    constructor() {
        super()
        this.count = this.count.bind(this)
    }

    count(location) {
        return Kost.filter(item => location === item.location.title).length
    }

    render() {
        const { item } = this.props
        return (
            <Link href={`area/${item.slug}`}>
                <Card style={{ width: '140px' }} variant="top" className="mr-3">
                    <Card.Img variant="top" src={item.image} />
                    <div className="p-3 text-center">{item.title}</div>
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