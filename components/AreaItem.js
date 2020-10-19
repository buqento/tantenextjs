import React, { Component } from 'react'
import { shape } from 'prop-types'
import Link from 'next/link'
import { Card } from 'react-bootstrap'

class AreaItem extends Component {
    render() {
        const { item } = this.props
        return (
            <Link href={`area/${item.slug}`}>
                <Card bg="light" style={{ width: '140px' }} className="mr-3">
                    <Card.Img variant="bottom" src={`https://api.mapbox.com/styles/v1/mapbox/light-v10/static/${item.location.long},${item.location.lat},16/500x500?access_token=pk.eyJ1IjoiYnVxZW50byIsImEiOiJjanJ5a3p4cDkwZXJiNDlvYXMxcnhud3hhIn0.AhQ-vGYSIo6uTBmQD4MCsA`} />
                    <div className="pt-2 pb-2 text-center text-uppercase">{item.title}</div>
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